'use client';

import React from 'react';
import { Check, AlertTriangle, Sparkles } from 'lucide-react';

export const EzerTrustReportCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div
      className={`relative rounded-3xl bg-[#141311]/95 border border-[#F5C45E]/60 p-5 sm:p-6 shadow-[0_0_40px_rgba(245,196,94,0.3),0_25px_60px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-white select-none transition-all duration-300 hover:border-[#F5C45E] hover:shadow-[0_0_55px_rgba(245,196,94,0.5)] ${className}`}
    >
      {/* Top Header: Logo + Title */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#25231F]">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 relative flex items-center justify-center">
            <svg viewBox="0 0 36 36" fill="none" className="w-full h-full">
              <path
                d="M12 9.5L26 9.5C27.5 9.5 28.5 11 27.8 12.3L24 19C23.5 19.8 22.6 20.3 21.6 20.3L14 20.3"
                stroke="#F5C45E"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M24 26.5L10 26.5C8.5 26.5 7.5 25 8.2 23.7L12 17C12.5 16.2 13.4 15.7 14.4 15.7L22 15.7"
                stroke="#F5C45E"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <span className="font-bold text-sm tracking-tight text-white font-sans">
            Ezer Trust Report
          </span>
        </div>
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#F5C45E]/15 border border-[#F5C45E]/30 text-[10px] font-semibold text-[#F5C45E] uppercase tracking-wider">
          <Sparkles className="w-2.5 h-2.5" />
          Verified
        </span>
      </div>

      {/* Card Body: Donut Gauge + Checklist */}
      <div className="flex items-center gap-5 sm:gap-7">
        {/* Left: Donut Score Gauge */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background track circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              className="text-[#25231F]"
              strokeWidth="7"
              stroke="currentColor"
              fill="transparent"
            />
            {/* Highlighted progress arc: 86% */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="url(#trustGradient)"
              strokeWidth="7"
              strokeDasharray={251.3}
              strokeDashoffset={251.3 * (1 - 0.86)}
              strokeLinecap="round"
              fill="transparent"
            />
            <defs>
              <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#35A66A" />
                <stop offset="60%" stopColor="#4ADE80" />
                <stop offset="100%" stopColor="#F5C45E" />
              </linearGradient>
            </defs>
          </svg>

          {/* Number & label inside circle */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <div className="flex items-baseline">
              <span className="text-2xl sm:text-3xl font-extrabold text-white leading-none">
                8.6
              </span>
              <span className="text-xs text-neutral-400 font-semibold ml-0.5">/10</span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#F5C45E] font-medium tracking-wide mt-1">
              Trust Score
            </span>
          </div>
        </div>

        {/* Right: Checklist Items */}
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-[#35A66A]/20 border border-[#35A66A]/40 flex items-center justify-center text-[#4ADE80] shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="text-[#E5E2DC] font-medium text-xs">Price Check</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-[#35A66A]/20 border border-[#35A66A]/40 flex items-center justify-center text-[#4ADE80] shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="text-[#E5E2DC] font-medium text-xs">Condition: Good</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 shrink-0">
              <AlertTriangle className="w-2.5 h-2.5 stroke-[2.5]" />
            </span>
            <span className="text-[#E5E2DC] font-medium text-xs">1 Risk Signal</span>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="w-4 h-4 rounded-full bg-[#35A66A]/20 border border-[#35A66A]/40 flex items-center justify-center text-[#4ADE80] shrink-0">
              <Check className="w-2.5 h-2.5 stroke-[3]" />
            </span>
            <span className="text-[#E5E2DC] font-medium text-xs">Inspection Available</span>
          </div>
        </div>
      </div>
    </div>
  );
};
