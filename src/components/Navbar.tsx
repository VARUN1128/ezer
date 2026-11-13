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
  Sun,
  Moon,
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
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const saved = localStorage.getItem('ezer-theme') as 'dark' | 'light' | null;
    if (saved === 'light' || saved === 'dark') {
      setTheme(saved);
      applyTheme(saved);
    } else {
      applyTheme('dark');
    }
  }, []);

  const applyTheme = (mode: 'dark' | 'light') => {
    const root = document.documentElement;
    if (mode === 'light') {
      root.classList.remove('dark');
      root.classList.add('light');
    } else {
      root.classList.remove('light');
      root.classList.add('dark');
    }
  };

  const handleThemeChange = (mode: 'dark' | 'light') => {
    setTheme(mode);
    localStorage.setItem('ezer-theme', mode);
    applyTheme(mode);
  };

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
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0B0A09]/95 backdrop-blur-xl border-b border-[#25221B]/90 transition-all">
        {/* ========================================================================= */}
        {/* DESKTOP NAVBAR                                                           */}
        {/* ========================================================================= */}
      <div className="hidden lg:flex max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 items-center justify-between gap-6">
        {/* Left: Luxury Brand Logo + Interactive District Selector */}
        <div className="flex items-center gap-4 shrink-0">
          <EzerLogo size="md" showTagline={false} />

          {/* Desktop District Selector matching Marketplace Experience */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-1.5 text-xs text-white bg-[#151412] hover:bg-[#1E1C18] border border-[#2B2822] hover:border-[#F5C45E]/50 px-3 py-1.5 rounded-full transition-all shadow-sm"
            >
              <MapPin className="w-3.5 h-3.5 text-[#F5C45E] shrink-0" />
              <span className="font-semibold text-xs">{selectedDistrict}</span>
              <ChevronDown className="w-3 h-3 text-[#9E9B95]" />
            </button>

            {/* Desktop Location Dropdown */}
            {isLocationDropdownOpen && (
              <div className="absolute left-0 top-9 mt-1 w-60 bg-[#161411] border border-[#2F2B22] rounded-2xl shadow-[0_20px_45px_rgba(0,0,0,0.95)] p-2 z-50 max-h-72 overflow-y-auto scrollbar-none animate-fadeIn">
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#8E8B85] px-2.5 py-1">
                  Select Coverage District
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

        {/* Center: Desktop Navigation Links */}
        <nav className="flex items-center gap-7">
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
        <div className="flex items-center gap-3 shrink-0">
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

          {/* Desktop Theme Toggle */}
          <button
            type="button"
            onClick={() => handleThemeChange(theme === 'dark' ? 'light' : 'dark')}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            className="p-2 rounded-xl bg-[#151412] hover:bg-[#1E1C18] border border-[#2B2822] hover:border-[#F5C45E]/40 text-[#9E9B95] hover:text-[#F5C45E] transition-all"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F5C45E]" /> : <Moon className="w-4 h-4 text-[#151412]" />}
          </button>

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
        {/* Top Row: Logo on Left + Location Picker + Hamburger Menu on Right */}
        <div className="flex items-center justify-between">
          <EzerLogo size="sm" showTagline={false} />

          <div className="flex items-center gap-2">
            {/* Location Picker with Dropdown matching screenshot */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                className="flex items-center gap-1.5 text-xs text-white bg-[#171512] hover:bg-[#201E1A] border border-[#2C2922] px-2.5 py-1.5 rounded-full transition-colors shadow-sm"
              >
                <MapPin className="w-3.5 h-3.5 text-[#F5C45E] shrink-0" />
                <span className="font-semibold truncate max-w-[105px]">{selectedDistrict}</span>
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

            {/* Mobile Hamburger Menu Icon in Top Right Corner */}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setMobileMenuOpen(true);
              }}
              aria-label="Open navigation menu & theme settings"
              className="p-2 rounded-xl bg-[#171512] hover:bg-[#201E1A] border border-[#2C2922] hover:border-[#F5C45E]/50 text-white hover:text-[#F5C45E] active:scale-95 transition-all shadow-sm shrink-0 cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
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

      {/* ========================================================================= */}
      {/* MOBILE FULL-SCREEN HAMBURGER MENU (RENDERED OUTSIDE <header>)              */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div
          className={`fixed inset-0 z-[99999] lg:hidden w-full h-full flex flex-col justify-between p-6 overflow-y-auto animate-fadeIn ${
            theme === 'light' ? 'bg-[#F8F7F4] text-[#151412]' : 'bg-[#0B0A09] text-white'
          }`}
        >
          <div className="space-y-6">
            {/* Header: Logo & Close Button */}
            <div className={`flex items-center justify-between pb-4 border-b ${theme === 'light' ? 'border-[#E2DDD3]' : 'border-[#22201B]'}`}>
              <EzerLogo size="sm" showTagline={false} />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-full border transition-colors ${
                  theme === 'light'
                    ? 'bg-[#EFEAE0] border-[#D6D0C4] text-[#151412] hover:bg-[#E2DDD3]'
                    : 'bg-[#1C1A17] border-[#2C2922] text-[#9E9B95] hover:text-white'
                }`}
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Theme Switcher Card (Promptly featured) */}
            <div
              className={`p-4 rounded-2xl border space-y-3 shadow-md ${
                theme === 'light' ? 'bg-white border-[#E2DDD3]' : 'bg-[#141311] border-[#2E2B24]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#F5C45E]" />
                  <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'light' ? 'text-[#151412]' : 'text-[#E0DDD8]'}`}>
                    Display Theme
                  </span>
                </div>
                <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#201E1A] text-[#F5C45E] border border-[#F5C45E]/20">
                  {theme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
                </span>
              </div>

              <p className={`text-xs ${theme === 'light' ? 'text-[#545047]' : 'text-[#8E8B85]'}`}>
                Switch between Luxury Obsidian (Dark) and Pearl Ivory (Light) mode.
              </p>

              {/* Segmented Control Toggle */}
              <div
                className={`grid grid-cols-2 gap-2 p-1.5 rounded-xl border ${
                  theme === 'light' ? 'bg-[#F1EDE5] border-[#E2DDD3]' : 'bg-[#1C1A17] border-[#26241F]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => handleThemeChange('dark')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] shadow-md'
                      : theme === 'light'
                      ? 'text-[#545047] hover:text-[#151412]'
                      : 'text-[#9E9B95] hover:text-white'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  <span>Dark Mode</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleThemeChange('light')}
                  className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs font-bold transition-all ${
                    theme === 'light'
                      ? 'bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] shadow-md'
                      : 'text-[#9E9B95] hover:text-white'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  <span>Light Mode</span>
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-1">
              <div className={`text-[10px] font-bold uppercase tracking-wider px-2 mb-2 ${theme === 'light' ? 'text-[#7D7971]' : 'text-[#8E8B85]'}`}>
                Navigation
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                    isCurrent(link.href)
                      ? theme === 'light'
                        ? 'bg-[#EFEAE0] text-[#9A6700] font-bold border border-[#9A6700]/30'
                        : 'bg-[#1C1A17] text-[#F5C45E] font-bold border border-[#F5C45E]/30'
                      : theme === 'light'
                      ? 'text-[#262420] hover:bg-[#EFEAE0]'
                      : 'text-[#E0DDD8] hover:text-white hover:bg-[#141311]'
                  }`}
                >
                  <span>{link.label}</span>
                  {isCurrent(link.href) && (
                    <span className="w-2 h-2 rounded-full bg-[#F5C45E]" />
                  )}
                </Link>
              ))}
            </div>

            {/* Account & Portal Links */}
            <div className={`space-y-1 pt-3 border-t ${theme === 'light' ? 'border-[#E2DDD3]' : 'border-[#22201B]'}`}>
              <div className={`text-[10px] font-bold uppercase tracking-wider px-2 mb-2 ${theme === 'light' ? 'text-[#7D7971]' : 'text-[#8E8B85]'}`}>
                Account & Portals
              </div>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
                  theme === 'light' ? 'text-[#262420] hover:bg-[#EFEAE0]' : 'text-[#E0DDD8] hover:bg-[#141311]'
                }`}
              >
                <Layers className="w-4 h-4 text-[#F5C45E]" />
                <span>My Inspection Requests</span>
              </Link>
              <Link
                href="/inspector"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
                  theme === 'light' ? 'text-[#262420] hover:bg-[#EFEAE0]' : 'text-[#E0DDD8] hover:bg-[#141311]'
                }`}
              >
                <Briefcase className="w-4 h-4 text-[#F5C45E]" />
                <span>Inspector Partner Portal</span>
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-colors ${
                  theme === 'light' ? 'text-[#262420] hover:bg-[#EFEAE0]' : 'text-[#E0DDD8] hover:bg-[#141311]'
                }`}
              >
                <User className="w-4 h-4 text-[#9E9B95]" />
                <span>Login / Register</span>
              </Link>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className={`pt-6 border-t space-y-3 ${theme === 'light' ? 'border-[#E2DDD3]' : 'border-[#22201B]'}`}>
            <Link
              href="/#verify-form"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] shadow-[0_0_20px_rgba(245,196,94,0.3)] hover:shadow-[0_0_30px_rgba(245,196,94,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Request Inspection Now</span>
            </Link>
            <div className={`text-center text-[11px] ${theme === 'light' ? 'text-[#7D7971]' : 'text-[#78756F]'}`}>
              Ezer Platform • Know Before You Buy
            </div>
          </div>
        </div>
      )}
    </>
  );
};
