'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Clock,
  Heart,
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Search,
  User,
  Zap,
  Tag,
  Check,
} from 'lucide-react';
import { MOCK_MARKETPLACE_PRODUCTS, CATEGORIES } from '@/lib/constants';
import { SubmitListingModal } from '@/components/SubmitListingModal';
import { MockProductListing } from '@/lib/types';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params?.id as string;

  // Find product or fallback to first product
  const product = useMemo(() => {
    return (
      MOCK_MARKETPLACE_PRODUCTS.find((p) => p.id === productId) ||
      MOCK_MARKETPLACE_PRODUCTS[0]
    );
  }, [productId]);

  const [selectedImage, setSelectedImage] = useState<string>(product.image);
  const [isWishlisted, setIsWishlisted] = useState<boolean>(false);
  const [copiedShare, setCopiedShare] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Gallery angles
  const galleryImages = [
    product.image,
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=600&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
  ];

  // Similar products in same category
  const similarProducts = useMemo(() => {
    return MOCK_MARKETPLACE_PRODUCTS.filter(
      (p) => p.id !== product.id && p.category === product.category
    ).slice(0, 4);
  }, [product]);

  const discountPercent = Math.round(
    ((product.original_price - product.price) / product.original_price) * 100
  );

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Navigation Breadcrumb & Back Button */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8E8B85] hover:text-[#F5C45E] bg-[#141311] border border-[#26241F] hover:border-[#F5C45E]/40 px-3.5 py-2 rounded-xl transition-all shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs text-[#8E8B85]">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/marketplace" className="hover:text-white transition-colors">
              Marketplace
            </Link>
            <span>/</span>
            <span className="text-[#F5C45E] font-medium">{product.category}</span>
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ================================================================= */}
          {/* LEFT COLUMN: VISUAL GALLERY & TRUST PILLS                         */}
          {/* ================================================================= */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Main Photo Card */}
            <div className="relative w-full aspect-[4/3] rounded-3xl bg-[#141311] border border-[#26241F] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.85)] group">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Verified Inspection Ready Overlay Pill */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#0B0A09]/85 backdrop-blur-md text-[#F5C45E] border border-[#F5C45E]/30 shadow-md">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F5C45E]" />
                  <span>35-Point Diagnostic Ready</span>
                </span>
              </div>

              {/* Wishlist & Share Quick Action Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  aria-label="Save to wishlist"
                  className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${
                    isWishlisted
                      ? 'bg-red-500/20 border-red-500/40 text-red-400'
                      : 'bg-[#0B0A09]/80 border-[#2E2B25] text-white hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Share listing"
                  className="p-2.5 rounded-full bg-[#0B0A09]/80 backdrop-blur-md border border-[#2E2B25] text-white hover:text-[#F5C45E] transition-colors relative"
                >
                  <Share2 className="w-4 h-4" />
                  {copiedShare && (
                    <span className="absolute -bottom-8 right-0 text-[10px] bg-[#1C1A17] text-[#F5C45E] px-2 py-0.5 rounded shadow whitespace-nowrap border border-[#3A352B]">
                      Link Copied!
                    </span>
                  )}
                </button>
              </div>

              {/* Bottom Condition Estimate Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0B0A09]/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#35A66A] animate-pulse" />
                  <span className="text-[#E0DDD8] font-medium">Physical Inspector in {product.district.split(',')[0]}</span>
                </div>
                <span className="font-bold text-[#F5C45E]">Available in ~2 hrs</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedImage(img)}
                  className={`relative aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === img
                      ? 'border-[#F5C45E] shadow-[0_0_15px_rgba(245,196,94,0.3)] scale-[1.02]'
                      : 'border-[#26241F] hover:border-[#F5C45E]/40 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail view" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* 35-Point Diagnostic Checklist Guaranteed by Ezer */}
            <div className="rounded-3xl bg-[#141311] border border-[#26241F] p-6 space-y-4 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#F5C45E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#35A66A]" />
                On-Site Diagnostic Guarantee
              </h3>
              <p className="text-xs text-[#9E9B95] leading-relaxed">
                When you request physical inspection for this product, an independent Ezer technician verifies:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {[
                  'OEM Display & Touch Digitizer Check',
                  'Battery Health & Charge Cycle Test',
                  'Chassis Dent, Water LDI & Frame Alignment',
                  'IMEI Clean Title & Stolen Registry Check',
                  'Camera Sensors, Stabilization & Flash',
                  'Speakers, Mic & Biometric Sensor Health',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#E0DDD8]">
                    <div className="w-4 h-4 rounded-full bg-[#35A66A]/20 border border-[#35A66A]/40 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-[#35A66A] stroke-[3]" />
                    </div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT COLUMN: PRICING, SELLER & INSPECTION HERO ACTION BOX         */}
          {/* ================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title & Metadata */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#1C1A17] border border-[#2E2B25] text-[#F5C45E]">
                  {product.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#8E8B85]">
                  <MapPin className="w-3.5 h-3.5 text-[#F5C45E]" />
                  {product.location}
                </span>
                <span className="flex items-center gap-1 text-xs text-[#8E8B85]">
                  <Clock className="w-3.5 h-3.5" />
                  {product.posted_time}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {product.title}
              </h1>

              {/* Price Display */}
              <div className="pt-2 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#F5C45E]">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm sm:text-base text-[#8E8B85] line-through font-medium">
                  ₹{product.original_price.toLocaleString('en-IN')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#35A66A]/15 text-[#4ADE80] border border-[#35A66A]/30">
                  {discountPercent}% OFF
                </span>
              </div>
              <p className="text-xs text-[#35A66A] font-semibold">
                You save ₹{(product.original_price - product.price).toLocaleString('en-IN')} compared to original retail
              </p>
            </div>

            {/* Verification Hero CTA Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#1C1A15] via-[#141311] to-[#100F0D] border border-[#F5C45E]/40 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(245,196,94,0.15)] space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#25221B]">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E0DDD8] block">
                    Physical Inspection Fee
                  </span>
                  <span className="text-2xl font-black text-white">₹499</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#35A66A] block">
                    Zero Risk
                  </span>
                  <span className="text-xs text-[#9E9B95]">Before you pay seller</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 rounded-2xl text-sm font-extrabold bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] shadow-[0_0_25px_rgba(245,196,94,0.35)] hover:shadow-[0_0_35px_rgba(245,196,94,0.55)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98]"
              >
                <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                <span>Request Physical Inspection Now</span>
              </button>

              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-2xl text-xs font-semibold bg-[#1C1A17] hover:bg-[#25221C] text-[#E0DDD8] hover:text-white border border-[#2E2B25] hover:border-[#F5C45E]/40 transition-all flex items-center justify-center gap-2"
              >
                <span>View Original Classified Ad</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              {/* Trust disclaimer */}
              <div className="p-3.5 rounded-2xl bg-[#0B0A09]/80 border border-amber-500/20 text-xs text-[#9E9B95] flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="text-[11px] leading-relaxed">
                  <strong className="text-white">Safety Warning:</strong> Never send advance booking deposits to sellers on classified portals. Ezer inspects the hardware in-person first.
                </span>
              </div>
            </div>

            {/* Seller Information Card */}
            <div className="p-5 rounded-3xl bg-[#141311] border border-[#26241F] space-y-3 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-[#8E8B85]">
                Seller Details
              </span>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#1C1A17] border border-[#2E2B25] flex items-center justify-center text-[#F5C45E]">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">{product.seller_name}</h4>
                    <p className="text-[11px] text-[#8E8B85]">Individual Seller • {product.district}</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#1C1A17] text-[#9E9B95] border border-[#2A2721]">
                  Unverified Seller
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Verified Products Section */}
        {similarProducts.length > 0 && (
          <div className="pt-12 border-t border-[#201E1A] space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#F5C45E] block">
                  More in {product.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                  Similar Verified Listings
                </h3>
              </div>
              <Link
                href={`/marketplace?category=${encodeURIComponent(product.category)}`}
                className="text-xs font-bold text-[#F5C45E] hover:underline"
              >
                View all in {product.category} →
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {similarProducts.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.id}`}
                  className="rounded-2xl bg-[#141311] border border-[#26241F] hover:border-[#F5C45E]/40 overflow-hidden flex flex-col justify-between shadow-sm transition-all group"
                >
                  <div>
                    <div className="relative h-36 w-full bg-[#1A1815] overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3.5 space-y-1.5">
                      <div className="text-base font-extrabold text-[#F5C45E]">
                        ₹{item.price.toLocaleString('en-IN')}
                      </div>
                      <h4 className="text-xs font-semibold text-white line-clamp-1 leading-snug group-hover:text-[#F5C45E] transition-colors">
                        {item.title}
                      </h4>
                      <p className="text-[10px] text-[#8E8B85] truncate">{item.location}</p>
                    </div>
                  </div>

                  <div className="p-3.5 pt-0">
                    <div className="w-full py-2 rounded-xl text-[10px] font-bold bg-[#1C1A17] text-[#F5C45E] border border-[#353127] flex items-center justify-center gap-1 group-hover:bg-[#F5C45E] group-hover:text-[#0B0A09] transition-all">
                      <ShieldCheck className="w-3 h-3" />
                      <span>View & Inspect</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Manual Details & Photo Upload Modal */}
      <SubmitListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode="url"
        initialData={{
          url: product.url,
          title: product.title,
          category: product.category,
          price: product.price,
          location: product.location,
          district: product.district,
        }}
      />
    </div>
  );
}
