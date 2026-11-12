-- ====================================================================
-- Ezer Platform - Sample Seed Data
-- ====================================================================

-- Demo Partner Profile UUIDs
-- (These can also be used for testing and demonstration)
INSERT INTO public.partner_applications (
    id, full_name, phone, location, district, expertise, experience, introduction, status
) VALUES 
('a1111111-1111-1111-1111-111111111111', 'Vikram Malhotra', '9876543210', 'Indiranagar, Bengaluru', 'Bengaluru Urban', ARRAY['Mobiles', 'Laptops', 'Electronics'], '7 years as Apple certified senior repair technician', 'Specialized in motherboard checks, battery health diagnostics, and water damage detection.', 'approved'),
('a2222222-2222-2222-2222-222222222222', 'Rajesh Sharma', '9812345678', 'Andheri West, Mumbai', 'Mumbai Suburban', ARRAY['Cars', 'Bikes'], '12 years automotive inspector at Bosch & Maruti True Value', 'Expert in engine compression tests, chassis rust, odometer tampering, and accident repair verification.', 'approved'),
('a3333333-3333-3333-3333-333333333333', 'Pooja Iyer', '9823456789', 'Koramangala, Bengaluru', 'Bengaluru Urban', ARRAY['Home Appliances', 'Laptops', 'Furniture'], '5 years quality assurance engineer for consumer electronics', 'Detailed electrical safety testing, compressor health, and genuine parts verification.', 'pending')
ON CONFLICT (phone) DO NOTHING;

-- Demo Inspection Requests
INSERT INTO public.inspection_requests (
    id, product_title, category, listing_url, location, district, description, status, inspection_fee, created_at
) VALUES
('b1111111-1111-1111-1111-111111111111', 'Apple iPhone 14 128GB Midnight (Battery 89%)', 'Mobiles', 'https://www.olx.in/item/iphone-14-128gb-midnight-condition-urgent-sale-iid-17849201', 'HSR Layout, Bengaluru', 'Bengaluru Urban', 'Seller claims pristine condition with box and bill. Need 3uTools hardware test and display replacement check.', 'pending', 499.00, NOW() - INTERVAL '2 hours'),
('b2222222-2222-2222-2222-222222222222', 'Royal Enfield Classic 350 Gunmetal Grey (2021)', 'Bikes', 'https://www.facebook.com/marketplace/item/9284719382103/', 'Whitefield, Bengaluru', 'Bengaluru Urban', 'Listed at ₹1,35,000. Check engine tap noise, front fork oil seal leakage, tyre tread depth, and pending challans.', 'pending', 799.00, NOW() - INTERVAL '4 hours'),
('b3333333-3333-3333-3333-333333333333', 'MacBook Air M1 256GB Space Grey (Cycle Count 140)', 'Laptops', 'https://www.quikr.com/electronics/apple-macbook-air-m1-excellent-shape/p/38491039', 'Koramangala 4th Block, Bengaluru', 'Bengaluru Urban', 'Verify keyboard keys, trackpad haptic, screen anti-reflective coating delamination, and genuine 30W adapter.', 'accepted', 699.00, NOW() - INTERVAL '1 day'),
('b4444444-4444-4444-4444-444444444444', 'Sony Bravia 55 inch 4K Ultra HD Android TV', 'Electronics', 'https://www.olx.in/item/sony-bravia-55-4k-smart-tv-iid-99482102', 'BTM Layout 2nd Stage, Bengaluru', 'Bengaluru Urban', 'Check panel backlight uniformity, HDMI ports functionality, and WiFi module stability.', 'completed', 599.00, NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- Demo Inspection Report for the completed request
INSERT INTO public.inspection_reports (
    id, request_id, partner_id, condition_rating, authenticity_status, estimated_market_price, issues_found, inspection_notes, recommendation, created_at
) VALUES (
    'c1111111-1111-1111-1111-111111111111',
    'b4444444-4444-4444-4444-444444444444',
    'a1111111-1111-1111-1111-111111111111',
    8,
    'genuine',
    23500.00,
    '[
        {"component": "Display Panel", "severity": "minor", "detail": "Slight backlight bleed in bottom right quadrant, not noticeable during movie playback."},
        {"component": "Remote Control", "severity": "info", "detail": "Volume down button is slightly stiff but working."},
        {"component": "Ports", "severity": "passed", "detail": "All 4 HDMI and 2 USB ports tested with 4K HDR feed."}
    ]'::jsonb,
    'Overall genuine Sony Bravia unit manufactured in 2022. Original bill and stand verified. No burnt pixels observed. Soundbar ARC connection tested successfully.',
    'negotiate_price',
    NOW() - INTERVAL '2 days'
)
ON CONFLICT (id) DO NOTHING;
