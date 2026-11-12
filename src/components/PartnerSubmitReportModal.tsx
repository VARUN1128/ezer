'use client';

import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Sparkles,
} from 'lucide-react';
import {
  InspectionRequest,
  AuthenticityStatus,
  Recommendation,
  IssueItem,
} from '@/lib/types';
import { completeInspectionAndSubmitReport } from '@/lib/store';
import confetti from 'canvas-confetti';

interface PartnerSubmitReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: InspectionRequest;
  partnerId: string;
  partnerName: string;
  onSuccess: () => void;
}

export const PartnerSubmitReportModal: React.FC<PartnerSubmitReportModalProps> = ({
  isOpen,
  onClose,
  request,
  partnerId,
  partnerName,
  onSuccess,
}) => {
  const [conditionRating, setConditionRating] = useState<number>(8);
  const [authenticityStatus, setAuthenticityStatus] = useState<AuthenticityStatus>('genuine');
  const [estimatedPrice, setEstimatedPrice] = useState<string>(
    request.product_price ? String(Math.round(request.product_price * 0.95)) : '22000'
  );
  const [recommendation, setRecommendation] = useState<Recommendation>('recommend_buy');
  const [inspectionNotes, setInspectionNotes] = useState<string>(
    'Conducted full on-site physical inspection. Exterior body shows light cosmetic wear consistent with stated age. Internal diagnostic logs show no thermal throttling or aftermarket part replacement.'
  );

  const [issues, setIssues] = useState<IssueItem[]>([
    {
      component: 'Core Functional Hardware',
      severity: 'passed',
      detail: 'Fully operational, benchmark passed with OEM power draw.',
    },
    {
      component: 'Cosmetic & Exterior Housing',
      severity: 'minor',
      detail: 'Micro-scratches on bezel edge, zero denting.',
    },
  ]);

  const [newComponent, setNewComponent] = useState('');
  const [newSeverity, setNewSeverity] = useState<IssueItem['severity']>('passed');
  const [newDetail, setNewDetail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleAddIssue = () => {
    if (!newComponent.trim() || !newDetail.trim()) return;
    setIssues([
      ...issues,
      {
        component: newComponent.trim(),
        severity: newSeverity,
        detail: newDetail.trim(),
      },
    ]);
    setNewComponent('');
    setNewDetail('');
  };

  const handleRemoveIssue = (index: number) => {
    setIssues(issues.filter((_, idx) => idx !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await completeInspectionAndSubmitReport(request.id, {
        partner_id: partnerId,
        partner_name: partnerName,
        condition_rating: Number(conditionRating),
        authenticity_status: authenticityStatus,
        estimated_market_price: Number(estimatedPrice) || 20000,
        issues_found: issues,
        inspection_notes: inspectionNotes,
        photos: [
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
        ],
        recommendation,
      });

      if (res.success) {
        try {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#35A66A', '#F5C45E', '#FFFFFF'],
          });
        } catch {
          // ignore
        }
        onSuccess();
        onClose();
      } else {
        setErrorMessage(res.message);
      }
    } catch {
      setErrorMessage('Failed to submit report. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#181715] border border-[#2E2B26] rounded-2xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl relative text-white p-6 sm:p-7">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg bg-[#23211D] text-[#8E8B85] hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#F5C45E] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
            Inspector Filing Portal
          </span>
          <h3 className="text-xl font-bold text-white">
            Submit Physical Inspection Report
          </h3>
          <p className="text-xs text-[#8E8B85] mt-1">
            For: <strong className="text-white">{request.product_title}</strong>
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/30 border border-red-800 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Condition Rating & Authenticity */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1">
                Overall Condition Rating (1 to 10):{' '}
                <span className="text-[#F5C45E] font-bold text-sm">
                  {conditionRating}/10
                </span>
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={conditionRating}
                onChange={(e) => setConditionRating(Number(e.target.value))}
                className="w-full accent-[#F5C45E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8E8B85] mt-1">
                <span>1 (Damaged/Faulty)</span>
                <span>10 (Like New Pristine)</span>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1">
                Authenticity Verdict
              </label>
              <select
                value={authenticityStatus}
                onChange={(e) => setAuthenticityStatus(e.target.value as AuthenticityStatus)}
                className="w-full bg-[#121110] border border-[#2E2B26] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#F5C45E]"
              >
                <option value="genuine" className="bg-[#181715]">100% Genuine OEM</option>
                <option value="refurbished" className="bg-[#181715]">Refurbished with Grade-A parts</option>
                <option value="tampered" className="bg-[#181715]">Tampered / Third-Party Repaired</option>
                <option value="counterfeit" className="bg-[#181715]">Counterfeit / Clone</option>
              </select>
            </div>
          </div>

          {/* Fair Market Value & Recommendation */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1">
                Fair Market Valuation (₹ INR)
              </label>
              <input
                type="number"
                value={estimatedPrice}
                onChange={(e) => setEstimatedPrice(e.target.value)}
                className="w-full bg-[#121110] border border-[#2E2B26] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#F5C45E]"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1">
                Final Buyer Recommendation
              </label>
              <select
                value={recommendation}
                onChange={(e) => setRecommendation(e.target.value as Recommendation)}
                className="w-full bg-[#121110] border border-[#2E2B26] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#F5C45E]"
              >
                <option value="recommend_buy" className="bg-[#181715]">Recommend: Safe to Buy</option>
                <option value="negotiate_price" className="bg-[#181715]">Negotiate Lower Price</option>
                <option value="do_not_buy" className="bg-[#181715]">Do Not Buy: High Risk</option>
              </select>
            </div>
          </div>

          {/* Checklist of tested components */}
          <div>
            <label className="block font-semibold text-[#B8B5B0] mb-1.5">
              Inspected Components Checklist ({issues.length} items)
            </label>
            <div className="space-y-2 mb-3">
              {issues.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-[#121110] border border-[#24221E] text-xs"
                >
                  <div>
                    <span className="font-semibold text-white">{item.component}</span>
                    <span className="text-[#8E8B85] ml-2 text-[11px]">- {item.detail}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#24221F] text-[#F5C45E]">
                      {item.severity}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveIssue(idx)}
                      className="text-[#8E8B85] hover:text-red-400 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add component form */}
            <div className="p-3 rounded-xl bg-[#121110] border border-[#24221E] space-y-2">
              <span className="text-[11px] font-semibold text-[#B8B5B0] block">
                Add Component Verification
              </span>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Component (e.g. Battery Health)"
                  value={newComponent}
                  onChange={(e) => setNewComponent(e.target.value)}
                  className="col-span-2 bg-[#181715] border border-[#2E2B26] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                />
                <select
                  value={newSeverity}
                  onChange={(e) => setNewSeverity(e.target.value as any)}
                  className="bg-[#181715] border border-[#2E2B26] rounded-lg px-2 py-1.5 text-xs text-white outline-none"
                >
                  <option value="passed">Passed</option>
                  <option value="minor">Minor</option>
                  <option value="info">Info</option>
                  <option value="major">Defect</option>
                </select>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Detail (e.g. 89% capacity, 320 cycles)"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  className="flex-1 bg-[#181715] border border-[#2E2B26] rounded-lg px-2.5 py-1.5 text-xs text-white outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddIssue}
                  className="px-3 py-1.5 rounded-lg bg-[#24221F] hover:bg-[#2C2925] border border-[#2E2B26] text-xs font-semibold text-[#F5C45E] flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block font-semibold text-[#B8B5B0] mb-1">
              Detailed Inspector Written Findings & Notes
            </label>
            <textarea
              rows={3}
              value={inspectionNotes}
              onChange={(e) => setInspectionNotes(e.target.value)}
              className="w-full bg-[#121110] border border-[#2E2B26] rounded-xl px-3.5 py-2.5 text-white outline-none focus:border-[#F5C45E] resize-none"
              required
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#F5C45E] text-[#101010] hover:bg-[#D99C32] transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#101010] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Publish & Complete Inspection</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
