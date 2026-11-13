'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { EzerLogo } from './EzerLogo';
import {
  Menu,
  X,
  ShieldCheck,
  User,
  ArrowRight,
  Briefcase,
  Layers,
  Sparkles,
  MapPin,
  Search,
  Mic,
  Heart,
  Bell,
  ChevronDown,
} from 'lucide-react';
import { getActiveRole, isValidListingUrl, createInspectionRequest } from '@/lib/store';
import { INDIAN_DISTRICTS } from '@/lib/constants';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setRoleState] = useState<'customer' | 'partner'>('customer');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('Maradu, Kochi');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setRoleState(getActiveRole());
  }, [pathname]);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'How it Works', href: '/how-it-works' },
    { label: 'Categories', href: '/marketplace' },
    { label: 'For Inspectors', href: '/join-partner' },
    { label: 'About', href: '/about' },
  ];

  const isCurrent = (path: string) => {
    if (path === '/' && pathname === '/') return true;
    if (path !== '/' && pathname.startsWith(path)) return true;
    return false;
  };

  const handleMobileSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    if (isValidListingUrl(query)) {
      try {
        await createInspectionRequest({
          listing_url: query,
          location: selectedDistrict,
          district: selectedDistrict.includes('Kochi') ? 'Kochi / Ernakulam' : selectedDistrict,
        });
        setSearchQuery('');
        router.push('/dashboard');
      } catch {
        router.push(`/marketplace?search=${encodeURIComponent(query)}`);
      }
    } else {
      router.push(`/marketplace?search=${encodeURIComponent(query)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0A09]/95 backdrop-blur-xl border-b border-[#25221B]/90 transition-all">
      {/* ========================================================================= */}
      {/* DESKTOP NAVBAR (Unchanged, exactly as current)                           */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 items-center justify-between">
        {/* Left: Luxury Brand Logo */}
        <EzerLogo size="md" showTagline={false} />

        {/* Center: Desktop Navigation Links */}
        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-all relative py-1 ${
                isCurrent(link.href)
                  ? 'text-[#F5C45E] font-semibold'
                  : 'text-[#9E9B95] hover:text-white'
              }`}
            >
              {link.label}
              {isCurrent(link.href) && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F5C45E] to-transparent rounded-full shadow-[0_0_8px_#F5C45E]" />
              )}
            </Link>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-3.5">
          {activeRole === 'partner' ? (
            <Link
              href="/inspector"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#181714] border border-[#F5C45E]/35 text-[#F5C45E] hover:bg-[#201F1B] hover:border-[#F5C45E] hover:shadow-[0_0_15px_rgba(245,196,94,0.25)] transition-all"
            >
              <Briefcase className="w-3.5 h-3.5 text-[#F5C45E]" />
              Inspector Portal
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#181714] border border-[#2B2822] text-[#E0DDD8] hover:text-white hover:border-[#F5C45E]/40 hover:shadow-[0_0_15px_rgba(245,196,94,0.15)] transition-all"
            >
              <Layers className="w-3.5 h-3.5 text-[#F5C45E]" />
              My Requests
            </Link>
          )}

          <Link
            href="/login"
            className="text-xs font-semibold px-3 py-2 text-[#9E9B95] hover:text-white transition-colors"
          >
            Login
          </Link>

          <Link
            href="/#verify-form"
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] shadow-[0_0_20px_rgba(245,196,94,0.35)] hover:shadow-[0_0_30px_rgba(245,196,94,0.55)] transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </Link>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE APP HEADER (Matching user's reference screenshot in Ezer dark gold) */}
      {/* ========================================================================= */}
      <div className="lg:hidden px-4 pt-3 pb-2.5 space-y-2.5">
        {/* Top Row: Logo on Left + Location Picker on Right */}
        <div className="flex items-center justify-between">
          <EzerLogo size="sm" showTagline={false} />

          {/* Location Picker with Dropdown matching screenshot */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-white bg-[#171512] hover:bg-[#201E1A] border border-[#2C2922] px-3 py-1.5 rounded-full transition-colors shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F5C45E] shrink-0" />
              <span className="font-semibold truncate max-w-[130px]">{selectedDistrict}</span>
              <ChevronDown className="w-3 h-3 text-[#9E9B95]" />
            </button>

            {/* Dropdown Menu */}
            {isLocationDropdownOpen && (
              <div className="absolute right-0 top-9 mt-1 w-56 bg-[#161411] border border-[#2F2B22] rounded-2xl shadow-[0_15px_35px_rgba(0,0,0,0.9)] p-2 z-50 max-h-64 overflow-y-auto scrollbar-none animate-fadeIn">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E8B85] px-2.5 py-1">
                  Select Inspection District
                </div>
                {['Maradu, Kochi', ...INDIAN_DISTRICTS].map((dist) => (
                  <button
                    key={dist}
                    type="button"
                    onClick={() => {
                      setSelectedDistrict(dist);
                      setIsLocationDropdownOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs transition-colors flex items-center justify-between ${
                      selectedDistrict === dist
                        ? 'bg-[#F5C45E] text-[#0B0A09] font-bold'
                        : 'text-white hover:bg-[#22201B]'
                    }`}
                  >
                    <span>{dist}</span>
                    {selectedDistrict === dist && <ShieldCheck className="w-3.5 h-3.5 text-[#0B0A09]" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Second Row: Mobile Search Bar with Icons (Search, Mic, Heart, Bell) */}
        <div className="flex items-center gap-2">
          <form
            onSubmit={handleMobileSearch}
            className="flex-1 flex items-center bg-[#171512] border border-[#2C2922] focus-within:border-[#F5C45E]/70 focus-within:shadow-[0_0_15px_rgba(245,196,94,0.2)] rounded-2xl px-3 py-2 transition-all"
          >
            <Search className="w-4 h-4 text-[#8E8B85] mr-2 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search "Mobiles" or paste link...'
              className="w-full bg-transparent text-xs text-white placeholder-[#78756F] outline-none"
            />
            <button
              type="button"
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-verify-modal'));
              }}
              title="Paste or voice inspect"
              className="text-[#8E8B85] hover:text-[#F5C45E] transition-colors pl-1 shrink-0"
            >
              <Mic className="w-4 h-4" />
            </button>
          </form>

          {/* Heart / Saved Requests Icon */}
          <Link
            href="/dashboard"
            aria-label="Saved listings and requests"
            className="p-2.5 rounded-2xl bg-[#171512] border border-[#2C2922] text-[#8E8B85] hover:text-red-400 hover:border-red-400/40 transition-colors shrink-0 shadow-sm"
          >
            <Heart className="w-4 h-4" />
          </Link>

          {/* Bell / Notifications Icon */}
          <Link
            href="/dashboard"
            aria-label="Notifications"
            className="p-2.5 rounded-2xl bg-[#171512] border border-[#2C2922] text-[#8E8B85] hover:text-[#F5C45E] hover:border-[#F5C45E]/40 transition-colors shrink-0 relative shadow-sm"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F5C45E] ring-2 ring-[#0B0A09]" />
          </Link>
        </div>
      </div>
    </header>
  );
};
