import { supabase, isSupabaseConfigured } from './supabase/client';
import {
  InspectionRequest,
  InspectionReport,
  PartnerApplication,
  PartnerProfile,
  UserProfile,
} from './types';

// Initial demo partner profile (Vikram Malhotra - Senior Inspector)
export const DEMO_PARTNER_PROFILE: PartnerProfile = {
  id: 'partner-vikram-01',
  user_id: 'user-vikram-01',
  full_name: 'Vikram Malhotra',
  phone: '9876543210',
  location: 'Indiranagar, Bengaluru',
  district: 'Bengaluru Urban',
  expertise: ['Mobiles', 'Laptops', 'Electronics'],
  rating: 4.9,
  total_inspections: 48,
  is_verified: true,
  is_available: true,
  earnings_total: 24700,
  created_at: '2026-01-15T10:00:00Z',
};

// Initial demo customer profile
export const DEMO_CUSTOMER_PROFILE: UserProfile = {
  id: 'customer-arjun-01',
  full_name: 'Arjun Mehta',
  phone: '9988776655',
  email: 'arjun.mehta@gmail.com',
  role: 'customer',
  created_at: '2026-02-10T12:00:00Z',
};

// Initial inspection requests
const INITIAL_REQUESTS: InspectionRequest[] = [
  {
    id: 'req-1',
    customer_id: 'customer-arjun-01',
    customer_name: 'Arjun Mehta',
    product_title: 'Apple iPhone 14 128GB Midnight (Battery 89%)',
    category: 'Mobiles',
    listing_url: 'https://www.olx.in/item/iphone-14-128gb-midnight-urgent-sale-iid-18491029',
    location: 'HSR Layout, Bengaluru',
    district: 'Bengaluru Urban',
    description: 'Seller claims flawless condition, original invoice included. Requesting 3uTools hardware diagnostic and True Tone verification.',
    status: 'pending',
    inspection_fee: 499,
    product_price: 35000,
    marketplace: 'OLX',
    image_url: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'req-2',
    customer_id: 'customer-rohit-02',
    customer_name: 'Rohit Verma',
    product_title: 'Royal Enfield Classic 350 Gunmetal Grey (2021)',
    category: 'Bikes',
    listing_url: 'https://www.facebook.com/marketplace/item/928491048201',
    location: 'Whitefield, Bengaluru',
    district: 'Bengaluru Urban',
    description: 'Check engine cold start, fork oil leakage, front/rear disc pads, tire tread depth, and Parivahan NOC status.',
    status: 'pending',
    inspection_fee: 799,
    product_price: 135000,
    marketplace: 'Facebook Marketplace',
    image_url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
  },
  {
    id: 'req-3',
    customer_id: 'customer-arjun-01',
    customer_name: 'Arjun Mehta',
    product_title: 'MacBook Air M1 (8GB / 256GB SSD) Space Grey',
    category: 'Laptops',
    listing_url: 'https://www.quikr.com/electronics/apple-macbook-air-m1-excellent-shape/p/38491039',
    location: 'Koramangala 4th Block, Bengaluru',
    district: 'Bengaluru Urban',
    description: 'Check display anti-reflective coating delamination, battery cycle count, all keys, and genuine 30W adapter.',
    status: 'accepted',
    assigned_partner_id: 'partner-vikram-01',
    assigned_partner_name: 'Vikram Malhotra',
    assigned_partner_phone: '9876543210',
    inspection_fee: 699,
    product_price: 42000,
    marketplace: 'Quikr',
    image_url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
  },
  {
    id: 'req-4',
    customer_id: 'customer-arjun-01',
    customer_name: 'Arjun Mehta',
    product_title: 'Sony Bravia 55 inch 4K Ultra HD Smart LED TV',
    category: 'Electronics',
    listing_url: 'https://www.olx.in/item/sony-bravia-55-4k-smart-tv-iid-99482102',
    location: 'Indiranagar 100ft Road, Bengaluru',
    district: 'Bengaluru Urban',
    description: 'Verify 4K panel backlight uniformity, HDMI eARC port for soundbar, and original GST bill.',
    status: 'completed',
    assigned_partner_id: 'partner-vikram-01',
    assigned_partner_name: 'Vikram Malhotra',
    assigned_partner_phone: '9876543210',
    inspection_fee: 599,
    product_price: 25000,
    marketplace: 'OLX',
    image_url: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString(),
    report: {
      id: 'rep-4',
      request_id: 'req-4',
      partner_id: 'partner-vikram-01',
      partner_name: 'Vikram Malhotra',
      condition_rating: 8,
      authenticity_status: 'genuine',
      estimated_market_price: 23500,
      issues_found: [
        {
          component: 'Display Panel',
          severity: 'minor',
          detail: 'Minor backlight bleed at bottom-right edge; barely noticeable in normal lighting.',
        },
        {
          component: 'Remote Controller',
          severity: 'info',
          detail: 'Original Sony voice remote included; volume-down button needs slightly firm press.',
        },
        {
          component: 'Ports & Connectivity',
          severity: 'passed',
          detail: 'Tested 4 HDMI ports, optical out, dual-band Wi-Fi & Bluetooth with no dropouts.',
        },
      ],
      inspection_notes: 'Genuine 2022 manufactured Bravia KD-55X74K unit with verified invoice and table-top stand. Screen has zero dead pixels. Power supply is stable with no coil whine.',
      photos: [
        'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=600&auto=format&fit=crop&q=80',
      ],
      recommendation: 'negotiate_price',
      created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString(),
    },
  },
];

