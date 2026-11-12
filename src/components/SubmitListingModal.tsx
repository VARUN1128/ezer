'use client';

import React, { useState } from 'react';
import {
  X,
  Link as LinkIcon,
  Upload,
  CheckCircle2,
  FileText,
  AlertCircle,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES, INDIAN_DISTRICTS, SUPPORTED_PLATFORMS } from '@/lib/constants';
import { createInspectionRequest } from '@/lib/store';
import confetti from 'canvas-confetti';

interface SubmitListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'url' | 'manual' | 'photo';
  initialData?: {
    title?: string;
    category?: string;
    url?: string;
    price?: number;
    location?: string;
    district?: string;
  };
  onSuccess?: () => void;
}

export const SubmitListingModal: React.FC<SubmitListingModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'url',
  initialData,
  onSuccess,
}) => {
  const [mode, setMode] = useState<'url' | 'manual' | 'photo'>(initialMode);
  const [url, setUrl] = useState(initialData?.url || '');
  const [title, setTitle] = useState(initialData?.title || '');
  const [category, setCategory] = useState(initialData?.category || 'Mobiles');
  const [location, setLocation] = useState(initialData?.location || 'Indiranagar, Bengaluru');
  const [district, setDistrict] = useState(initialData?.district || 'Bengaluru Urban');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : '');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    // Normalize URL if in manual/photo mode and empty
    let finalUrl = url.trim();
    if (!finalUrl) {
      if (mode === 'manual' || mode === 'photo') {
        finalUrl = `https://manual-submission.ezer.in/item/${Date.now()}`;
      } else {
        setStatusMessage({ type: 'error', text: 'Please enter a valid listing URL.' });
        return;
      }
    }

    setLoading(true);

    try {
      const res = await createInspectionRequest({
        listing_url: finalUrl,
        product_title: title || undefined,
        category,
        location,
        district,
        description,
        product_price: price ? Number(price) : undefined,
      });

      if (res.success) {
        // Fire celebration confetti
        try {
          confetti({
            particleCount: 60,
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#F5C45E', '#D99C32', '#FFFFFF'],
          });
        } catch {
          // ignore
        }

        setStatusMessage({
          type: 'success',
          text: 'Your inspection request has been submitted!',
        });

        // Clear fields as required
        setUrl('');
        setTitle('');
        setDescription('');
        setPrice('');
        setUploadedPhotos([]);

        setTimeout(() => {
          onSuccess?.();
          onClose();
        }, 1800);
      } else {
        setStatusMessage({ type: 'error', text: res.message });
      }
    } catch {
      setStatusMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSimulatePhotoUpload = () => {
    setUploadedPhotos([
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&auto=format&fit=crop&q=80',
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#141311] border border-[#F5C45E]/30 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(245,196,94,0.12)] relative text-white p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-[#1C1A17] text-[#8E8B85] hover:text-white hover:bg-[#25231F] transition-colors border border-[#2E2B25]"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1C1A17] border border-[#F5C45E]/30 text-[#F5C45E] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
            Request Expert Physical Verification
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Schedule Product Inspection
          </h3>
          <p className="text-xs text-[#9E9B95] mt-1">
            An Ezer verified specialist will meet the seller in person, run diagnostic checks, and deliver a detailed verdict.
          </p>
        </div>

        {/* 3 Submission Options Tabs */}
        <div className="grid grid-cols-3 gap-1.5 bg-[#121110] p-1 rounded-xl border border-[#272521] mb-6 text-xs font-medium">
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg transition-all ${
              mode === 'url'
                ? 'bg-[#F5C45E] text-[#101010] font-bold shadow-sm'
                : 'text-[#B8B5B0] hover:text-white'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span className="truncate">Paste Link</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('manual')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg transition-all ${
              mode === 'manual'
                ? 'bg-[#F5C45E] text-[#101010] font-bold shadow-sm'
                : 'text-[#B8B5B0] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="truncate">Add Manually</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('photo')}
            className={`flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg transition-all ${
              mode === 'photo'
                ? 'bg-[#F5C45E] text-[#101010] font-bold shadow-sm'
                : 'text-[#B8B5B0] hover:text-white'
            }`}
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="truncate">Upload Photos</span>
          </button>
        </div>

        {/* Status notification */}
        {statusMessage && (
          <div
            className={`mb-5 p-3.5 rounded-xl border text-xs flex items-center gap-2.5 ${
              statusMessage.type === 'success'
                ? 'bg-[#35A66A]/10 border-[#35A66A]/40 text-[#4ADE80]'
                : 'bg-[#E05252]/10 border-[#E05252]/40 text-[#F87171]'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#35A66A]" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-[#E05252]" />
            )}
            <span className="font-semibold">{statusMessage.text}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Mode 1: URL input */}
          {mode === 'url' && (
            <div>
              <label className="block text-xs font-semibold text-[#B8B5B0] mb-1.5">
                Listing URL <span className="text-[#F5C45E]">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste OLX / Quikr / Facebook / Other listing link here..."
                  className="w-full bg-[#121110] border border-[#2E2B26] focus:border-[#F5C45E] rounded-xl px-4 py-3 text-xs text-white placeholder-[#6D6B66] outline-none transition-all shadow-inner"
                  required={mode === 'url'}
                />
              </div>
              <p className="text-[11px] text-[#8E8B85] mt-1.5 flex items-center gap-1">
                Supported: OLX, Facebook Marketplace, Quikr, Truecaller Buy & Sell
              </p>
            </div>
          )}

          {/* Mode 3: Photo Upload simulator */}
          {mode === 'photo' && (
            <div className="border-2 border-dashed border-[#2E2B26] hover:border-[#F5C45E]/50 rounded-xl p-4 text-center bg-[#121110] transition-colors">
              <Upload className="w-8 h-8 text-[#F5C45E] mx-auto mb-2" />
              <p className="font-semibold text-white">Upload Listing Screenshots or Photos</p>
              <p className="text-[11px] text-[#8E8B85] mt-1">
                Upload clear screenshots of the seller's post or chat.
              </p>
              {uploadedPhotos.length === 0 ? (
                <button
                  type="button"
                  onClick={handleSimulatePhotoUpload}
                  className="mt-3 px-3 py-1.5 rounded-lg bg-[#24221F] hover:bg-[#2C2925] border border-[#2E2B26] text-[11px] text-[#F5C45E] font-medium transition-all"
                >
                  Select Sample Listing Screenshots
                </button>
              ) : (
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="text-[#35A66A] font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 2 Photos Attached
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Common / Manual fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1.5">
                Product Title / Item Name
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. iPhone 14 128GB Midnight"
                className="w-full bg-[#121110] border border-[#2E2B26] focus:border-[#F5C45E] rounded-xl px-3.5 py-2.5 text-white placeholder-[#6D6B66] outline-none transition-all"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1.5">
                Category <span className="text-[#F5C45E]">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#121110] border border-[#2E2B26] focus:border-[#F5C45E] rounded-xl px-3.5 py-2.5 text-white outline-none"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name} className="bg-[#181715]">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1.5">
                Seller Location / Landmark <span className="text-[#F5C45E]">*</span>
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Indiranagar, Bengaluru"
                className="w-full bg-[#121110] border border-[#2E2B26] focus:border-[#F5C45E] rounded-xl px-3.5 py-2.5 text-white placeholder-[#6D6B66] outline-none"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1.5">
                District / City <span className="text-[#F5C45E]">*</span>
              </label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full bg-[#121110] border border-[#2E2B26] focus:border-[#F5C45E] rounded-xl px-3.5 py-2.5 text-white outline-none"
              >
                {INDIAN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist} className="bg-[#181715]">
                    {dist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1.5">
                Seller Quoted Price (₹)
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="e.g. 35000"
                className="w-full bg-[#121110] border border-[#2E2B26] focus:border-[#F5C45E] rounded-xl px-3.5 py-2.5 text-white placeholder-[#6D6B66] outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1.5">
                Inspection Tier & Fee
              </label>
              <div className="bg-[#121110] border border-[#2E2B26] rounded-xl px-3.5 py-2.5 text-[#F5C45E] font-bold flex items-center justify-between">
                <span>Standard In-Person Check</span>
                <span>₹499</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-[#B8B5B0] mb-1.5">
              Specific Inspection Instructions (Optional)
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Please verify True Tone display, battery health on 3uTools, and check for signs of water damage."
              className="w-full bg-[#121110] border border-[#2E2B26] focus:border-[#F5C45E] rounded-xl px-3.5 py-2.5 text-white placeholder-[#6D6B66] outline-none resize-none"
            />
          </div>

          {/* Pricing Guarantee Note */}
          <div className="p-3 rounded-xl bg-[#141311] border border-[#24221E] text-[11px] text-[#8E8B85] flex items-start gap-2">
            <MapPin className="w-4 h-4 text-[#F5C45E] shrink-0 mt-0.5" />
            <p>
              Our nearest verified partner will contact the seller, verify serial numbers, check internal components, and send you the comprehensive report before you transfer any payment.
            </p>
          </div>

          {/* Submit CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#101010] shadow-[0_0_20px_rgba(245,196,94,0.3)] hover:shadow-[0_0_30px_rgba(245,196,94,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-[#101010] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Submit Inspection Request</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
