'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  Search,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  AlertCircle,
  Sparkles,
  Link as LinkIcon,
  FileEdit,
  Camera,
  MapPin,
  Clock,
  ExternalLink,
  ChevronDown,
  PhoneCall,
  Smartphone,
  Laptop,
  Car,
  Bike,
  Tv,
  Refrigerator,
  Armchair,
  Award,
  Crown,
  Heart,
  Plus,
} from 'lucide-react';
import { CATEGORIES, SUPPORTED_PLATFORMS, MOCK_MARKETPLACE_PRODUCTS } from '@/lib/constants';
import { createInspectionRequest, isValidListingUrl } from '@/lib/store';
import { SubmitListingModal } from '@/components/SubmitListingModal';
import { HeroVisual } from '@/components/HeroVisual';
import { AutoScrollBanner } from '@/components/AutoScrollBanner';
import confetti from 'canvas-confetti';

export default function HomePage() {
  const router = useRouter();

  // Primary URL state
  const [listingUrl, setListingUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal controls for manual details / photo upload options
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'url' | 'manual' | 'photo'>('manual');

  const handleAnalyzeListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    const trimmedUrl = listingUrl.trim();

    if (!trimmedUrl) {
      setFeedback({
        type: 'error',
        message: 'Please paste a valid listing URL to analyze.',
      });
      return;
    }

    if (!isValidListingUrl(trimmedUrl)) {
      setFeedback({
        type: 'error',
        message: 'Please enter a valid web URL (e.g. from OLX, Facebook Marketplace, or Quikr).',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await createInspectionRequest({
        listing_url: trimmedUrl,
        location: 'Indiranagar, Bengaluru',
        district: 'Bengaluru Urban',
      });

      if (res.success) {
        try {
          confetti({
            particleCount: 50,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F5C45E', '#D99C32', '#FFFFFF'],
          });
        } catch {
          // ignore
        }

        // Clear the URL input field so it becomes blank again
        setListingUrl('');

        setFeedback({
          type: 'success',
          message: 'Your inspection request has been submitted!',
        });
      } else {
        setFeedback({
          type: 'error',
          message: res.message || 'Unable to submit inspection request.',
        });
      }
    } catch {
      setFeedback({
        type: 'error',
        message: 'An error occurred while creating your inspection request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    Mobiles: <Smartphone className="w-5 h-5 text-[#F5C45E]" />,
    Laptops: <Laptop className="w-5 h-5 text-[#F5C45E]" />,
    Cars: <Car className="w-5 h-5 text-[#F5C45E]" />,
    Bikes: <Bike className="w-5 h-5 text-[#F5C45E]" />,
    Electronics: <Tv className="w-5 h-5 text-[#F5C45E]" />,
    'Home Appliances': <Refrigerator className="w-5 h-5 text-[#F5C45E]" />,
    Furniture: <Armchair className="w-5 h-5 text-[#F5C45E]" />,
  };

  const mobileCategoryTiles = [
    {
      label: 'Cars',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace?category=Cars',
    },
    {
      label: 'Laptops',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace?category=Laptops',
    },
    {
      label: 'Mobiles',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace?category=Mobiles',
    },
    {
      label: 'Inspections',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80',
      href: '/how-it-works',
    },
    {
      label: 'Electronics',
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace?category=Electronics',
    },
    {
      label: 'Bikes',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace?category=Bikes',
    },
    {
      label: 'Appliances',
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace?category=Home%20Appliances',
    },
    {
      label: 'Gadgets',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace',
    },
    {
      label: 'Furniture',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace?category=Furniture',
    },
    {
      label: 'View All',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=300&auto=format&fit=crop&q=80',
      href: '/marketplace',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white">
      {/* ========================================================================= */}
      {/* MOBILE APP LAYOUT (lg:hidden)                                             */}
      {/* Follows reference mobile app layout styled in Ezer luxury dark & gold     */}
      {/* Categories displayed directly at the top with no section above it        */}
      {/* ========================================================================= */}
      <div className="lg:hidden px-3.5 pt-3 pb-24 space-y-4 bg-[#0B0A09]">
        {/* Mobile Category Grid (2 Rows of 5 tiles matching reference screenshot with real photos) */}
        <div className="space-y-3 pt-0.5">
          <div className="grid grid-cols-5 gap-2 text-center">
            {mobileCategoryTiles.slice(0, 5).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-start group active:scale-95 transition-transform"
              >
                {/* Category Photo Card */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141311] border border-[#26241F] group-hover:border-[#F5C45E]/50 overflow-hidden p-1 shadow-sm transition-all duration-300 flex items-center justify-center">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#1C1A16]">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                {/* Category Name strictly BELOW the category photo */}
                <span className="mt-1.5 text-[11px] font-medium text-white group-hover:text-[#F5C45E] line-clamp-1 leading-tight text-center transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2 text-center">
            {mobileCategoryTiles.slice(5, 10).map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center justify-start group active:scale-95 transition-transform"
              >
                {/* Category Photo Card */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#141311] border border-[#26241F] group-hover:border-[#F5C45E]/50 overflow-hidden p-1 shadow-sm transition-all duration-300 flex items-center justify-center">
                  <div className="w-full h-full rounded-xl overflow-hidden bg-[#1C1A16]">
                    <img
                      src={item.image}
                      alt={item.label}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                {/* Category Name strictly BELOW the category photo */}
                <span className="mt-1.5 text-[11px] font-medium text-white group-hover:text-[#F5C45E] line-clamp-1 leading-tight text-center transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Mobile Automatically Scrolling Banners with Bubble Indicators */}
        <AutoScrollBanner className="my-1" />

        {/* 4. Quick URL Input Card for Direct Verification */}
        <div className="rounded-2xl bg-[#141311] border border-[#26241F] p-3.5 space-y-2.5 shadow-md link-input-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-[#F5C45E]" />
              Paste Listing URL to Verify
            </span>
            <span className="text-[10px] text-[#8E8B85]">Instant Dispatch</span>
          </div>

          <form onSubmit={handleAnalyzeListing} className="space-y-2">
            <div className="flex items-center bg-[#1A1815] border border-[#2F2C24] rounded-xl px-3 py-2 focus-within:border-[#F5C45E]/60 transition-colors link-input-wrapper">
              <input
                id="mobile-quick-url-input"
                type="text"
                value={listingUrl}
                onChange={(e) => {
                  setListingUrl(e.target.value);
                  if (feedback) setFeedback(null);
                }}
                placeholder="Paste listing URL here..."
                className="w-full bg-transparent text-xs text-white placeholder-[#78756F] outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] shadow-[0_0_15px_rgba(245,196,94,0.3)] flex items-center justify-center gap-1.5 active:scale-98 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-4 h-4 border-2 border-[#0B0A09] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Analyze Listing</span>
                  <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </>
              )}
            </button>
          </form>

          {/* Feedback message */}
          {feedback && (
            <div
              className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 animate-fadeIn ${
                feedback.type === 'success'
                  ? 'bg-[#35A66A]/15 border-[#35A66A]/40 text-[#4ADE80]'
                  : 'bg-[#E05252]/15 border-[#E05252]/40 text-[#F87171]'
              }`}
            >
              <span className="font-semibold text-[11px]">{feedback.message}</span>
              {feedback.type === 'success' && (
                <Link
                  href="/dashboard"
                  className="px-2 py-0.5 rounded bg-[#35A66A] text-white font-bold text-[10px] shrink-0"
                >
                  Dashboard →
                </Link>
              )}
            </div>
          )}

          {/* Supported platform badges */}
          <div className="flex items-center gap-1.5 text-[10px] text-[#8E8B85] pt-0.5 overflow-x-auto scrollbar-none">
            <span>Supported:</span>
            <span className="px-1.5 py-0.5 rounded bg-[#EDE7F6] text-[#5E35B1] font-bold">olx</span>
            <span className="px-1.5 py-0.5 rounded bg-[#1877F2] text-white font-bold">f</span>
            <span className="px-1.5 py-0.5 rounded bg-[#E0F2F1] text-[#00796B] font-bold">Quikr</span>
            <span className="px-1.5 py-0.5 rounded bg-[#E3F2FD] text-[#0277BD] font-bold">Truecaller</span>
          </div>
        </div>

        {/* 5. "Recommended For You" Section (2-Column Product Grid matching screenshot) */}
        <div className="space-y-3 pt-1">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1 text-xs font-bold text-white">
                <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
                <span>Recommended For You</span>
              </div>
              <span className="text-[10px] text-[#8E8B85]">Powered by Ezer Trust Engine</span>
            </div>
            <Link
              href="/marketplace"
              className="text-xs font-bold text-[#F5C45E] hover:underline"
            >
              View all
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {MOCK_MARKETPLACE_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="rounded-2xl bg-[#141311] border border-[#26241F] overflow-hidden flex flex-col justify-between shadow-sm hover:border-[#F5C45E]/40 transition-all group"
              >
                <Link href={`/product/${prod.id}`} className="block">
                  <div className="relative h-28 w-full bg-[#1A1815] overflow-hidden">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="p-2.5 space-y-1">
                    <div className="text-base font-extrabold text-[#F5C45E]">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </div>
                    <h4 className="text-xs font-semibold text-white line-clamp-1 leading-snug group-hover:text-[#F5C45E] transition-colors">
                      {prod.title}
                    </h4>
                    <div className="flex items-center justify-between text-[10px] text-[#8E8B85] pt-0.5">
                      <span className="truncate max-w-[85px]">{prod.location.split(',')[0]}</span>
                      <span>{prod.posted_time}</span>
                    </div>
                  </div>
                </Link>

                <div className="p-2.5 pt-0">
                  <Link
                    href={`/product/${prod.id}`}
                    className="w-full py-1.5 rounded-lg text-[10px] font-bold bg-[#1C1A17] hover:bg-[#F5C45E] text-[#F5C45E] hover:text-[#0B0A09] border border-[#353127] transition-colors flex items-center justify-center gap-1"
                  >
                    <ShieldCheck className="w-3 h-3" />
                    <span>View & Inspect</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP VIEW (hidden lg:block)                                            */}
      {/* Exactly as current luxury hero, features, protocol & preview              */}
      {/* ========================================================================= */}
      <div className="hidden lg:block">
        {/* LUXURY HERO SECTION */}
        <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0B0A09]">
          {/* Ambient Warm Golden Aura */}
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[350px] bg-[#F5C45E]/10 rounded-full blur-[170px] pointer-events-none -z-10" />
          <div className="absolute top-10 right-10 w-[450px] h-[300px] bg-[#D99C32]/8 rounded-full blur-[160px] pointer-events-none -z-10" />

          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
              {/* LEFT COLUMN: HERO HEADLINE, BULLETS & SUBMISSION CARD */}
              <div className="lg:col-span-7 space-y-7">
                {/* Luxury Headline */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.08] font-sans">
                  Know Before <br />
                  <span className="gold-text-gradient">
                    You Buy.
                  </span>
                </h1>

                {/* Subheading */}
                <p className="text-base sm:text-lg text-[#9E9B95] leading-relaxed max-w-xl font-normal">
                  Found something interesting on OLX or Facebook Marketplace?
                  <br className="hidden sm:inline" />
                  Let a verified local expert inspect it before you spend your money.
                </p>

                {/* Three Feature Badges with Vertical Dividers */}
                <div className="flex items-center gap-4 sm:gap-6 pt-1 text-xs">
                  {/* 1. Verified Local Experts */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#1C1A16] border border-[#F5C45E]/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,196,94,0.15)]">
                      <ShieldCheck className="w-5 h-5 text-[#F5C45E]" />
                    </div>
                    <div className="text-xs leading-snug text-white font-medium">
                      <span>Verified</span>
                      <br />
                      <span className="text-[#9E9B95]">Local Experts</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-8 w-[1px] bg-[#2E2B25]" />

                  {/* 2. Physical Product Inspection */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#1C1A16] border border-[#F5C45E]/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,196,94,0.15)]">
                      <Search className="w-4 h-4 text-[#F5C45E]" />
                    </div>
                    <div className="text-xs leading-snug text-white font-medium">
                      <span>Physical Product</span>
                      <br />
                      <span className="text-[#9E9B95]">Inspection</span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-8 w-[1px] bg-[#2E2B25]" />

                  {/* 3. Detailed Condition Reports */}
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#1C1A16] border border-[#F5C45E]/30 flex items-center justify-center shrink-0 shadow-[0_0_12px_rgba(245,196,94,0.15)]">
                      <FileCheck className="w-4 h-4 text-[#F5C45E]" />
                    </div>
                    <div className="text-xs leading-snug text-white font-medium">
                      <span>Detailed Condition</span>
                      <br />
                      <span className="text-[#9E9B95]">Reports</span>
                    </div>
                  </div>
                </div>

                {/* LUXURY SUBMISSION CARD */}
                <div
                  id="verify-form"
                  className="bg-[#141311]/95 backdrop-blur-2xl border border-[#F5C45E]/30 rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_30px_rgba(245,196,94,0.1)] space-y-4 max-w-xl transition-all link-input-card"
                >
                  {/* Input Pill & Button Row */}
                  <form
                    onSubmit={handleAnalyzeListing}
                    className="bg-[#1C1A17] border border-[#332E25] focus-within:border-[#F5C45E]/70 focus-within:shadow-[0_0_20px_rgba(245,196,94,0.25)] rounded-2xl flex items-center p-1.5 transition-all link-input-wrapper"
                  >
                    <div className="pl-3.5 text-[#8E8B85]">
                      <LinkIcon className="w-4 h-4 text-[#F5C45E]" />
                    </div>
                    <input
                      type="text"
                      value={listingUrl}
                      onChange={(e) => {
                        setListingUrl(e.target.value);
                        if (feedback) setFeedback(null);
                      }}
                      placeholder="Paste your listing URL to inspect..."
                      className="w-full bg-transparent text-white text-sm placeholder-[#75726B] outline-none px-3 py-2.5 font-normal"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-3 rounded-xl font-bold text-sm bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] hover:shadow-[0_0_25px_rgba(245,196,94,0.45)] transition-all flex items-center gap-1.5 shrink-0 shadow-md hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-[#0B0A09] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span>Analyze Listing</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* SUCCESS / ERROR NOTIFICATION */}
                  {feedback && (
                    <div
                      className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 animate-fadeIn ${
                        feedback.type === 'success'
                          ? 'bg-[#35A66A]/15 border-[#35A66A]/40 text-[#4ADE80]'
                          : 'bg-[#E05252]/15 border-[#E05252]/40 text-[#F87171]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {feedback.type === 'success' ? (
                          <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-[#E05252] shrink-0" />
                        )}
                        <span className="font-semibold">{feedback.message}</span>
                      </div>

                      {feedback.type === 'success' && (
                        <Link
                          href="/dashboard"
                          className="px-3 py-1.5 rounded-lg bg-[#35A66A] text-white font-bold text-xs hover:bg-[#2F8E5B] transition-colors whitespace-nowrap shadow-sm"
                        >
                          View in Dashboard →
                        </Link>
                      )}
                    </div>
                  )}

                  {/* Supported Platforms Row & 1-Click Sample Links */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex flex-wrap items-center gap-2.5 text-xs">
                      <span className="text-[#8E8B85] text-xs font-medium mr-0.5">
                        Supported Platforms:
                      </span>

                      {/* OLX Badge */}
                      <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-[#EDE7F6] text-[#5E35B1] font-black text-xs tracking-tight border border-purple-200">
                        olx
                      </span>

                      {/* Facebook Badge */}
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#1877F2] text-white font-bold text-xs">
                        f
                      </span>

                      {/* Quikr Badge */}
                      <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-[#E0F2F1] text-[#00796B] font-bold text-xs border border-teal-200">
                        Quikr
                      </span>

                      {/* Truecaller Buy & Sell Badge */}
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#E3F2FD] text-[#0277BD] font-semibold text-xs border border-blue-200">
                        <PhoneCall className="w-2.5 h-2.5" />
                        <span>Truecaller Buy & Sell</span>
                      </span>

                      <span className="text-[#4E4A42] text-xs mx-0.5">|</span>

                      {/* More dropdown */}
                      <span className="inline-flex items-center gap-0.5 text-[#9E9B95] hover:text-white text-xs font-medium cursor-pointer transition-colors">
                        <span>More</span>
                        <ChevronDown className="w-3 h-3" />
                      </span>
                    </div>

                    {/* 1-Click Quick Sample Testing Links */}
                    <div className="flex items-center gap-2 pt-1 border-t border-[#23201B] text-[11px] text-[#8E8B85]">
                      <span className="font-medium text-[#7D7971]">Quick test link:</span>
                      <button
                        type="button"
                        onClick={() => setListingUrl('https://www.olx.in/item/iphone-14-128gb-midnight-urgent-sale-iid-18491029')}
                        className="px-2.5 py-1 rounded-lg bg-[#1A1815] hover:bg-[#25221C] text-[#F5C45E] border border-[#332E25] hover:border-[#F5C45E]/50 transition-all text-[11px]"
                      >
                        iPhone 14 (OLX)
                      </button>
                      <button
                        type="button"
                        onClick={() => setListingUrl('https://www.facebook.com/marketplace/item/928491048201')}
                        className="px-2.5 py-1 rounded-lg bg-[#1A1815] hover:bg-[#25221C] text-[#F5C45E] border border-[#332E25] hover:border-[#F5C45E]/50 transition-all text-[11px]"
                      >
                        Samsung S23 (FB)
                      </button>
                      <button
                        type="button"
                        onClick={() => setListingUrl('https://www.quikr.com/electronics/apple-macbook-air-m1-excellent-shape/p/38491039')}
                        className="px-2.5 py-1 rounded-lg bg-[#1A1815] hover:bg-[#25221C] text-[#F5C45E] border border-[#332E25] hover:border-[#F5C45E]/50 transition-all text-[11px]"
                      >
                        MacBook Air M1
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: 3D HARDWARE DISPLAY & FLOATING TRUST REPORT CARD */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end">
                <HeroVisual />
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* DESKTOP AUTOMATICALLY SCROLLING BANNERS WITH BUBBLE INDICATORS            */}
        {/* ========================================================================= */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 mb-8 relative z-20">
          <AutoScrollBanner />
        </section>

        {/* 4 FEATURE HIGHLIGHTS */}
        <section className="py-14 bg-[#0E0D0B] border-y border-[#201E1A]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Listing Analysis',
                  desc: 'Digital check for seller red flags, unrealistic pricing, stolen IMEIs, and suspicious reposts.',
                  icon: Search,
                },
                {
                  title: 'Physical Inspection',
                  desc: 'Verified local technicians physically inspect hardware, battery health, chassis damage & OEM parts.',
                  icon: ShieldCheck,
                },
                {
                  title: 'Detailed Report',
                  desc: 'Comprehensive condition score (1-10), fair valuation estimate, and actionable checklist before you pay.',
                  icon: FileCheck,
                },
                {
                  title: 'Buy with Confidence',
                  desc: 'Save travel hours, avoid scams, and negotiate prices backed by independent expert findings.',
                  icon: Sparkles,
                },
              ].map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <div
                    key={i}
                    className="bg-gradient-to-b from-[#161513] to-[#100F0D] border border-[#26241F] hover:border-[#F5C45E]/40 rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 group shadow-[0_15px_35px_-10px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_-10px_rgba(245,196,94,0.15)]"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#1F1C16] border border-[#F5C45E]/30 flex items-center justify-center mb-5 group-hover:bg-[#F5C45E] group-hover:text-[#0B0A09] text-[#F5C45E] transition-all shadow-[0_0_15px_rgba(245,196,94,0.15)]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#F5C45E] transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#9E9B95] leading-relaxed">
                      {feat.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW EZER WORKS */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#181613] border border-[#F5C45E]/30 text-[#F5C45E] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
              Verification Protocol
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              How Ezer Works
            </h2>
            <p className="text-sm text-[#9E9B95] max-w-xl mx-auto">
              Physical verification handled entirely for you — without you ever stepping out of home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                title: 'Share a Listing',
                desc: 'Found a phone, laptop, car or bike on OLX or Facebook Marketplace? Simply paste the link here.',
                badge: 'Instant Dispatch',
              },
              {
                step: '02',
                title: 'Get Expert Verification',
                desc: 'Our verified specialist in the seller’s area travels to their location with diagnostic tools.',
                badge: 'On-Site Diagnostic',
              },
              {
                step: '03',
                title: 'Receive Inspection Report',
                desc: 'Get an unbiased digital report with condition score, photos, component checklist & fair price estimate.',
                badge: 'Know Before You Pay',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="relative bg-gradient-to-b from-[#161513] to-[#100F0D] border border-[#282620] hover:border-[#F5C45E]/40 rounded-3xl p-7 sm:p-8 flex flex-col justify-between shadow-[0_20px_45px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-1 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-4xl font-black bg-gradient-to-b from-[#F5C45E] to-[#614513] bg-clip-text text-transparent font-mono">
                      {item.step}
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#1F1D19] border border-[#3A352A] text-[#F5C45E] shadow-sm">
                      {item.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#F5C45E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9E9B95] leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-[#23211D] flex items-center text-xs font-semibold text-[#F5C45E]">
                  <span>100% Impartial Physical Check</span>
                  <CheckCircle2 className="w-3.5 h-3.5 ml-2 text-[#35A66A]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* POPULAR CATEGORIES & SAMPLE DISCOVERY SECTION */}
        <section className="py-20 bg-[#0E0D0B] border-t border-[#201E1A] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-[#F5C45E] block mb-1">
                  Luxury Pre-Owned Directory
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Supported Product Categories
                </h2>
              </div>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5C45E] hover:underline"
              >
                <span>Explore All Verified Categories</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Category Chips with Real Photos */}
            <div className="grid grid-cols-4 lg:grid-cols-7 gap-4 mb-14">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/marketplace?category=${encodeURIComponent(cat.name)}`}
                  className="flex flex-col items-center justify-start text-center group transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-20 h-20 rounded-3xl bg-[#141311] border border-[#26241F] group-hover:border-[#F5C45E]/50 p-1.5 overflow-hidden shadow-sm hover:shadow-[0_0_25px_rgba(245,196,94,0.18)] transition-all flex items-center justify-center">
                    <div className="w-full h-full rounded-2xl overflow-hidden bg-[#1C1A16]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  {/* Category Name Below the Category Card */}
                  <span className="mt-2 text-xs font-bold text-white group-hover:text-[#F5C45E] transition-colors block">
                    {cat.name}
                  </span>
                  <span className="text-[10px] text-[#35A66A] mt-0.5 font-semibold">
                    Diagnostics Ready
                  </span>
                </Link>
              ))}
            </div>

            {/* Sample Product Cards Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {MOCK_MARKETPLACE_PRODUCTS.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  className="bg-[#141311] border border-[#26241F] hover:border-[#F5C45E]/40 rounded-3xl overflow-hidden transition-all duration-300 flex flex-col justify-between group shadow-[0_15px_35px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_45px_rgba(245,196,94,0.12)] hover:-translate-y-1"
                >
                  <Link href={`/product/${product.id}`} className="block">
                    <div className="relative h-48 w-full bg-[#100F0D] overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center justify-between text-xs text-[#8E8B85]">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#F5C45E]" />
                          {product.location}
                        </span>
                        <span>{product.posted_time}</span>
                      </div>

                      <h3 className="font-bold text-sm text-white line-clamp-2 leading-snug group-hover:text-[#F5C45E] transition-colors">
                        {product.title}
                      </h3>

                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#4ADE80]">
                        <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
                        <span>Inspector Available in 2 hrs</span>
                      </div>

                      <div className="flex items-baseline gap-2.5 pt-1">
                        <span className="text-xl font-extrabold text-[#F5C45E]">
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#8E8B85] line-through">
                          ₹{product.original_price.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-5 pt-0">
                    <Link
                      href={`/product/${product.id}`}
                      className="w-full py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#1C1A17] to-[#25221C] hover:from-[#F5C45E] hover:to-[#D99C32] text-[#F5C45E] hover:text-[#0B0A09] border border-[#3A352B] hover:border-[#F5C45E] transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-[0_0_20px_rgba(245,196,94,0.3)]"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>View Details & Inspect</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* LUXURY PARTNER CTA */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#1C1A15] via-[#141310] to-[#0E0D0B] border border-[#F5C45E]/40 p-8 sm:p-14 overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,196,94,0.12)]">
            <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#F5C45E]/15 rounded-full blur-[140px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25221B] border border-[#F5C45E]/30 text-[#F5C45E] text-xs font-semibold uppercase tracking-wider">
                <Crown className="w-3.5 h-3.5 text-[#F5C45E]" />
                Expert Inspector Guild
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Become an Ezer Expert Partner
              </h2>
              <p className="text-sm sm:text-base text-[#9E9B95] leading-relaxed">
                Help people make smarter second-hand purchases. Earn ₹499 to ₹1,500+ per physical inspection by bringing trust to every transaction in your city.
              </p>
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/join-partner"
                  className="px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] shadow-[0_0_25px_rgba(245,196,94,0.35)] hover:shadow-[0_0_35px_rgba(245,196,94,0.55)] transition-all flex items-center gap-2 hover:scale-[1.02]"
                >
                  <span>Apply as an Inspector</span>
                  <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                </Link>
                <Link
                  href="/inspector"
                  className="secondary-luxury-btn px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-[#1A1815] border border-[#2E2B25] text-white hover:border-[#F5C45E]/50 transition-all flex items-center gap-2 shadow-sm"
                >
                  <span>View Inspector Portal Demo</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Manual Details & Photo Upload Modal */}
      <SubmitListingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialMode={modalMode}
        onSuccess={() => {
          setFeedback({
            type: 'success',
            message: 'Your inspection request has been submitted!',
          });
        }}
      />
    </div>
  );
}
