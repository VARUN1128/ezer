'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Briefcase,
  Search,
  CheckCircle,
  IndianRupee,
  User,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  FileText,
  Star,
  Award,
  Calendar,
  Layers,
  Sparkles,
  Phone,
} from 'lucide-react';
import { InspectionRequest } from '@/lib/types';
import {
  getStoredRequests,
  getPartnerDeclines,
  acceptJob,
  declineJob,
  DEMO_PARTNER_PROFILE,
} from '@/lib/store';
import { PartnerSubmitReportModal } from '@/components/PartnerSubmitReportModal';
import { InspectionReportModal } from '@/components/InspectionReportModal';
import confetti from 'canvas-confetti';

function InspectorPortalContent() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'available';

  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [requests, setRequests] = useState<InspectionRequest[]>([]);
  const [declinedIds, setDeclinedIds] = useState<string[]>([]);
  const [actionMessage, setActionMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Modal for submitting a report for an accepted job
  const [selectedJobForReport, setSelectedJobForReport] = useState<InspectionRequest | null>(null);
  const [isSubmitReportOpen, setIsSubmitReportOpen] = useState(false);

  // Modal for previewing a completed report
  const [selectedReportToView, setSelectedReportToView] = useState<InspectionRequest | null>(null);
  const [isViewReportOpen, setIsViewReportOpen] = useState(false);

  const loadData = () => {
    const list = getStoredRequests();
    setRequests(list);
    setDeclinedIds(getPartnerDeclines(DEMO_PARTNER_PROFILE.id));
  };

  useEffect(() => {
    loadData();
    const handleStorageChange = () => loadData();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Update tab if query parameter changes
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Available jobs: Status === 'pending' AND NOT in declinedIds
  const availableJobs = requests.filter(
    (req) => req.status === 'pending' && !declinedIds.includes(req.id)
  );

  // My Jobs: Assigned to this partner
  const myAcceptedJobs = requests.filter(
    (req) => req.assigned_partner_id === DEMO_PARTNER_PROFILE.id && req.status === 'accepted'
  );

  const myCompletedJobs = requests.filter(
    (req) => req.assigned_partner_id === DEMO_PARTNER_PROFILE.id && req.status === 'completed'
  );

  // Financial calculations
  const totalEarnings = myCompletedJobs.reduce((acc, curr) => acc + curr.inspection_fee, DEMO_PARTNER_PROFILE.earnings_total);

  // Accept action
  const handleAccept = async (requestId: string) => {
    setActionMessage(null);
    const res = await acceptJob(
      requestId,
      DEMO_PARTNER_PROFILE.id,
      DEMO_PARTNER_PROFILE.full_name
    );

    if (res.success) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#F5C45E', '#35A66A', '#FFFFFF'],
        });
      } catch {
        // ignore
      }
      setActionMessage({ type: 'success', text: res.message });
      loadData();
      setActiveTab('myjobs');
    } else {
      setActionMessage({ type: 'error', text: res.message });
    }
  };

  // Decline action (removes from partner's view, keeps pending for others)
  const handleDecline = async (requestId: string) => {
    setActionMessage(null);
    const res = await declineJob(requestId, DEMO_PARTNER_PROFILE.id);
    if (res.success) {
      setActionMessage({ type: 'success', text: res.message });
      loadData();
    } else {
      setActionMessage({ type: 'error', text: res.message });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header with Inspector Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181613] border border-[#F5C45E]/40 text-[#F5C45E] text-xs font-semibold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#F5C45E]" />
              Verified Expert Inspector Portal
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Inspector Control Center
            </h1>
            <p className="text-xs text-[#9E9B95]">
              Logged in as <strong className="text-white">{DEMO_PARTNER_PROFILE.full_name}</strong> ({DEMO_PARTNER_PROFILE.district})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-[#141311] border border-[#26241F] text-xs text-[#35A66A] font-bold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#35A66A] animate-ping" />
              Online & Available for Jobs
            </span>
          </div>
        </div>

        {/* Global Feedback Banner */}
        {actionMessage && (
          <div
            className={`p-4 rounded-xl border text-xs flex items-center justify-between gap-3 animate-fadeIn ${
              actionMessage.type === 'success'
                ? 'bg-[#35A66A]/15 border-[#35A66A]/40 text-[#4ADE80]'
                : 'bg-[#E05252]/15 border-[#E05252]/40 text-[#F87171]'
            }`}
          >
            <div className="flex items-center gap-2">
              {actionMessage.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-[#35A66A] shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-[#E05252] shrink-0" />
              )}
              <span className="font-semibold">{actionMessage.text}</span>
            </div>
            <button
              onClick={() => setActionMessage(null)}
              className="text-xs underline text-white"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* 5 Tab Navigation: Dashboard, Available Jobs, My Jobs, Earnings, Profile */}
        <div className="bg-[#141311] border border-[#26241F] p-2 rounded-2xl flex items-center gap-1.5 overflow-x-auto text-xs font-semibold scrollbar-none shadow-md">
          {[
            { id: 'overview', label: 'Dashboard', icon: Briefcase },
            { id: 'available', label: 'Available Jobs', icon: Search, badge: availableJobs.length },
            { id: 'myjobs', label: 'My Jobs', icon: CheckCircle, badge: myAcceptedJobs.length },
            { id: 'earnings', label: 'Earnings', icon: IndianRupee },
            { id: 'profile', label: 'Profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                  active
                    ? 'bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] font-bold shadow-[0_0_15px_rgba(245,196,94,0.3)]'
                    : 'text-[#8E8B85] hover:text-white hover:bg-[#1C1A17]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      active ? 'bg-[#0B0A09]/20 text-[#0B0A09]' : 'bg-[#25231F] text-[#F5C45E]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                <span className="text-xs font-semibold text-[#8E8B85] block">Available Requests</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#F5C45E] mt-1.5 block">
                  {availableJobs.length}
                </span>
                <span className="text-xs text-[#8E8B85] mt-1 block">In your coverage area</span>
              </div>

              <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                <span className="text-xs font-semibold text-[#8E8B85] block">Accepted / Active</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 mt-1.5 block">
                  {myAcceptedJobs.length}
                </span>
                <span className="text-xs text-[#8E8B85] mt-1 block">Awaiting report filing</span>
              </div>

              <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                <span className="text-xs font-semibold text-[#8E8B85] block">Completed Jobs</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-[#35A66A] mt-1.5 block">
                  {myCompletedJobs.length + DEMO_PARTNER_PROFILE.total_inspections}
                </span>
                <span className="text-xs text-[#8E8B85] mt-1 block">100% verified verdict</span>
              </div>

              <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
                <span className="text-xs font-semibold text-[#8E8B85] block">Total Earnings</span>
                <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 block">
                  ₹{totalEarnings.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-[#4ADE80] mt-1 block">Transferred weekly via UPI</span>
              </div>
            </div>

            {/* Quick Actions & Recent Activity */}
            <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-6 sm:p-7 space-y-4 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#F5C45E]" />
                Recent Inspector Activity
              </h3>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-[#121110] border border-[#24221E] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white">
                      Physical inspection completed for Sony Bravia 55" 4K TV
                    </span>
                    <p className="text-[11px] text-[#8E8B85]">BTM Layout 2nd Stage • Fee ₹599</p>
                  </div>
                  <span className="text-[11px] font-bold text-[#35A66A] px-2 py-0.5 rounded bg-[#35A66A]/10">
                    Paid ₹599
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#121110] border border-[#24221E] flex items-center justify-between text-xs">
                  <div className="space-y-0.5">
                    <span className="font-semibold text-white">
                      Accepted job: MacBook Air M1 (8GB / 256GB SSD)
                    </span>
                    <p className="text-[11px] text-[#8E8B85]">Koramangala 4th Block • Fee ₹699</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('myjobs')}
                    className="text-xs font-bold text-[#F5C45E] underline"
                  >
                    Go to My Jobs →
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AVAILABLE JOBS */}
        {activeTab === 'available' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Available Inspection Jobs</h2>
              <p className="text-xs text-[#8E8B85] mt-1">
                Inspection requests submitted by customers in your coverage district ({DEMO_PARTNER_PROFILE.district}).
              </p>
            </div>

            {availableJobs.length === 0 ? (
              <div className="bg-[#181715] border border-[#2A2824] rounded-2xl p-12 text-center max-w-md mx-auto space-y-3">
                <Search className="w-12 h-12 text-[#8E8B85] mx-auto" />
                <h3 className="text-base font-bold text-white">No available jobs at this moment</h3>
                <p className="text-xs text-[#8E8B85]">
                  All current customer listings have either been accepted or declined. New requests appear here in real-time.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {availableJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-[#181715] border border-[#2A2824] hover:border-[#F5C45E]/40 rounded-2xl p-5 sm:p-6 transition-all flex flex-col justify-between group shadow-card"
                  >
                    <div className="space-y-3">
                      {/* Top tags */}
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-[#24221F] border border-[#35322C] text-[#F5C45E]">
                          {job.category}
                        </span>
                        <div className="text-right">
                          <span className="text-xs text-[#8E8B85] block">Inspection Fee</span>
                          <span className="text-base font-extrabold text-[#4ADE80]">
                            ₹{job.inspection_fee}
                          </span>
                        </div>
                      </div>

                      {/* Product Title */}
                      <h3 className="text-base font-bold text-white group-hover:text-[#F5C45E] transition-colors leading-snug">
                        {job.product_title}
                      </h3>

                      {/* Customer requested location & district */}
                      <div className="space-y-1 text-xs text-[#8E8B85] bg-[#121110] p-3 rounded-xl border border-[#24221E]">
                        <div className="flex items-center gap-1.5 text-white font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[#F5C45E]" />
                          <span>{job.location} ({job.district})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-[#8E8B85] text-[11px]">
                          <Clock className="w-3 h-3" />
                          <span>Requested {new Date(job.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>

                      {/* Customer instructions / description */}
                      {job.description && (
                        <p className="text-xs text-[#B8B5B0] leading-relaxed line-clamp-2">
                          "{job.description}"
                        </p>
                      )}

                      {/* External listing link preview */}
                      <div>
                        <a
                          href={job.listing_url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[11px] text-[#8E8B85] hover:text-[#F5C45E] inline-flex items-center gap-1 truncate max-w-full underline"
                        >
                          <ExternalLink className="w-3 h-3 shrink-0" />
                          <span className="truncate">{job.listing_url}</span>
                        </a>
                      </div>
                    </div>

                    {/* Partner Actions: ACCEPT vs DECLINE */}
                    <div className="grid grid-cols-2 gap-3 pt-5 border-t border-[#23211D] mt-4">
                      <button
                        type="button"
                        onClick={() => handleDecline(job.id)}
                        className="py-2.5 rounded-xl text-xs font-semibold bg-[#24221F] hover:bg-red-950/40 text-[#8E8B85] hover:text-red-400 border border-[#35322C] hover:border-red-800 transition-all flex items-center justify-center gap-1.5"
                      >
                        <XCircle className="w-3.5 h-3.5" />
                        <span>Decline</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAccept(job.id)}
                        className="py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#101010] shadow-[0_0_15px_rgba(245,196,94,0.3)] hover:shadow-[0_0_25px_rgba(245,196,94,0.5)] transition-all flex items-center justify-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Accept Job</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: MY JOBS */}
        {activeTab === 'myjobs' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">My Active Assigned Jobs</h2>
              <p className="text-xs text-[#8E8B85] mt-1">
                Jobs you have accepted. Coordinate physical meeting, conduct diagnostic checks, and submit the report.
              </p>
            </div>

            {myAcceptedJobs.length === 0 ? (
              <div className="bg-[#181715] border border-[#2A2824] rounded-2xl p-10 text-center max-w-md mx-auto space-y-3">
                <CheckCircle className="w-12 h-12 text-[#8E8B85] mx-auto" />
                <h3 className="text-base font-bold text-white">No active jobs in progress</h3>
                <p className="text-xs text-[#8E8B85]">
                  Accept new inspection jobs from the Available Jobs tab to earn.
                </p>
                <button
                  onClick={() => setActiveTab('available')}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-[#F5C45E] text-[#101010]"
                >
                  View Available Jobs
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {myAcceptedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="bg-[#181715] border border-[#2A2824] rounded-2xl p-5 sm:p-6 shadow-card"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-[#24221F] text-[#F5C45E]">
                            {job.category}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/15 border border-blue-500/30 text-blue-400">
                            Accepted & Assigned to You
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-white">
                          {job.product_title}
                        </h3>

                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8E8B85]">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-[#F5C45E]" />
                            {job.location} ({job.district})
                          </span>
                          <span className="text-[#4ADE80] font-semibold">
                            Inspection Payout: ₹{job.inspection_fee}
                          </span>
                        </div>

                        {job.description && (
                          <p className="text-xs text-[#B8B5B0] bg-[#121110] p-2.5 rounded-lg border border-[#24221E]">
                            <strong className="text-white">Customer request:</strong> {job.description}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedJobForReport(job);
                            setIsSubmitReportOpen(true);
                          }}
                          className="px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#101010] shadow-[0_0_15px_rgba(245,196,94,0.3)] hover:shadow-[0_0_25px_rgba(245,196,94,0.5)] transition-all flex items-center justify-center gap-1.5"
                        >
                          <FileText className="w-4 h-4" />
                          <span>Submit Inspection Report</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Completed Jobs History */}
            {myCompletedJobs.length > 0 && (
              <div className="pt-8">
                <h3 className="text-base font-bold text-white mb-3">
                  Completed Inspections ({myCompletedJobs.length})
                </h3>
                <div className="space-y-3">
                  {myCompletedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-[#141311] border border-[#24221E] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <span className="font-bold text-white block">{job.product_title}</span>
                        <span className="text-[11px] text-[#8E8B85]">
                          {job.location} • Report Filed
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-extrabold text-[#4ADE80]">
                          +₹{job.inspection_fee}
                        </span>
                        {job.report && (
                          <button
                            onClick={() => {
                              setSelectedReportToView(job);
                              setIsViewReportOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-[#24221F] border border-[#35322C] text-xs font-semibold text-[#F5C45E] hover:bg-[#F5C45E] hover:text-[#101010] transition-colors"
                          >
                            View Report
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: EARNINGS */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white">Inspector Earnings & Payouts</h2>
              <p className="text-xs text-[#8E8B85] mt-1">
                Ezer pays expert partners weekly directly to their registered UPI ID or Bank Account.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#181715] border border-[#2A2824] rounded-2xl p-5">
                <span className="text-xs text-[#8E8B85] block">Lifetime Earned</span>
                <span className="text-3xl font-extrabold text-[#4ADE80] mt-1 block">
                  ₹{totalEarnings.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-[#8E8B85] mt-1 block">Across all completed jobs</span>
              </div>

              <div className="bg-[#181715] border border-[#2A2824] rounded-2xl p-5">
                <span className="text-xs text-[#8E8B85] block">Pending Clearance</span>
                <span className="text-3xl font-extrabold text-[#F5C45E] mt-1 block">
                  ₹{myAcceptedJobs.reduce((acc, curr) => acc + curr.inspection_fee, 0)}
                </span>
                <span className="text-[11px] text-[#8E8B85] mt-1 block">Releases upon report filing</span>
              </div>

              <div className="bg-[#181715] border border-[#2A2824] rounded-2xl p-5">
                <span className="text-xs text-[#8E8B85] block">Registered UPI</span>
                <span className="text-sm font-mono font-bold text-white mt-2 block">
                  vikram.m@oksbi
                </span>
                <span className="text-[11px] text-[#35A66A] mt-1 block">Verified & Active</span>
              </div>
            </div>

            <div className="bg-[#181715] border border-[#2A2824] rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-bold text-white">Payout Schedule</h3>
              <p className="text-xs text-[#8E8B85] leading-relaxed">
                Inspections are audited within 2 hours of report submission. Payouts are triggered automatically every Tuesday midnight for all verified jobs completed the prior week.
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: PROFILE */}
        {activeTab === 'profile' && (
          <div className="max-w-2xl bg-[#181715] border border-[#2A2824] rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5C45E] to-[#D99C32] text-[#101010] font-extrabold text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,196,94,0.3)]">
                VM
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  {DEMO_PARTNER_PROFILE.full_name}
                  <span className="px-2 py-0.5 rounded-full bg-[#35A66A]/20 border border-[#35A66A]/40 text-[#4ADE80] text-[10px] font-bold">
                    VERIFIED
                  </span>
                </h3>
                <p className="text-xs text-[#8E8B85]">{DEMO_PARTNER_PROFILE.location}</p>
                <div className="flex items-center gap-2 text-xs text-[#F5C45E] mt-1 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-[#F5C45E]" />
                  <span>4.9 / 5.0 Rating (48 Inspections)</span>
                </div>
              </div>
            </div>

            <div className="border-t border-[#23211D] pt-4 space-y-3 text-xs">
              <div>
                <span className="text-[#8E8B85] block mb-1">Coverage District</span>
                <span className="font-semibold text-white">{DEMO_PARTNER_PROFILE.district}</span>
              </div>

              <div>
                <span className="text-[#8E8B85] block mb-1">Approved Categories & Expertise</span>
                <div className="flex flex-wrap gap-1.5">
                  {DEMO_PARTNER_PROFILE.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="px-2.5 py-1 rounded-lg bg-[#24221F] border border-[#35322C] text-[#F5C45E] text-[11px] font-semibold"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[#8E8B85] block mb-1">Contact Phone</span>
                <span className="font-semibold text-white">+91 {DEMO_PARTNER_PROFILE.phone}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Partner submitting inspection report */}
      {selectedJobForReport && (
        <PartnerSubmitReportModal
          isOpen={isSubmitReportOpen}
          onClose={() => setIsSubmitReportOpen(false)}
          request={selectedJobForReport}
          partnerId={DEMO_PARTNER_PROFILE.id}
          partnerName={DEMO_PARTNER_PROFILE.full_name}
          onSuccess={() => {
            loadData();
            setActiveTab('myjobs');
          }}
        />
      )}

      {/* Modal: Viewing completed inspection report */}
      {selectedReportToView && (
        <InspectionReportModal
          isOpen={isViewReportOpen}
          onClose={() => setIsViewReportOpen(false)}
          request={selectedReportToView}
        />
      )}
    </div>
  );
}

export default function InspectorPortalPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#101010] flex items-center justify-center text-[#F5C45E]">
          <div className="w-8 h-8 border-2 border-[#F5C45E] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <InspectorPortalContent />
    </Suspense>
  );
}
