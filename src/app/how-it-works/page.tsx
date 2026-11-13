'use client';

import React from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  FileCheck,
  Smartphone,
  Bike,
  Car,
  Laptop,
  ArrowRight,
  Sparkles,
  MapPin,
  AlertTriangle,
  Scale,
  Award,
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#0B0A09] text-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181613] border border-[#F5C45E]/30 text-[#F5C45E] text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
            Inspection Protocol
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How Ezer Verification Works
          </h1>
          <p className="text-sm sm:text-base text-[#9E9B95] leading-relaxed">
            Eliminating travel, scams, and regret from Indian second-hand marketplaces.
          </p>
        </div>

        {/* 3 Step Deep Dive (Horizontal scroll on mobile) */}
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="shrink-0 w-[280px] md:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-7 sm:p-8 space-y-4 relative shadow-[0_20px_45px_rgba(0,0,0,0.85)]">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1A16] text-[#F5C45E] font-mono font-bold text-lg flex items-center justify-center border border-[#F5C45E]/30 shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              01
            </div>
            <h3 className="text-xl font-bold text-white">Paste Listing Link</h3>
            <p className="text-xs sm:text-sm text-[#9E9B95] leading-relaxed">
              Found a gadget, bike, or appliance on OLX, Quikr, or Facebook? Paste the URL into Ezer. We extract the seller location and assign our top local inspector.
            </p>
          </div>

          <div className="shrink-0 w-[280px] md:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-7 sm:p-8 space-y-4 relative shadow-[0_20px_45px_rgba(0,0,0,0.85)]">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1A16] text-[#F5C45E] font-mono font-bold text-lg flex items-center justify-center border border-[#F5C45E]/30 shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              02
            </div>
            <h3 className="text-xl font-bold text-white">Physical On-Site Check</h3>
            <p className="text-xs sm:text-sm text-[#9E9B95] leading-relaxed">
              Our verified partner travels to the seller. They carry diagnostic tools, run benchmark stress tests, check serial authenticity, and inspect for hidden water or chassis damage.
            </p>
          </div>

          <div className="shrink-0 w-[280px] md:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-7 sm:p-8 space-y-4 relative shadow-[0_20px_45px_rgba(0,0,0,0.85)]">
            <div className="w-11 h-11 rounded-2xl bg-[#1C1A16] text-[#F5C45E] font-mono font-bold text-lg flex items-center justify-center border border-[#F5C45E]/30 shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              03
            </div>
            <h3 className="text-xl font-bold text-white">Get Decision Report</h3>
            <p className="text-xs sm:text-sm text-[#9E9B95] leading-relaxed">
              Receive a comprehensive digital report before making payment. View exact condition rating, component checklist, high-res photos, and clear Buy / Negotiate recommendation.
            </p>
          </div>
        </div>

        {/* Detailed Inspection Checklist by Category (Horizontal scroll on mobile) */}
        <div id="inspection-protocol" className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Category Inspection Protocols</h2>
            <p className="text-xs text-[#8E8B85] mt-1">What our inspectors check during every visit</p>
          </div>

          <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-none md:grid md:grid-cols-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="shrink-0 w-[300px] md:w-auto snap-center bg-[#181715] border border-[#2A2824] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Smartphone className="w-5 h-5 text-[#F5C45E]" />
                <span>Mobiles & Tablets Checklist</span>
              </div>
              <ul className="space-y-2 text-xs text-[#B8B5B0]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Display OEM verification & True Tone / ambient sensor checks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>3uTools diagnostic log for battery health and replaced parts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>IMEI blacklisting & CEIR Indian stolen database match</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Microphone, FaceID / Fingerprint, and charging port impedance</span>
                </li>
              </ul>
            </div>

            <div className="shrink-0 w-[300px] md:w-auto snap-center bg-[#181715] border border-[#2A2824] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Laptop className="w-5 h-5 text-[#F5C45E]" />
                <span>Laptops & MacBooks Checklist</span>
              </div>
              <ul className="space-y-2 text-xs text-[#B8B5B0]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Battery cycle count, thermal throttling, and fan noise analysis</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Display anti-reflective coating delamination (Staingate check)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>All keyboard keys, trackpad haptic motor, and speaker balance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>MDM lock, iCloud / BIOS lock status verification</span>
                </li>
              </ul>
            </div>

            <div className="shrink-0 w-[300px] md:w-auto snap-center bg-[#181715] border border-[#2A2824] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Bike className="w-5 h-5 text-[#F5C45E]" />
                <span>Bikes & Two-Wheelers Checklist</span>
              </div>
              <ul className="space-y-2 text-xs text-[#B8B5B0]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Engine cold start sound, tappet noise, and exhaust smoke check</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Front fork oil seals, rear shockers, and frame bend inspection</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Brake discs, tire manufacturing date (DOT), and chain sprocket wear</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Parivahan RC chassis number match and active traffic challan check</span>
                </li>
              </ul>
            </div>

            <div className="shrink-0 w-[300px] md:w-auto snap-center bg-[#181715] border border-[#2A2824] rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-white font-bold text-sm">
                <Car className="w-5 h-5 text-[#F5C45E]" />
                <span>Cars Checklist</span>
              </div>
              <ul className="space-y-2 text-xs text-[#B8B5B0]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>OBD-II computer diagnostics for cleared engine trouble codes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Paint thickness meter (micrometer) test for accidental repaints</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Apron rust, pillar sealant inspection, and flood water damage markers</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0 mt-0.5" />
                  <span>Odometer rollback detection via authorized service history audit</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#181715] border border-[#2A2824] rounded-2xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Ready to inspect your next purchase?</h3>
          <p className="text-xs text-[#8E8B85] max-w-md mx-auto">
            Standard physical checks start at just ₹499. Save yourself from costly repairs.
          </p>
          <Link
            href="/#verify-form"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#101010] font-bold text-xs"
          >
            <span>Analyze a Listing Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
