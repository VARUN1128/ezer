'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Search,
  Award,
  Zap,
} from 'lucide-react';

export interface BannerSlide {
  id: string;
  badge: string;
  badgeIcon: React.ElementType;
  title: string;
  highlightText: string;
  subtitle: string;
  ctaText: string;
  ctaLink?: string;
  onCtaClick?: () => void;
  image: string;
  imageAlt: string;
  theme: 'blue' | 'gold' | 'emerald';
  stat: {
    number: string;
    label: string;
  };
  checkmarks: string[];
}

const defaultSlides: BannerSlide[] = [
  {
    id: 'slide-1',
    badge: '35-Point Physical Protocol',
    badgeIcon: ShieldCheck,
    title: 'Never Pay Upfront for a',
    highlightText: 'Swapped Screen or Hidden Flaw',
    subtitle: 'An Ezer certified field technician visits the seller, tests OEM battery, chassis, camera and display, then delivers a certified digital score before you pay.',
    ctaText: 'Book Physical Inspection',
    ctaLink: '/how-it-works',
    image: '/hero-real-gadgets.jpg',
    imageAlt: 'Certified hardware inspection of laptop and smartphone',
    theme: 'blue',
    stat: {
      number: '99.4%',
      label: 'Fraud Prevention Rate',
    },
    checkmarks: ['OEM Screen Test', 'Battery Diagnostics', 'IMEI Blacklist Check'],
  },
  {
    id: 'slide-2',
    badge: 'Curated & Pre-Inspected',
    badgeIcon: Award,
    title: 'Shop Verified Pre-Owned',
    highlightText: 'With Official Ezer Warranty Score',
    subtitle: 'Browse certified iPhones, MacBooks, gaming laptops and two-wheelers with transparent 35-point diagnostic reports and zero hidden repair history.',
    ctaText: 'Explore Verified Listings',
    ctaLink: '/marketplace',
    image: '/hero-macbook-black.jpg',
    imageAlt: 'Pre-inspected verified MacBook and electronics',
    theme: 'gold',
    stat: {
      number: '1,420+',
      label: 'Inspected Listings',
    },
    checkmarks: ['Score > 8.0/10 Only', 'True Condition Report', 'Direct Seller Contact'],
  },
  {
    id: 'slide-3',
    badge: 'Seller Authenticity Shield',
    badgeIcon: Zap,
    title: 'Selling on OLX or Facebook?',
    highlightText: 'Get Verified & Close Deals 3x Faster',
    subtitle: 'Buyers avoid unverified second-hand sellers. Display an official Ezer Trust Certificate on your ad to stand out, attract serious buyers, and skip price haggling.',
    ctaText: 'Get Seller Badge Now',
    image: '/hero-desk-dark.jpg',
    imageAlt: 'Seller pre-verification inspection on workstation',
    theme: 'emerald',
    stat: {
      number: '3.2x',
      label: 'Faster Buyer Conversion',
    },
    checkmarks: ['Official Ezer QR Badge', 'Shareable Live Report', 'Priority Buyer Inquiries'],
  },
];

interface AutoScrollBannerProps {
  className?: string;
  slides?: BannerSlide[];
  autoScrollInterval?: number;
}

