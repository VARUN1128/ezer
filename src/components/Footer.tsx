'use client';

import React from 'react';
import Link from 'next/link';
import { EzerLogo } from './EzerLogo';
import { ShieldCheck, MapPin, ExternalLink, Heart, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#080706] border-t border-[#1F1D19] pt-16 pb-24 sm:pb-14 text-[#9E9B95] text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <EzerLogo size="md" showTagline={true} />
            <p className="text-xs text-[#8E8B85] leading-relaxed">
              India's premier physical verification platform for second-hand products. We dispatch verified expert technicians to inspect OLX, Facebook & Quikr listings before payment.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#F5C45E] font-medium">
              <ShieldCheck className="w-4 h-4 text-[#F5C45E]" />
              <span>100% Impartial Physical Verification</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F5C45E]" />
              Platform
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/" className="hover:text-[#F5C45E] transition-colors">
                  Home & URL Analyzer
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-[#F5C45E] transition-colors">
                  How Verification Works
                </Link>
              </li>
              <li>
                <Link href="/marketplace" className="hover:text-[#F5C45E] transition-colors">
                  Browse Demo Categories
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#F5C45E] transition-colors">
                  Customer Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#F5C45E] transition-colors">
                  About Ezer's Mission
                </Link>
              </li>
            </ul>
          </div>

          {/* For Inspectors */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F5C45E]" />
              For Inspectors
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link
                  href="/join-partner"
                  className="text-[#F5C45E] font-medium hover:underline inline-flex items-center gap-1"
                >
                  Become an Ezer Partner
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
              <li>
                <Link href="/inspector" className="hover:text-[#F5C45E] transition-colors">
                  Inspector Portal & Jobs
                </Link>
              </li>
              <li>
                <Link href="/inspector?tab=earnings" className="hover:text-[#F5C45E] transition-colors">
                  Inspection Payouts & Rates
                </Link>
              </li>
              <li>
                <Link href="/how-it-works#inspection-protocol" className="hover:text-[#F5C45E] transition-colors">
                  Inspection Protocols & Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Coverage cities */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-widest mb-4 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#F5C45E]" />
              Active Coverage
            </h4>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Bengaluru',
                'Mumbai',
                'Delhi NCR',
                'Hyderabad',
                'Pune',
                'Chennai',
                'Kolkata',
                'Ahmedabad',
              ].map((city) => (
                <span
                  key={city}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#141311] border border-[#23211D] text-[#8E8B85] hover:border-[#F5C45E]/40 hover:text-white transition-all text-xs"
                >
                  <MapPin className="w-3 h-3 text-[#F5C45E]" />
                  {city}
                </span>
              ))}
            </div>
            <p className="text-xs text-[#706E68] mt-3">
              Expanding across Tier-1 and Tier-2 Indian hubs every month.
            </p>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="border-t border-[#1C1A17] pt-7 text-xs text-[#706E68] leading-relaxed">
          <p className="mb-2">
            <strong className="text-neutral-400">Disclaimer:</strong> Ezer is an independent third-party physical inspection and product verification service. Ezer is not affiliated with, endorsed by, operated by, or sponsored by OLX Global B.V., Meta Platforms, Inc. (Facebook Marketplace), Quikr India Pvt. Ltd., Truecaller, or any external classifieds platform. Brand names, logos, and trademarks shown remain the property of their respective owners and are referenced solely for identification of external listing URLs.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-5 border-t border-[#141311]">
            <p>© {new Date().getFullYear()} Ezer Technologies Pvt. Ltd. All rights reserved.</p>
            <p className="flex items-center gap-1.5 text-xs text-[#8E8B85]">
              Engineered with <Heart className="w-3.5 h-3.5 text-[#F5C45E] fill-[#F5C45E]" /> for Indian second-hand buyers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
