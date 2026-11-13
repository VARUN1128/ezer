'use client';

import React from 'react';
import Link from 'next/link';
import { EzerLogo } from './EzerLogo';
import { ArrowUp, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Analyze Listing', href: '/#verify-form' },
    { label: 'Marketplace', href: '/marketplace' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Inspector Guild', href: '/join-partner' },
    { label: 'My Requests', href: '/dashboard' },
    { label: 'About', href: '/about' },
  ];

  const districts = [
    'Bengaluru',
    'Mumbai',
    'Delhi NCR',
    'Kochi',
    'Hyderabad',
    'Pune',
    'Chennai',
    'Kolkata',
  ];

  return (
    <footer className="relative bg-[#080706] border-t border-[#1C1A17] pt-14 pb-24 lg:pb-12 text-[#8E8B85] overflow-hidden select-none transition-colors">
      {/* Giant Minimalist Creative Watermark Typography in Background */}
      <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 pointer-events-none select-none text-[15vw] font-black tracking-tighter text-white/[0.025] leading-none whitespace-nowrap font-sans">
        EZER TRUST
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-10">
        {/* Top Architectural Row: Brand + Live Network Status + Back to Top */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1A1815]">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <EzerLogo size="md" showTagline={false} />
            <span className="hidden sm:inline-block w-[1px] h-5 bg-[#26241F]" />
            <p className="text-xs text-[#8E8B85] max-w-sm leading-relaxed">
              India’s independent on-site product inspection platform. Know before you buy.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Operational Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#141311] border border-[#26241F] text-[11px] text-[#A19D95] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#35A66A] animate-pulse" />
              <span>Inspection Network Active</span>
            </div>

            {/* Back to Top Minimalist Pill */}
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 sm:px-3 sm:py-1.5 rounded-full bg-[#141311] hover:bg-[#1C1A17] border border-[#26241F] hover:border-[#F5C45E]/40 text-xs text-[#8E8B85] hover:text-[#F5C45E] transition-all flex items-center gap-1.5 shadow-sm group cursor-pointer"
              aria-label="Scroll back to top"
            >
              <span className="hidden sm:inline text-[11px] font-medium">Top</span>
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Center Minimal Grid: Navigation Index & Active Districts */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Platform Navigation Minimal Index */}
          <div className="md:col-span-6 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#F5C45E]">
              Directory Index
            </span>
            <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-[#9E9B95] hover:text-[#F5C45E] transition-colors font-medium py-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Active Coverage Minimal Ticker */}
          <div className="md:col-span-6 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#8E8B85]">
              Active On-Site Districts
            </span>
            <div className="flex flex-wrap gap-1.5 text-xs">
              {districts.map((city) => (
                <span
                  key={city}
                  className="px-2.5 py-1 rounded-lg bg-[#12110F] border border-[#201E1A] text-[11px] text-[#7D7971] hover:border-[#F5C45E]/30 hover:text-[#A19D95] transition-colors"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Minimal Copyright & Neutral Legal Line */}
        <div className="pt-8 border-t border-[#171512] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#636059]">
          <p>© {new Date().getFullYear()} Ezer Technologies Pvt. Ltd. All rights reserved.</p>

          <p className="max-w-md text-center sm:text-right leading-tight">
            Independent physical inspection service. Not affiliated with external classifieds.
          </p>
        </div>
      </div>
    </footer>
  );
};