// Initial demo partner applications
const INITIAL_APPLICATIONS: PartnerApplication[] = [
  {
    id: 'app-1',
    full_name: 'Vikram Malhotra',
    phone: '9876543210',
    location: 'Indiranagar, Bengaluru',
    district: 'Bengaluru Urban',
    expertise: ['Mobiles', 'Laptops', 'Electronics'],
    experience: '7 years as Apple-certified repair technician.',
    introduction: 'Specialized in hardware testing, motherboard inspections and battery analytics.',
    status: 'approved',
    created_at: '2026-01-10T10:00:00Z',
  },
  {
    id: 'app-2',
    full_name: 'Rajesh Sharma',
    phone: '9812345678',
    location: 'Andheri West, Mumbai',
    district: 'Mumbai Suburban',
    expertise: ['Cars', 'Bikes'],
    experience: '12 years automotive inspector at Bosch & True Value.',
    introduction: 'Engine compression checks, OBD-II scanner diagnostics, frame paint meter tests.',
    status: 'approved',
    created_at: '2026-01-14T11:00:00Z',
  },
];

// Helpers to get & save store from localStorage
const STORAGE_KEY_REQUESTS = 'ezer_inspection_requests';
const STORAGE_KEY_APPLICATIONS = 'ezer_partner_applications';
const STORAGE_KEY_DECLINES = 'ezer_partner_declines';
const STORAGE_KEY_ACTIVE_ROLE = 'ezer_active_role';

export const getStoredRequests = (): InspectionRequest[] => {
  if (typeof window === 'undefined') return INITIAL_REQUESTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_REQUESTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(INITIAL_REQUESTS));
      return INITIAL_REQUESTS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_REQUESTS;
  }
};

export const saveStoredRequests = (requests: InspectionRequest[]) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY_REQUESTS, JSON.stringify(requests));
  } catch (err) {
    console.error('Failed to save requests:', err);
  }
};

export const getStoredApplications = (): PartnerApplication[] => {
  if (typeof window === 'undefined') return INITIAL_APPLICATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(INITIAL_APPLICATIONS));
      return INITIAL_APPLICATIONS;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_APPLICATIONS;
  }
};

export const getPartnerDeclines = (partnerId: string): string[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_DECLINES}_${partnerId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const addPartnerDecline = (partnerId: string, requestId: string) => {
  if (typeof window === 'undefined') return;
  try {
    const declines = getPartnerDeclines(partnerId);
    if (!declines.includes(requestId)) {
      declines.push(requestId);
      localStorage.setItem(`${STORAGE_KEY_DECLINES}_${partnerId}`, JSON.stringify(declines));
    }
  } catch (err) {
    console.error('Failed to save decline:', err);
  }
};

export const getActiveRole = (): 'customer' | 'partner' => {
  if (typeof window === 'undefined') return 'customer';
  try {
    return (localStorage.getItem(STORAGE_KEY_ACTIVE_ROLE) as 'customer' | 'partner') || 'customer';
  } catch {
    return 'customer';
  }
};

export const setActiveRole = (role: 'customer' | 'partner') => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY_ACTIVE_ROLE, role);
};

