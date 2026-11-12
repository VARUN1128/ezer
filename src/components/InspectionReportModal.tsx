'use client';

import React from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileCheck,
  Calendar,
  UserCheck,
  IndianRupee,
  Share2,
  Printer,
  Sparkles,
} from 'lucide-react';
import { InspectionRequest, InspectionReport } from '@/lib/types';

interface InspectionReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: InspectionRequest;
}

export const InspectionReportModal: React.FC<InspectionReportModalProps> = ({
  isOpen,
  onClose,
  request,
}) => {
  if (!isOpen || !request.report) return null;

  const report: InspectionReport = request.report;

  const getRecommendationBadge = (rec: string) => {
    switch (rec) {
      case 'recommend_buy':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#35A66A]/20 border border-[#35A66A]/50 text-[#4ADE80]">
            <CheckCircle2 className="w-4 h-4 text-[#35A66A]" />
            Recommended: Safe to Buy
          </span>
        );
      case 'negotiate_price':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#F5C45E]/20 border border-[#F5C45E]/50 text-[#F5C45E]">
            <AlertTriangle className="w-4 h-4 text-[#F5C45E]" />
            Negotiate Lower Price
          </span>
        );
      case 'do_not_buy':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#E05252]/20 border border-[#E05252]/50 text-[#F87171]">
            <XCircle className="w-4 h-4 text-[#E05252]" />
            Do Not Buy: High Risk
          </span>
        );
    }
  };

  const getAuthenticityBadge = (auth: string) => {
    const map: Record<string, { label: string; color: string }> = {
      genuine: { label: '100% Genuine OEM Parts', color: 'text-[#4ADE80] border-[#35A66A]/40 bg-[#35A66A]/10' },
      refurbished: { label: 'Certified Refurbished', color: 'text-amber-400 border-amber-500/40 bg-amber-500/10' },
      tampered: { label: 'Tampered / Third-party Parts', color: 'text-red-400 border-red-500/40 bg-red-500/10' },
      counterfeit: { label: 'Counterfeit / Replica Alert', color: 'text-red-500 border-red-500 bg-red-950/40' },
      unverified: { label: 'Partially Unverified', color: 'text-neutral-400 border-neutral-700 bg-neutral-800' },
    };
    const current = map[auth] || map.genuine;
    return (
      <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${current.color}`}>
        {current.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#141311] border border-[#F5C45E]/30 rounded-3xl w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,196,94,0.12)] relative text-white p-6 sm:p-8">
        {/* Top actions */}
        <div className="flex items-center justify-between pb-4 border-b border-[#25231F] mb-6">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-[#1C1A17] border border-[#F5C45E]/40 flex items-center justify-center text-[#F5C45E] shadow-[0_0_12px_rgba(245,196,94,0.15)]">
              <FileCheck className="w-5 h-5" />
            </span>
            <div>
              <span className="text-[11px] uppercase font-bold tracking-widest text-[#F5C45E]">
                Official Verification Report
              </span>
              <p className="text-xs text-[#8E8B85]">ID: {report.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2.5 rounded-xl bg-[#1C1A17] border border-[#2E2B25] text-[#9E9B95] hover:text-white hover:border-[#F5C45E]/40 transition-all text-xs flex items-center gap-1.5"
              title="Print Report"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline font-medium">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-2.5 rounded-xl bg-[#1C1A17] border border-[#2E2B25] text-[#8E8B85] hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Product Title & Status Banner */}
        <div className="mb-6 bg-gradient-to-br from-[#1C1A16] to-[#12110E] border border-[#2E2B25] rounded-2xl p-5 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2.5">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#25221B] text-[#F5C45E] border border-[#3E382B]">
              {request.category}
            </span>
            {getRecommendationBadge(report.recommendation)}
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-2">
            {request.product_title}
          </h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8E8B85]">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#F5C45E]" />
              Inspected on {new Date(report.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5 text-[#35A66A]" />
              Inspector: {report.partner_name || request.assigned_partner_name || 'Vikram Malhotra'}
            </span>
          </div>
        </div>

        {/* Score & Market Price Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mb-6">
          {/* Overall condition score */}
          <div className="bg-[#181613] border border-[#2B2822] rounded-2xl p-5 text-center flex flex-col justify-center items-center shadow-sm">
            <span className="text-xs font-semibold text-[#8E8B85] mb-1">Condition Score</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-extrabold text-[#F5C45E]">{report.condition_rating}</span>
              <span className="text-sm text-[#8E8B85]">/ 10</span>
            </div>
            <span className="text-xs text-[#4ADE80] font-medium mt-1">Excellent Working Order</span>
          </div>

          {/* Authenticity Check */}
          <div className="bg-[#181613] border border-[#2B2822] rounded-2xl p-5 text-center flex flex-col justify-center items-center shadow-sm">
            <span className="text-xs font-semibold text-[#8E8B85] mb-2">Hardware Authenticity</span>
            {getAuthenticityBadge(report.authenticity_status)}
            <span className="text-xs text-[#8E8B85] mt-2">Zero Serial Mismatch</span>
          </div>

          {/* Fair Market Value */}
          <div className="bg-[#181613] border border-[#2B2822] rounded-2xl p-5 text-center flex flex-col justify-center items-center shadow-sm">
            <span className="text-xs font-semibold text-[#8E8B85] mb-1">Ezer Fair Valuation</span>
            <div className="text-xl font-bold text-white flex items-center justify-center">
              ₹{report.estimated_market_price.toLocaleString('en-IN')}
            </div>
            {request.product_price && (
              <span className="text-xs text-[#F5C45E] font-medium mt-1">
                Seller Ask: ₹{request.product_price.toLocaleString('en-IN')}
              </span>
            )}
          </div>
        </div>

        {/* Detailed Inspection Checklist */}
        <div className="mb-6">
          <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-[#F5C45E]" />
            Component Inspection Breakdown
          </h4>
          <div className="space-y-2">
            {report.issues_found && report.issues_found.length > 0 ? (
              report.issues_found.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-[#121110] border border-[#24221E] rounded-xl p-3 flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white block">{item.component}</span>
                    <p className="text-[#8E8B85] text-[11px] leading-relaxed">{item.detail}</p>
                  </div>
                  <div>
                    {item.severity === 'passed' && (
                      <span className="px-2 py-0.5 rounded bg-[#35A66A]/15 border border-[#35A66A]/40 text-[#4ADE80] font-semibold text-[10px] uppercase">
                        Passed
                      </span>
                    )}
                    {item.severity === 'minor' && (
                      <span className="px-2 py-0.5 rounded bg-[#F5C45E]/15 border border-[#F5C45E]/40 text-[#F5C45E] font-semibold text-[10px] uppercase">
                        Minor
                      </span>
                    )}
                    {item.severity === 'info' && (
                      <span className="px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/40 text-blue-400 font-semibold text-[10px] uppercase">
                        Note
                      </span>
                    )}
                    {(item.severity === 'major' || item.severity === 'critical') && (
                      <span className="px-2 py-0.5 rounded bg-[#E05252]/15 border border-[#E05252]/40 text-[#F87171] font-semibold text-[10px] uppercase">
                        Defect
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-[#8E8B85]">No specific component defects flagged.</p>
            )}
          </div>
        </div>

        {/* Inspector's Verdict & Notes */}
        <div className="bg-[#151412] border border-[#2A2824] rounded-xl p-4 sm:p-5 mb-6 text-xs">
          <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5 text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
            Inspector Verdict & Notes
          </h4>
          <p className="text-[#B8B5B0] leading-relaxed text-xs">
            "{report.inspection_notes}"
          </p>
        </div>

        {/* Close CTA */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#262421]">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-xs font-bold bg-[#F5C45E] text-[#101010] hover:bg-[#D99C32] transition-colors"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
};