export const AutoScrollBanner: React.FC<AutoScrollBannerProps> = ({
  className = '',
  slides = defaultSlides,
  autoScrollInterval = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);
  const touchEndXRef = useRef<number | null>(null);

  // Auto scroll effect
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, autoScrollInterval);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused, slides.length, autoScrollInterval]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartXRef.current === null || touchEndXRef.current === null) return;
    const diff = touchStartXRef.current - touchEndXRef.current;
    if (diff > 45) {
      handleNext();
    } else if (diff < -45) {
      handlePrev();
    }
    touchStartXRef.current = null;
    touchEndXRef.current = null;
  };

  return (
    <div
      className={`auto-scroll-banner-root relative w-full overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-out w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const BadgeIcon = slide.badgeIcon;
          const themeClass =
            slide.theme === 'blue'
              ? 'banner-theme-blue'
              : slide.theme === 'gold'
              ? 'banner-theme-gold'
              : 'banner-theme-emerald';

          return (
            <div key={slide.id} className="w-full shrink-0 px-0">
              <div
                className={`banner-card ${themeClass} relative overflow-hidden rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-7 transition-all duration-300`}
              >
                {/* Decorative Subtle Watermark Geometry */}
                <div className="banner-watermark absolute -right-10 -bottom-10 pointer-events-none opacity-5">
                  <ShieldCheck className="w-64 h-64" />
                </div>

                <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
                  {/* Left Content Area */}
                  <div className="flex-1 space-y-2 sm:space-y-3 max-w-2xl">
                    {/* Badge Pill */}
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="banner-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wide uppercase shadow-sm">
                        <BadgeIcon className="w-3.5 h-3.5 shrink-0" />
                        <span>{slide.badge}</span>
                      </span>
                      <span className="banner-subtag text-[10px] sm:text-xs font-semibold">
                        • Verified Buyer Network
                      </span>
                    </div>

                    {/* Headline */}
                    <h3 className="banner-heading text-base sm:text-xl lg:text-2xl font-black tracking-tight leading-snug sm:leading-tight">
                      <span>{slide.title} </span>
                      <span className="banner-highlight block sm:inline">{slide.highlightText}</span>
                    </h3>

                    {/* Subtitle */}
                    <p className="banner-subtitle text-xs sm:text-sm leading-relaxed max-w-xl line-clamp-2 sm:line-clamp-none">
                      {slide.subtitle}
                    </p>

                    {/* Checkmarks row */}
                    <div className="flex items-center gap-3 sm:gap-4 flex-wrap pt-0.5">
                      {slide.checkmarks.map((check, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-1.5 banner-check-item">
                          <CheckCircle2 className="w-3.5 h-3.5 banner-check-icon shrink-0" />
                          <span className="text-[11px] sm:text-xs font-semibold banner-check-text">
                            {check}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Action & Stats Row */}
                    <div className="pt-2 flex items-center gap-4 sm:gap-6 flex-wrap">
                      {slide.ctaLink ? (
                        <Link
                          href={slide.ctaLink}
                          className="banner-cta-btn inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg active:scale-95 transition-all"
                        >
                          <span>{slide.ctaText}</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (slide.onCtaClick) {
                              slide.onCtaClick();
                            } else {
                              window.dispatchEvent(new CustomEvent('open-verify-modal'));
                            }
                          }}
                          className="banner-cta-btn inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white shadow-lg active:scale-95 transition-all"
                        >
                          <span>{slide.ctaText}</span>
                          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                        </button>
                      )}

                      {/* Micro Stat */}
                      <div className="banner-stat flex items-center gap-2 pl-3 sm:pl-4 border-l">
                        <span className="banner-stat-num text-sm sm:text-lg font-black tracking-tight">
                          {slide.stat.number}
                        </span>
                        <span className="banner-stat-label text-[10px] sm:text-xs leading-tight">
                          {slide.stat.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Real Photo Preview Stage */}
                  <div className="hidden sm:flex relative shrink-0 items-center justify-center">
                    <div className="banner-photo-wrapper relative w-40 h-32 sm:w-48 sm:h-36 lg:w-56 lg:h-40 rounded-2xl overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.03]">
                      <Image
                        src={slide.image}
                        alt={slide.imageAlt}
                        fill
                        className="object-cover object-center"
                      />
                      <div className="banner-photo-overlay absolute inset-0 pointer-events-none" />

                      {/* Small Live Tag on photo */}
                      <div className="absolute top-2.5 left-2.5 banner-photo-tag px-2 py-0.5 rounded-md text-[10px] font-bold backdrop-blur-md flex items-center gap-1 shadow-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>EZER LAB</span>
                      </div>

                      {/* Small Bottom pill */}
                      <div className="absolute bottom-2 right-2 banner-photo-bottom-tag px-2 py-0.5 rounded-md text-[9px] font-semibold backdrop-blur-md">
                        Inspected
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bubble / Dot Indicators & Left/Right Arrows */}
      <div className="flex items-center justify-between pt-3 px-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="banner-nav-btn w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Bubble Indicators */}
        <div className="flex items-center gap-2">
          {slides.map((slide, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`banner-indicator transition-all duration-300 rounded-full ${
                  isActive ? 'banner-indicator-active' : 'banner-indicator-inactive'
                }`}
              />
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="banner-nav-btn w-7 h-7 rounded-full flex items-center justify-center transition-all active:scale-90"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
