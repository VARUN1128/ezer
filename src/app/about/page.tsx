'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Target,
  Sparkles,
  Users,
  CheckCircle2,
  Heart,
  ArrowRight,
} from 'lucide-react';
import { EzerLogo } from '@/components/EzerLogo';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#0B0A09] text-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-16">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181613] border border-[#F5C45E]/30 text-[#F5C45E] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
            Our Mission & Story
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Building India’s Second-Hand Trust Infrastructure
          </h1>
          <p className="text-sm sm:text-base text-[#9E9B95] leading-relaxed">
            The Indian pre-owned market is booming, but buyers still face information asymmetry, fake bills, hidden repairs, and travel hassles. Ezer changes that.
          </p>
        </div>

        {/* Why Ezer section */}
        <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-8 sm:p-12 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
          <h2 className="text-2xl font-bold text-white tracking-tight">Why Ezer Exists</h2>
          <div className="space-y-4 text-sm text-[#9E9B95] leading-relaxed">
            <p>
              Every day, thousands of Indians find great deals on OLX, Facebook Marketplace, and Quikr. But closing the deal requires traveling 25 km across traffic, meeting strangers in unfamiliar locations, and trying to assess complex electronics or vehicles in 5 minutes with zero diagnostic tools.
            </p>
            <p>
              Scammers exploit this: swapped OEM displays, glued motherboard chips, cleared check-engine lights, and manipulated battery cycles.
            </p>
            <p>
              <strong className="text-white">Ezer exists to eliminate this anxiety.</strong> We are not another marketplace trying to sell you items. We are an independent, customer-aligned physical verification protocol. We deploy trained, verified technicians who inspect the item on-site, test hardware rigorously, and deliver an impartial report.
            </p>
          </div>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-7 space-y-3 shadow-md">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1A16] border border-[#F5C45E]/30 text-[#F5C45E] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">100% Unbiased</h4>
            <p className="text-xs text-[#8E8B85] leading-relaxed">
              We take zero commission on product sales. Our only loyalty is delivering the truth to the buyer.
            </p>
          </div>

          <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-7 space-y-3 shadow-md">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1A16] border border-[#F5C45E]/30 text-[#F5C45E] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              <Users className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Empowering Experts</h4>
            <p className="text-xs text-[#8E8B85] leading-relaxed">
              Independent repair technicians and mechanics earn dignified, flexible income through their specialized skills.
            </p>
          </div>

          <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-7 space-y-3 shadow-md">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1A16] border border-[#F5C45E]/30 text-[#F5C45E] flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              <Target className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Standardized Rigor</h4>
            <p className="text-xs text-[#8E8B85] leading-relaxed">
              Every inspection follows strict category benchmarks: OEM serial checks, battery diagnostics, and component testing.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-[#201D16] to-[#161513] border border-[#F5C45E]/30 rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Know Before You Buy.</h3>
          <p className="text-xs text-[#B8B5B0] max-w-md mx-auto">
            Experience risk-free second-hand buying. Submit your first listing link today.
          </p>
          <div className="pt-2">
            <Link
              href="/#verify-form"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#F5C45E] text-[#101010] font-bold text-xs hover:bg-[#D99C32] transition-colors"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
