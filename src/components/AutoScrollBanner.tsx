'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface ImageBannerSlide {
  id: string;
  image: string;
  alt: string;
  href?: string;
}

const defaultImageSlides: ImageBannerSlide[] = [
  {
    id: 'banner-phone',
    image: '/banner-phone.jpg',
    alt: 'Looking for a new phone? Exclusive Deals on Verified Mobiles',
    href: '/marketplace?category=Mobiles',
  },
  {
    id: 'banner-laptop',
    image: '/banner-laptop.jpg',
    alt: 'Laptop Sale - Deals on Verified MacBooks and Laptops',
    href: '/marketplace?category=Laptops',
  },
  {
    id: 'banner-car',
    image: '/banner-car.png',
    alt: 'Need Car? Quality Certified Pre-Owned Vehicles',
    href: '/marketplace?category=Cars',
  },
];

interface AutoScrollBannerProps {
  className?: string;
  slides?: ImageBannerSlide[];
  autoScrollInterval?: number;
}

export const AutoScrollBanner: React.FC<AutoScrollBannerProps> = ({
  className = '',
  slides = defaultImageSlides,
  autoScrollInterval = 4000,
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
      className={`relative w-full overflow-hidden select-none ${className}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => {
          const content = (
            <div className="relative w-full aspect-[2.65/1] sm:aspect-[2.7/1] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#2B2823] dark:border-[#2B2823] light:border-[#E2DDD3] shadow-[0_12px_35px_rgba(0,0,0,0.5)] light:shadow-[0_10px_25px_rgba(0,0,0,0.08)] bg-[#0C0B0A] light:bg-white group cursor-pointer">
              <Image
                src={slide.image}
                alt={slide.alt}
                fill
                priority={index === 0}
                className="object-cover object-center group-hover:scale-[1.015] transition-transform duration-500"
              />
            </div>
          );

          return (
            <div key={slide.id} className="w-full shrink-0 px-0.5">
              {slide.href ? (
                <Link href={slide.href} className="block w-full">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}
      </div>

      {/* Bubble / Dot Indicators & Navigation Arrows */}
      <div className="flex items-center justify-between pt-2.5 sm:pt-3 px-2">
        {/* Previous Button */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous slide"
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#181613] hover:bg-[#25221C] light:bg-white light:hover:bg-[#F8F7F4] border border-[#2D2A24] light:border-[#D6D0C4] text-[#A6A29A] hover:text-white light:text-[#475569] light:hover:text-[#0F172A] flex items-center justify-center transition-all shadow-md active:scale-90"
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
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-7 sm:w-8 h-2.5 bg-[#F5C45E] light:bg-[#D97706] shadow-[0_0_12px_rgba(245,196,94,0.6)] light:shadow-[0_0_10px_rgba(217,119,6,0.4)]'
                    : 'w-2.5 h-2.5 bg-[#33302A] hover:bg-[#524E45] light:bg-[#CBD5E1] light:hover:bg-[#94A3B8]'
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
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#181613] hover:bg-[#25221C] light:bg-white light:hover:bg-[#F8F7F4] border border-[#2D2A24] light:border-[#D6D0C4] text-[#A6A29A] hover:text-white light:text-[#475569] light:hover:text-[#0F172A] flex items-center justify-center transition-all shadow-md active:scale-90"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
