'use client';

import React from 'react';
import Image from 'next/image';
import { EzerTrustReportCard } from './EzerTrustReportCard';
import { ShieldCheck, Award, Zap } from 'lucide-react';

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[580px] lg:max-w-none flex items-center justify-center select-none">
      {/* Background Golden Waves / Ribbons */}
      <div className="absolute -top-12 -right-10 w-[550px] h-[450px] pointer-events-none opacity-80 overflow-hidden">
        <svg
          viewBox="0 0 500 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Wave 1 */}
          <path
            d="M50 400C180 320 280 200 450 100C490 75 520 40 550 0"
            stroke="url(#goldWave1)"
            strokeWidth="38"
            strokeLinecap="round"
            className="opacity-70 blur-[1px]"
          />
          {/* Wave 2 thin neon accent */}
          <path
            d="M80 400C220 310 320 180 500 50"
            stroke="url(#goldWave2)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="opacity-90"
          />
          {/* Wave 3 wide luminous backdrop */}
          <path
            d="M200 400C300 280 400 150 520 20"
            stroke="url(#goldWave3)"
            strokeWidth="70"
            className="opacity-25 blur-[12px]"
          />
          <defs>
            <linearGradient id="goldWave1" x1="50" y1="400" x2="520" y2="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#101010" stopOpacity="0" />
              <stop offset="40%" stopColor="#D99C32" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#F5C45E" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#FFE4A0" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="goldWave2" x1="80" y1="400" x2="500" y2="50" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D99C32" stopOpacity="0.2" />
              <stop offset="60%" stopColor="#F5C45E" />
              <stop offset="100%" stopColor="#FFF2D1" />
            </linearGradient>
            <linearGradient id="goldWave3" x1="200" y1="400" x2="520" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#101010" />
              <stop offset="50%" stopColor="#F5C45E" />
              <stop offset="100%" stopColor="#D99C32" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Main Real Photo Showcase Stage */}
      <div className="relative w-full max-w-[540px]">
        {/* Ambient Glow behind image frame */}
        <div className="absolute -inset-1.5 bg-gradient-to-tr from-[#F5C45E]/30 via-transparent to-[#3B82F6]/25 rounded-[32px] blur-xl opacity-75 pointer-events-none" />

        {/* Real Product Picture Showcase Card */}
        <div className="relative rounded-[28px] overflow-hidden border border-[#F5C45E]/30 bg-[#141311] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(245,196,94,0.18)] group transition-all duration-500 hover:border-[#F5C45E]/60">
          {/* Main Real Picture */}
          <div className="relative w-full aspect-[16/11] overflow-hidden bg-[#0A0A09]">
            <Image
              src="/hero-real-gadgets.jpg"
              alt="Real inspection verified pre-owned laptop and smartphone"
              fill
              priority
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700 brightness-[0.95] contrast-[1.05]"
            />

            {/* Subtle luxury vignette & gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A09] via-transparent to-black/30 pointer-events-none" />

            {/* Top Badges overlay on picture */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#F5C45E]/40 text-[#F5C45E] text-[11px] font-bold shadow-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-[#F5C45E]" />
                <span>35-Point Hardware Verified</span>
              </div>

              <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#35A66A]/25 backdrop-blur-md border border-[#35A66A]/50 text-[#4ADE80] text-[10px] font-bold shadow-md">
                <Zap className="w-3 h-3 text-[#4ADE80]" />
                <span>OEM Certified</span>
              </div>
            </div>

            {/* Bottom In-Image Info Strip */}
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-[#E5E2DC] pointer-events-none">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-ping" />
                <span className="font-semibold text-white drop-shadow-sm">Physical Inspection Live</span>
              </div>
              <span className="text-[10px] text-[#B8B5B0] bg-black/50 px-2 py-0.5 rounded-md backdrop-blur-sm">
                Authentic Pre-Owned
              </span>
            </div>
          </div>
        </div>

        {/* Floating Glowing Ezer Trust Report Card overlapping bottom */}
        <div className="relative -mt-10 sm:-mt-12 ml-auto z-30 w-[92%] sm:w-[82%] shadow-[0_20px_50px_rgba(0,0,0,0.95)]">
          <EzerTrustReportCard />
        </div>
      </div>
    </div>
  );
};
