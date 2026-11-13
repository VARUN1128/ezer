'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Clock,
  UserCheck,
  CheckCircle2,
  FileCheck,
  ExternalLink,
  MapPin,
  Calendar,
  ShieldAlert,
  ArrowRight,
  Filter,
  Sparkles,
  RefreshCw,
  Phone,
  ShieldCheck,
  Crown,
} from 'lucide-react';
import { InspectionRequest, InspectionStatus } from '@/lib/types';
import { getStoredRequests, DEMO_CUSTOMER_PROFILE } from '@/lib/store';
import { InspectionReportModal } from '@/components/InspectionReportModal';
import { SubmitListingModal } from '@/components/SubmitListingModal';

export default function CustomerDashboardPage() {
  const [requests, setRequests] = useState<InspectionRequest[]>([]);
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedRequestForReport, setSelectedRequestForReport] = useState<InspectionRequest | null>(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  const loadRequests = () => {
    const list = getStoredRequests();
    setRequests(list);
  };

  useEffect(() => {
    loadRequests();

    const handleStorageChange = () => loadRequests();
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleStorageChange);
    };
  }, []);

  // Filter requests by customer and tab
  const filteredRequests = requests.filter((req) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return req.status === 'pending';
    if (activeTab === 'assigned') return req.status === 'accepted';
    if (activeTab === 'in_progress') return req.status === 'in_progress';
    if (activeTab === 'completed') return req.status === 'completed';
    if (activeTab === 'reports') return Boolean(req.report);
    return true;
  });

  const getStatusBadge = (status: InspectionStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Pending Partner
          </span>
        );
      case 'accepted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/30 text-blue-400">
            <UserCheck className="w-3.5 h-3.5 text-blue-400" />
            Partner Assigned
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
            <RefreshCw className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
            In Progress
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#35A66A]/10 border border-[#35A66A]/30 text-[#4ADE80]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#35A66A]" />
            Inspection Completed
          </span>
        );
      case 'declined':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-400">
            <ShieldAlert className="w-3.5 h-3.5" />
            Declined
          </span>
        );
    }
  };

  const counts = {
    all: requests.length,
    pending: requests.filter((r) => r.status === 'pending').length,
    assigned: requests.filter((r) => r.status === 'accepted').length,
    in_progress: requests.filter((r) => r.status === 'in_progress').length,
    completed: requests.filter((r) => r.status === 'completed').length,
    reports: requests.filter((r) => Boolean(r.report)).length,
  };

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#181613] border border-[#F5C45E]/30 text-[#F5C45E] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
              Buyer Verification Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Customer Inspection Dashboard
            </h1>
            <p className="text-xs text-[#9E9B95]">
              Signed in as <strong className="text-white">{DEMO_CUSTOMER_PROFILE.full_name}</strong> ({DEMO_CUSTOMER_PROFILE.phone})
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] shadow-[0_0_20px_rgba(245,196,94,0.35)] hover:shadow-[0_0_30px_rgba(245,196,94,0.55)] transition-all flex items-center gap-2 hover:scale-[1.01]"
            >
              <span>+ New Inspection Request</span>
            </button>
          </div>
        </div>

        {/* Stats Row - Luxury Obsidian Cards (Horizontal scroll on mobile) */}
        <div className="flex overflow-x-auto pb-3 pt-1 gap-4 snap-x snap-mandatory scrollbar-none sm:grid sm:grid-cols-4 -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="shrink-0 w-[180px] sm:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <span className="text-xs font-semibold text-[#8E8B85] block">Total Requests</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5 block">{counts.all}</span>
            <span className="text-xs text-[#F5C45E] mt-1 block">Tracked listings</span>
          </div>

          <div className="shrink-0 w-[180px] sm:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <span className="text-xs font-semibold text-[#8E8B85] block">Pending Partners</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-400 mt-1.5 block">{counts.pending}</span>
            <span className="text-xs text-[#8E8B85] mt-1 block">Awaiting partner accept</span>
          </div>

          <div className="shrink-0 w-[180px] sm:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <span className="text-xs font-semibold text-[#8E8B85] block">Partner Assigned</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-blue-400 mt-1.5 block">{counts.assigned}</span>
            <span className="text-xs text-[#8E8B85] mt-1 block">Partner en route/scheduled</span>
          </div>

          <div className="shrink-0 w-[180px] sm:w-auto snap-center bg-[#141311] border border-[#26241F] rounded-3xl p-5 sm:p-6 shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
            <span className="text-xs font-semibold text-[#8E8B85] block">Reports Ready</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-[#4ADE80] mt-1.5 block">{counts.reports}</span>
            <span className="text-xs text-[#8E8B85] mt-1 block">Verification complete</span>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto border-b border-[#201E1A] pb-3 text-xs font-semibold scrollbar-none">
          {[
            { id: 'all', label: 'All Requests', count: counts.all },
            { id: 'pending', label: 'Pending Requests', count: counts.pending },
            { id: 'assigned', label: 'Partner Assigned', count: counts.assigned },
            { id: 'completed', label: 'Completed Inspections', count: counts.completed },
            { id: 'reports', label: 'Inspection Reports', count: counts.reports },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] font-bold shadow-[0_0_15px_rgba(245,196,94,0.3)]'
                  : 'bg-[#141311] text-[#9E9B95] hover:text-white border border-[#26241F]'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeTab === tab.id ? 'bg-[#0B0A09]/20 text-[#0B0A09]' : 'bg-[#1C1A17] text-[#8E8B85]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-14 text-center max-w-md mx-auto space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            <Layers className="w-12 h-12 text-[#8E8B85] mx-auto" />
            <h3 className="text-base font-bold text-white">No requests found in this view</h3>
            <p className="text-xs text-[#8E8B85]">
              Paste any second-hand marketplace link to schedule an expert physical inspection.
            </p>
            <button
              onClick={() => setIsSubmitModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#F5C45E] text-[#0B0A09] hover:bg-[#D99C32] transition-colors"
            >
              Submit Your First Listing
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                className="bg-[#141311] border border-[#26241F] hover:border-[#F5C45E]/40 rounded-3xl p-6 sm:p-7 transition-all duration-300 shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_20px_45px_rgba(245,196,94,0.12)]"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                  {/* Left Column: Product Info */}
                  <div className="space-y-2.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs uppercase font-bold px-2.5 py-0.5 rounded-full bg-[#1C1A16] text-[#F5C45E] border border-[#353127]">
                        {req.category}
                      </span>
                      {req.marketplace && (
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#0B0A09] text-[#9E9B95] border border-[#23211D]">
                          {req.marketplace}
                        </span>
                      )}
                      {getStatusBadge(req.status)}
                    </div>

                    <h3 className="text-lg font-bold text-white">
                      {req.product_title}
                    </h3>

                    {/* Meta info: Location, District, Date */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#8E8B85]">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#F5C45E]" />
                        {req.location} ({req.district})
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-[#8E8B85]" />
                        {new Date(req.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                      <span className="text-[#F5C45E] font-medium">
                        Inspection Fee: ₹{req.inspection_fee}
                      </span>
                    </div>

                    {/* External listing link preview */}
                    <div className="pt-1">
                      <a
                        href={req.listing_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-[#8E8B85] hover:text-[#F5C45E] inline-flex items-center gap-1.5 truncate max-w-lg transition-colors underline"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{req.listing_url}</span>
                      </a>
                    </div>
                  </div>

                  {/* Middle Column: Assigned Partner Info if any */}
                  {req.assigned_partner_name && (
                    <div className="bg-[#191815] border border-[#2E2B24] rounded-2xl p-4 text-xs space-y-1 min-w-[220px] shadow-sm">
                      <span className="text-[10px] uppercase font-bold text-[#F5C45E] block tracking-wider">
                        Assigned Inspector
                      </span>
                      <div className="font-bold text-white flex items-center gap-1.5 text-sm">
                        <UserCheck className="w-4 h-4 text-[#35A66A]" />
                        {req.assigned_partner_name}
                      </div>
                      <div className="text-xs text-[#8E8B85] flex items-center gap-1">
                        <Phone className="w-3 h-3 text-[#F5C45E]" />
                        +91 {req.assigned_partner_phone || '9876543210'}
                      </div>
                      <span className="text-[11px] text-[#35A66A] font-semibold block pt-0.5">
                        ★ 4.9 Verified Expert Partner
                      </span>
                    </div>
                  )}

                  {/* Right Column: Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0">
                    {req.report ? (
                      <button
                        onClick={() => {
                          setSelectedRequestForReport(req);
                          setIsReportOpen(true);
                        }}
                        className="px-5 py-3 rounded-xl text-xs font-bold bg-[#35A66A] hover:bg-[#2F8E5B] text-white shadow-[0_0_20px_rgba(53,166,106,0.35)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                      >
                        <FileCheck className="w-4 h-4" />
                        <span>View Inspection Report</span>
                      </button>
                    ) : req.status === 'accepted' ? (
                      <div className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#161513] border border-blue-500/30 text-blue-300 text-center">
                        Inspection Scheduled
                      </div>
                    ) : (
                      <div className="px-4 py-2.5 rounded-xl text-xs font-medium bg-[#161513] border border-[#26241F] text-[#8E8B85] text-center">
                        Broadcasting to Experts
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inspection Report Modal */}
      {selectedRequestForReport && (
        <InspectionReportModal
          isOpen={isReportOpen}
          onClose={() => setIsReportOpen(false)}
          request={selectedRequestForReport}
        />
      )}

      {/* New Request Modal */}
      <SubmitListingModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onSuccess={() => {
          loadRequests();
        }}
      />
    </div>
  );
}
