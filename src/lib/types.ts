export type UserRole = 'customer' | 'partner' | 'admin';

export interface UserProfile {
  id: string;
  full_name: string;
  phone?: string;
  email?: string;
  role: UserRole;
  created_at: string;
}

export type InspectionStatus = 'pending' | 'accepted' | 'in_progress' | 'completed' | 'declined';

export interface InspectionRequest {
  id: string;
  customer_id?: string;
  customer_name?: string;
  product_title: string;
  category: string;
  listing_url: string;
  location: string;
  district: string;
  description?: string;
  status: InspectionStatus;
  assigned_partner_id?: string;
  assigned_partner_name?: string;
  assigned_partner_phone?: string;
  inspection_fee: number;
  product_price?: number;
  image_url?: string;
  marketplace?: 'OLX' | 'Facebook Marketplace' | 'Quikr' | 'Truecaller Buy & Sell' | 'Other';
  created_at: string;
  report?: InspectionReport;
}

export type AuthenticityStatus = 'genuine' | 'refurbished' | 'tampered' | 'counterfeit' | 'unverified';
export type Recommendation = 'recommend_buy' | 'negotiate_price' | 'do_not_buy';

export interface IssueItem {
  component: string;
  severity: 'minor' | 'major' | 'critical' | 'passed' | 'info';
  detail: string;
}

export interface InspectionReport {
  id: string;
  request_id: string;
  partner_id: string;
  partner_name?: string;
  condition_rating: number; // 1 to 10
  authenticity_status: AuthenticityStatus;
  estimated_market_price: number;
  issues_found: IssueItem[];
  inspection_notes: string;
  photos: string[];
  recommendation: Recommendation;
  created_at: string;
}

export interface PartnerApplication {
  id: string;
  user_id?: string;
  full_name: string;
  phone: string;
  email?: string;
  location: string;
  district: string;
  expertise: string[];
  experience?: string;
  introduction?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface PartnerProfile {
  id: string;
  user_id: string;
  full_name: string;
  phone: string;
  location: string;
  district: string;
  expertise: string[];
  rating: number;
  total_inspections: number;
  is_verified: boolean;
  is_available: boolean;
  earnings_total: number;
  created_at: string;
}

export interface MockProductListing {
  id: string;
  title: string;
  category: string;
  price: number;
  original_price: number;
  location: string;
  district: string;
  marketplace: 'OLX' | 'Facebook Marketplace' | 'Quikr';
  url: string;
  image: string;
  seller_name: string;
  posted_time: string;
  verification_score_estimate?: number;
}