// Detect marketplace from URL
export const detectMarketplace = (url: string): InspectionRequest['marketplace'] => {
  const lower = url.toLowerCase();
  if (lower.includes('olx.in') || lower.includes('olx.com')) return 'OLX';
  if (lower.includes('facebook.com') || lower.includes('fb.com')) return 'Facebook Marketplace';
  if (lower.includes('quikr.com')) return 'Quikr';
  if (lower.includes('truecaller.com')) return 'Truecaller Buy & Sell';
  return 'Other';
};

// URL validation
export const isValidListingUrl = (url: string): boolean => {
  if (!url || !url.trim()) return false;
  try {
    const parsed = new URL(url.startsWith('http') ? url : `https://${url}`);
    return Boolean(parsed.hostname && parsed.hostname.includes('.'));
  } catch {
    return false;
  }
};

// ----------------------------------------------------------------------
// DATA OPERATIONS (Hybrid: Supabase + LocalStore Fallback)
// ----------------------------------------------------------------------

export interface CreateRequestInput {
  listing_url: string;
  product_title?: string;
  category?: string;
  location?: string;
  district?: string;
  description?: string;
  product_price?: number;
  inspection_fee?: number;
}

export const createInspectionRequest = async (
  input: CreateRequestInput
): Promise<{ success: boolean; data?: InspectionRequest; message: string }> => {
  if (!isValidListingUrl(input.listing_url)) {
    return { success: false, message: 'Please provide a valid listing URL.' };
  }

  const marketplace = detectMarketplace(input.listing_url);
  const title = input.product_title?.trim() || `${marketplace} Second-Hand Listing Verification`;
  const category = input.category || 'Electronics';
  const location = input.location?.trim() || 'Indiranagar, Bengaluru';
  const district = input.district || 'Bengaluru Urban';
  const inspectionFee = input.inspection_fee || 499;

  const newRequest: InspectionRequest = {
    id: `req-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    customer_id: DEMO_CUSTOMER_PROFILE.id,
    customer_name: DEMO_CUSTOMER_PROFILE.full_name,
    product_title: title,
    category,
    listing_url: input.listing_url.trim(),
    location,
    district,
    description: input.description?.trim() || 'Customer requested comprehensive physical check, authenticity verification, and hardware diagnostics.',
    status: 'pending',
    inspection_fee: inspectionFee,
    product_price: input.product_price || 24000,
    marketplace,
    image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    created_at: new Date().toISOString(),
  };

  // If Supabase is available, insert into Supabase table
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.from('inspection_requests').insert({
        product_title: newRequest.product_title,
        category: newRequest.category,
        listing_url: newRequest.listing_url,
        location: newRequest.location,
        district: newRequest.district,
        description: newRequest.description,
        status: 'pending',
        inspection_fee: newRequest.inspection_fee,
      }).select().single();

      if (!error && data) {
        newRequest.id = data.id;
      }
    } catch (err) {
      console.warn('Supabase insert note: falling back to local store', err);
    }
  }

  // Always update local store so UI is instantly reactive
  const existing = getStoredRequests();
  const updated = [newRequest, ...existing];
  saveStoredRequests(updated);

  return {
    success: true,
    data: newRequest,
    message: 'Your inspection request has been submitted!',
  };
};

export const acceptJob = async (
  requestId: string,
  partnerId: string = DEMO_PARTNER_PROFILE.id,
  partnerName: string = DEMO_PARTNER_PROFILE.full_name
): Promise<{ success: boolean; message: string }> => {
  // If Supabase is configured, use atomic accept RPC function
  if (isSupabaseConfigured() && supabase) {
    try {
      const { data, error } = await supabase.rpc('accept_inspection_job', {
        p_request_id: requestId,
        p_partner_id: partnerId,
      });
      if (!error && data) {
        if (!data.success) {
          return { success: false, message: data.message };
        }
      }
    } catch (err) {
      console.warn('Supabase RPC note: falling back to local atomic check', err);
    }
  }

  // Atomic state check on local store
  const requests = getStoredRequests();
  const target = requests.find((r) => r.id === requestId);

  if (!target) {
    return { success: false, message: 'Inspection request not found.' };
  }

  if (target.status !== 'pending') {
    return {
      success: false,
      message: 'This job has already been accepted by another partner.',
    };
  }

  target.status = 'accepted';
  target.assigned_partner_id = partnerId;
  target.assigned_partner_name = partnerName;
  target.assigned_partner_phone = '9876543210';

  saveStoredRequests([...requests]);

  return {
    success: true,
    message: 'Job accepted successfully! It is now assigned to you under My Jobs.',
  };
};

export const declineJob = async (
  requestId: string,
  partnerId: string = DEMO_PARTNER_PROFILE.id
): Promise<{ success: boolean; message: string }> => {
  // Record response in Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('partner_job_responses').insert({
        request_id: requestId,
        partner_id: partnerId,
        response: 'declined',
      });
    } catch (err) {
      console.warn('Supabase decline response note:', err);
    }
  }

  // Save decline for this partner locally so it disappears from their Available Jobs
  // but remains 'pending' globally for all other partners!
  addPartnerDecline(partnerId, requestId);

  return {
    success: true,
    message: 'Job declined and removed from your available list. It remains open for other partners.',
  };
};

export const submitPartnerApplication = async (
  app: Omit<PartnerApplication, 'id' | 'created_at' | 'status'>
): Promise<{ success: boolean; message: string }> => {
  // Validate Indian mobile number (10 digits)
  const cleanPhone = app.phone.replace(/\D/g, '');
  if (cleanPhone.length !== 10 && cleanPhone.length !== 12) {
    return {
      success: false,
      message: 'Please provide a valid 10-digit Indian mobile number.',
    };
  }

  // Check for duplicate phone in local applications
  const existingApps = getStoredApplications();
  const isDuplicate = existingApps.some(
    (existing) => existing.phone.replace(/\D/g, '') === cleanPhone
  );

  if (isDuplicate) {
    return {
      success: false,
      message: 'An application with this mobile number has already been registered.',
    };
  }

  const newApp: PartnerApplication = {
    id: `app-${Date.now()}`,
    ...app,
    phone: cleanPhone.slice(-10),
    status: 'pending',
    created_at: new Date().toISOString(),
  };

  // Insert into Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      const { error } = await supabase.from('partner_applications').insert({
        full_name: newApp.full_name,
        phone: newApp.phone,
        email: newApp.email,
        location: newApp.location,
        district: newApp.district,
        expertise: newApp.expertise,
        experience: newApp.experience,
        introduction: newApp.introduction,
        status: 'pending',
      });
      if (error) {
        if (error.code === '23505') {
          return {
            success: false,
            message: 'An application with this mobile number has already been registered.',
          };
        }
        console.warn('Supabase application insert note:', error);
      }
    } catch (err) {
      console.warn('Supabase error:', err);
    }
  }

  // Save to local store
  existingApps.unshift(newApp);
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(existingApps));
  }

  return {
    success: true,
    message: 'Application submitted successfully! Our team will review your details and contact you.',
  };
};

export const completeInspectionAndSubmitReport = async (
  requestId: string,
  reportData: Omit<InspectionReport, 'id' | 'request_id' | 'created_at'>
): Promise<{ success: boolean; message: string; report?: InspectionReport }> => {
  const requests = getStoredRequests();
  const target = requests.find((r) => r.id === requestId);

  if (!target) {
    return { success: false, message: 'Inspection request not found.' };
  }

  const newReport: InspectionReport = {
    id: `rep-${Date.now()}`,
    request_id: requestId,
    ...reportData,
    created_at: new Date().toISOString(),
  };

  target.status = 'completed';
  target.report = newReport;

  // Insert to Supabase if configured
  if (isSupabaseConfigured() && supabase) {
    try {
      await supabase.from('inspection_reports').insert({
        request_id: requestId,
        partner_id: reportData.partner_id,
        condition_rating: reportData.condition_rating,
        authenticity_status: reportData.authenticity_status,
        estimated_market_price: reportData.estimated_market_price,
        issues_found: reportData.issues_found,
        inspection_notes: reportData.inspection_notes,
        photos: reportData.photos,
        recommendation: reportData.recommendation,
      });

      await supabase
        .from('inspection_requests')
        .update({ status: 'completed' })
        .eq('id', requestId);
    } catch (err) {
      console.warn('Supabase report submit note:', err);
    }
  }

  saveStoredRequests([...requests]);

  return {
    success: true,
    message: 'Inspection report submitted successfully! The customer can now view the detailed findings.',
    report: newReport,
  };
};
