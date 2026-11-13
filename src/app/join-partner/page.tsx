'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  IndianRupee,
  MapPin,
  Sparkles,
  ArrowRight,
  UserCheck,
  Clock,
  Award,
  Crown,
} from 'lucide-react';
import { CATEGORIES, INDIAN_DISTRICTS } from '@/lib/constants';
import { submitPartnerApplication } from '@/lib/store';
import confetti from 'canvas-confetti';

export default function JoinPartnerPage() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [district, setDistrict] = useState('Bengaluru Urban');
  const [selectedExpertise, setSelectedExpertise] = useState<string[]>(['Mobiles']);
  const [experience, setExperience] = useState('');
  const [introduction, setIntroduction] = useState('');

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const toggleExpertise = (cat: string) => {
    if (selectedExpertise.includes(cat)) {
      setSelectedExpertise(selectedExpertise.filter((c) => c !== cat));
    } else {
      setSelectedExpertise([...selectedExpertise, cat]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    // Validation
    if (!fullName.trim()) {
      setFeedback({ type: 'error', message: 'Full name is required.' });
      return;
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length !== 10 && cleanPhone.length !== 12) {
      setFeedback({
        type: 'error',
        message: 'Please provide a valid 10-digit Indian mobile number.',
      });
      return;
    }

    if (!location.trim()) {
      setFeedback({ type: 'error', message: 'Please enter your location or locality.' });
      return;
    }

    setLoading(true);

    try {
      const res = await submitPartnerApplication({
        full_name: fullName.trim(),
        phone: cleanPhone,
        email: email.trim() || undefined,
        location: location.trim(),
        district,
        expertise: selectedExpertise.length > 0 ? selectedExpertise : ['Electronics'],
        experience: experience.trim() || undefined,
        introduction: introduction.trim() || undefined,
      });

      if (res.success) {
        try {
          confetti({
            particleCount: 60,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#F5C45E', '#D99C32', '#FFFFFF'],
          });
        } catch {
          // ignore
        }

        setFeedback({
          type: 'success',
          message: res.message,
        });

        // Clear form
        setFullName('');
        setPhone('');
        setEmail('');
        setLocation('');
        setExperience('');
        setIntroduction('');
      } else {
        setFeedback({ type: 'error', message: res.message });
      }
    } catch {
      setFeedback({
        type: 'error',
        message: 'Unable to submit your application right now. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-14">
        {/* Luxury Hero Section */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#181613] border border-[#F5C45E]/30 text-[#F5C45E] text-xs font-semibold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5 text-[#F5C45E]" />
            Elite Technical Network
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Become an Ezer Expert Partner
          </h1>
          <p className="text-sm sm:text-base text-[#9E9B95] leading-relaxed">
            Help people make smarter second-hand purchases. Earn by bringing trust to every high-value transaction.
          </p>
        </div>

        {/* Benefits Grid (Horizontal scroll on mobile) */}
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-3 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="shrink-0 w-[270px] sm:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-6 text-center space-y-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1A16] border border-[#F5C45E]/30 text-[#F5C45E] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              <IndianRupee className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Earn ₹499 - ₹1,500</h4>
            <p className="text-xs text-[#8E8B85] leading-relaxed">
              Get paid for each completed physical inspection directly into your bank account or UPI ID.
            </p>
          </div>

          <div className="shrink-0 w-[270px] sm:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-6 text-center space-y-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1A16] border border-[#F5C45E]/30 text-[#F5C45E] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Flexible Schedule</h4>
            <p className="text-xs text-[#8E8B85] leading-relaxed">
              Accept only the requests in your immediate neighborhood that fit your daily schedule.
            </p>
          </div>

          <div className="shrink-0 w-[270px] sm:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-6 text-center space-y-2.5 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <div className="w-12 h-12 rounded-2xl bg-[#1C1A16] border border-[#F5C45E]/30 text-[#F5C45E] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(245,196,94,0.15)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-bold text-white text-base">Certified Inspector</h4>
            <p className="text-xs text-[#8E8B85] leading-relaxed">
              Build your technical reputation as an Ezer certified expert partner with verified ratings.
            </p>
          </div>
        </div>

        {/* Luxury Registration Form Container */}
        <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-7 sm:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative">
          <div className="mb-8 space-y-1">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              Partner Application Form
            </h2>
            <p className="text-xs text-[#8E8B85]">
              Please enter accurate information. Applications undergo background and skill verification before portal access is granted.
            </p>
          </div>

          {/* Feedback notification */}
          {feedback && (
            <div
              className={`mb-6 p-4 rounded-2xl border text-xs sm:text-sm flex items-start gap-3 animate-fadeIn ${
                feedback.type === 'success'
                  ? 'bg-[#35A66A]/15 border-[#35A66A]/40 text-[#4ADE80]'
                  : 'bg-[#E05252]/15 border-[#E05252]/40 text-[#F87171]'
              }`}
            >
              {feedback.type === 'success' ? (
                <CheckCircle2 className="w-5 h-5 text-[#35A66A] shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#E05252] shrink-0 mt-0.5" />
              )}
              <div>
                <span className="font-bold block">{feedback.message}</span>
                {feedback.type === 'success' && (
                  <p className="text-xs text-[#9E9B95] mt-1">
                    Note: Newly submitted applications are reviewed within 24 hours. Once verified by our operations team, you will receive full access to inspect customer jobs.
                  </p>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-sm">
            {/* Name & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold text-[#B8B5B0] mb-2 text-xs">
                  Full Name <span className="text-[#F5C45E]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 focus:shadow-[0_0_15px_rgba(245,196,94,0.15)] rounded-2xl px-4 py-3 text-white placeholder-[#75726B] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8B5B0] mb-2 text-xs">
                  Indian Mobile Number <span className="text-[#F5C45E]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#8E8B85] text-xs">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    maxLength={10}
                    className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 focus:shadow-[0_0_15px_rgba(245,196,94,0.15)] rounded-2xl pl-12 pr-4 py-3 text-white placeholder-[#75726B] outline-none transition-all"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Location & District */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block font-semibold text-[#B8B5B0] mb-2 text-xs">
                  Location / City / Locality <span className="text-[#F5C45E]">*</span>
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Indiranagar, Bengaluru"
                  className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 focus:shadow-[0_0_15px_rgba(245,196,94,0.15)] rounded-2xl px-4 py-3 text-white placeholder-[#75726B] outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-[#B8B5B0] mb-2 text-xs">
                  District <span className="text-[#F5C45E]">*</span>
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl px-4 py-3 text-white outline-none"
                  required
                >
                  {INDIAN_DISTRICTS.map((dist) => (
                    <option key={dist} value={dist} className="bg-[#141311]">
                      {dist}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Optional Email */}
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-2 text-xs">
                Email Address (Optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. vikram@example.com"
                className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 focus:shadow-[0_0_15px_rgba(245,196,94,0.15)] rounded-2xl px-4 py-3 text-white placeholder-[#75726B] outline-none transition-all"
              />
            </div>

            {/* Areas of Expertise (Multi-select) */}
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-2.5 text-xs">
                Areas of Expertise (Select all that apply)
              </label>
              <div className="flex flex-wrap gap-2.5">
                {CATEGORIES.map((cat) => {
                  const selected = selectedExpertise.includes(cat.name);
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => toggleExpertise(cat.name)}
                      className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-2 ${
                        selected
                          ? 'bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] font-bold shadow-[0_0_15px_rgba(245,196,94,0.3)]'
                          : 'bg-[#1C1A17] border border-[#2E2B25] text-[#9E9B95] hover:text-white'
                      }`}
                    >
                      {selected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      <span>{cat.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Experience */}
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-2 text-xs">
                Relevant Inspection / Technical Experience (Optional)
              </label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="e.g. 7 years as certified phone repair technician or automobile mechanic"
                className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl px-4 py-3 text-white placeholder-[#75726B] outline-none transition-all"
              />
            </div>

            {/* Introduction */}
            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-2 text-xs">
                Short Introduction / Diagnostic Tools Owned (Optional)
              </label>
              <textarea
                rows={3}
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
                placeholder="e.g. Own OBD-II scanner, multimeters, paint depth gauge, and 3uTools diagnostic kit."
                className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl px-4 py-3 text-white placeholder-[#75726B] outline-none resize-none"
              />
            </div>

            {/* Notice about approval workflow */}
            <div className="p-4 rounded-2xl bg-[#161512] border border-[#2E2B24] text-xs text-[#8E8B85] space-y-1">
              <strong className="text-white block">Approval Requirement Notice:</strong>
              <p>
                In order to protect customers and guarantee verification rigor, partner applications do not automatically grant portal access. Our operations team will verify your background and approve your inspector profile.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] shadow-[0_0_25px_rgba(245,196,94,0.35)] hover:shadow-[0_0_35px_rgba(245,196,94,0.55)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98] disabled:opacity-50"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-[#0B0A09] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Briefcase className="w-4 h-4" />
                    <span>Submit Partner Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
