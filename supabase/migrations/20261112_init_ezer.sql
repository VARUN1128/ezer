-- ====================================================================
-- Ezer Platform - Database Migration & Schema
-- Indian Second-Hand Product Verification Platform
-- ====================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Profiles Table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    phone TEXT,
    email TEXT,
    role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'partner', 'admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Partner Applications Table
CREATE TABLE IF NOT EXISTS public.partner_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    phone TEXT NOT NULL UNIQUE,
    email TEXT,
    location TEXT NOT NULL,
    district TEXT NOT NULL,
    expertise TEXT[] NOT NULL DEFAULT '{}',
    experience TEXT,
    introduction TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Partner Profiles Table (For approved inspectors)
CREATE TABLE IF NOT EXISTS public.partner_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    location TEXT NOT NULL,
    district TEXT NOT NULL,
    expertise TEXT[] NOT NULL DEFAULT '{}',
    rating NUMERIC(3, 2) DEFAULT 4.90,
    total_inspections INT DEFAULT 0,
    is_verified BOOLEAN DEFAULT TRUE,
    is_available BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_partner_user UNIQUE (user_id)
);

-- 4. Inspection Requests Table
CREATE TABLE IF NOT EXISTS public.inspection_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    product_title TEXT NOT NULL,
    category TEXT NOT NULL,
    listing_url TEXT NOT NULL,
    location TEXT NOT NULL,
    district TEXT NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'declined')),
    assigned_partner_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    inspection_fee NUMERIC(10, 2) NOT NULL DEFAULT 499.00,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Partner Job Responses (Declines & Acceptances)
CREATE TABLE IF NOT EXISTS public.partner_job_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.inspection_requests(id) ON DELETE CASCADE,
    partner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    response TEXT NOT NULL CHECK (response IN ('accepted', 'declined')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT unique_partner_request_response UNIQUE (request_id, partner_id)
);

-- 6. Inspection Reports Table
CREATE TABLE IF NOT EXISTS public.inspection_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.inspection_requests(id) ON DELETE CASCADE,
    partner_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    condition_rating INT NOT NULL CHECK (condition_rating BETWEEN 1 AND 10),
    authenticity_status TEXT NOT NULL CHECK (authenticity_status IN ('genuine', 'refurbished', 'tampered', 'counterfeit', 'unverified')),
    estimated_market_price NUMERIC(12, 2) NOT NULL,
    issues_found JSONB DEFAULT '[]'::jsonb,
    inspection_notes TEXT NOT NULL,
    photos TEXT[] DEFAULT '{}',
    recommendation TEXT NOT NULL CHECK (recommendation IN ('recommend_buy', 'negotiate_price', 'do_not_buy')),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_inspection_requests_status ON public.inspection_requests(status);
CREATE INDEX IF NOT EXISTS idx_inspection_requests_customer ON public.inspection_requests(customer_id);
CREATE INDEX IF NOT EXISTS idx_inspection_requests_partner ON public.inspection_requests(assigned_partner_id);
CREATE INDEX IF NOT EXISTS idx_inspection_requests_district ON public.inspection_requests(district);
CREATE INDEX IF NOT EXISTS idx_partner_applications_phone ON public.partner_applications(phone);
CREATE INDEX IF NOT EXISTS idx_partner_job_responses_partner ON public.partner_job_responses(partner_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspection_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_job_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inspection_reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Profiles: Users can view their own profile, public can view basic partner profile info
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

-- Partner Applications: Anyone can submit an application (even unauthenticated)
CREATE POLICY "Anyone can submit partner application" ON public.partner_applications
    FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can view their own application" ON public.partner_applications
    FOR SELECT USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM public.profiles WHERE role = 'admin'));

-- Partner Profiles: Public read for verified partners
CREATE POLICY "Public read verified partners" ON public.partner_profiles
    FOR SELECT USING (is_verified = true);
CREATE POLICY "Partners update own profile" ON public.partner_profiles
    FOR UPDATE USING (auth.uid() = user_id);

-- Inspection Requests:
-- 1. Anyone/customers can insert requests
CREATE POLICY "Anyone can create inspection requests" ON public.inspection_requests
    FOR INSERT WITH CHECK (true);
-- 2. Customers can read their own requests
CREATE POLICY "Customers view their requests" ON public.inspection_requests
    FOR SELECT USING (auth.uid() = customer_id OR customer_id IS NULL);
-- 3. Partners can view pending requests that they haven't declined, or jobs assigned to them
CREATE POLICY "Partners view eligible requests" ON public.inspection_requests
    FOR SELECT USING (
        (status = 'pending' AND id NOT IN (
            SELECT request_id FROM public.partner_job_responses WHERE partner_id = auth.uid() AND response = 'declined'
        ))
        OR assigned_partner_id = auth.uid()
    );

-- Partner Job Responses:
CREATE POLICY "Partners can record response" ON public.partner_job_responses
    FOR INSERT WITH CHECK (auth.uid() = partner_id);
CREATE POLICY "Partners can view own responses" ON public.partner_job_responses
    FOR SELECT USING (auth.uid() = partner_id);

-- Inspection Reports:
-- Customers can view report for their request; partners can view/create their report
CREATE POLICY "Customer can view report for their request" ON public.inspection_reports
    FOR SELECT USING (
        request_id IN (SELECT id FROM public.inspection_requests WHERE customer_id = auth.uid())
        OR partner_id = auth.uid()
    );
CREATE POLICY "Partners can insert reports for their assigned jobs" ON public.inspection_reports
    FOR INSERT WITH CHECK (auth.uid() = partner_id);

-- ====================================================================
-- ATOMIC FUNCTION: Accept Job
-- Prevents race conditions when multiple partners try to accept the same job
-- ====================================================================
CREATE OR REPLACE FUNCTION public.accept_inspection_job(
    p_request_id UUID,
    p_partner_id UUID
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_updated_count INT;
    v_result JSONB;
BEGIN
    -- Atomically update if and only if status is still 'pending'
    UPDATE public.inspection_requests
    SET status = 'accepted',
        assigned_partner_id = p_partner_id,
        updated_at = NOW()
    WHERE id = p_request_id AND status = 'pending';

    GET DIAGNOSTICS v_updated_count = ROW_COUNT;

    IF v_updated_count > 0 THEN
        -- Record accepted response in partner_job_responses
        INSERT INTO public.partner_job_responses (request_id, partner_id, response)
        VALUES (p_request_id, p_partner_id, 'accepted')
        ON CONFLICT (request_id, partner_id) DO UPDATE SET response = 'accepted';

        v_result := jsonb_build_object(
            'success', true,
            'message', 'Job accepted successfully! It is now assigned to you.'
        );
    ELSE
        v_result := jsonb_build_object(
            'success', false,
            'message', 'This job has already been accepted by another partner or is no longer pending.'
        );
    END IF;

    RETURN v_result;
END;
$$;
