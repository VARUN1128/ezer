'use client';

import React from 'react';
import { EzerTrustReportCard } from './EzerTrustReportCard';

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

      {/* Main Hardware Display Stage (Pedestal + Laptop + iPhone) */}
      <div className="relative w-full aspect-[16/11] max-w-[540px]">
        {/* Dark stage pedestal shadow */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-10 bg-black/90 blur-xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-3/4 h-6 bg-[#161513] rounded-t-lg border-t border-[#2A2824] shadow-2xl" />

        {/* Laptop Mockup (Open MacBook displaying gold abstract wallpaper) */}
        <div className="absolute bottom-4 left-6 sm:left-10 w-[72%] sm:w-[70%] aspect-[16/10] z-10 transition-transform duration-500 hover:scale-[1.01]">
          {/* Laptop Screen Body */}
          <div className="w-full h-full bg-[#181818] rounded-t-xl sm:rounded-t-2xl p-[5px] sm:p-[7px] border border-[#3E3C38] shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col">
            {/* Screen Inner */}
            <div className="relative w-full flex-1 rounded-t-lg sm:rounded-t-xl overflow-hidden bg-gradient-to-br from-[#0C0C0B] via-[#1A1814] to-[#0A0A09]">
              {/* Webcam notch / dot */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-black/80 flex items-center justify-center z-20">
                <div className="w-0.5 h-0.5 rounded-full bg-blue-500/60" />
              </div>

              {/* Golden Wave Wallpaper on Screen */}
              <div className="w-full h-full relative overflow-hidden">
                <svg viewBox="0 0 320 200" fill="none" className="w-full h-full object-cover">
                  <rect width="320" height="200" fill="#0E0D0B" />
                  <path
                    d="M-20 200C60 140 120 70 240 40C290 27 310 10 340 -10"
                    stroke="url(#screenGold)"
                    strokeWidth="32"
                    strokeLinecap="round"
                    className="opacity-90"
                  />
                  <path
                    d="M10 200C90 150 160 90 280 50"
                    stroke="#F5C45E"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="opacity-80"
                  />
                  <defs>
                    <linearGradient id="screenGold" x1="0" y1="200" x2="300" y2="30" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#1A1814" />
                      <stop offset="50%" stopColor="#F5C45E" />
                      <stop offset="100%" stopColor="#D99C32" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Subtle screen reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Laptop Base / Keyboard Hinge */}
            <div className="h-2 sm:h-3 w-full bg-gradient-to-b from-[#2E2C29] to-[#1C1B19] rounded-b-md border-t border-[#3D3A34] relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-1 bg-[#141311] rounded-b-sm" />
            </div>
          </div>
        </div>

        {/* iPhone Pro Mockup (Natural Titanium back showing Triple Camera array) */}
        <div className="absolute bottom-6 right-8 sm:right-12 w-[22%] sm:w-[24%] aspect-[9/18] z-20 transition-transform duration-500 hover:scale-[1.02]">
          <div className="w-full h-full bg-gradient-to-b from-[#383632] via-[#2A2926] to-[#1E1D1B] rounded-[22px] sm:rounded-[28px] p-[2.5px] border border-[#524E48] shadow-[0_25px_50px_rgba(0,0,0,0.9),0_0_20px_rgba(0,0,0,0.6)] relative overflow-hidden flex flex-col justify-between">
            {/* Camera bump square */}
            <div className="m-2 sm:m-2.5 p-1.5 sm:p-2 rounded-xl sm:rounded-2xl bg-[#2C2A26] border border-[#44413C] shadow-inner grid grid-cols-2 gap-1 sm:gap-1.5 w-14 sm:w-16 h-14 sm:h-16">
              {/* Lens 1 */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#121110] border border-[#5A564F] flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#080808] border border-blue-900/50" />
              </div>
              {/* Lens 2 */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#121110] border border-[#5A564F] flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#080808] border border-blue-900/50" />
              </div>
              {/* Lens 3 */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#121110] border border-[#5A564F] flex items-center justify-center shadow-md col-span-2 mx-auto -mt-1 sm:-mt-1.5">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-[#080808] border border-blue-900/50" />
              </div>
            </div>

            {/* Apple / Ezer Brand Center Mark */}
            <div className="mx-auto mb-10 w-3 h-3 rounded-full bg-white/10" />
          </div>
        </div>

        {/* Floating Glowing "Ezer Trust Report" holographic badge */}
        <div className="absolute -bottom-4 right-0 sm:-right-4 z-30 w-[88%] sm:w-[78%]">
          <EzerTrustReportCard />
        </div>
      </div>
    </div>
  );
};
