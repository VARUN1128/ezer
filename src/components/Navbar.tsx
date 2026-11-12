'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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
} from 'lucide-react';
import { getActiveRole, setActiveRole } from '@/lib/store';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeRole, setRoleState] = useState<'customer' | 'partner'>('customer');

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

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0B0A09]/85 backdrop-blur-xl border-b border-[#25221B]/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
        {/* Left: Luxury Brand Logo */}
        <EzerLogo size="md" showTagline={false} />

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8">
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
        <div className="hidden sm:flex items-center gap-3.5">
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

        {/* Mobile Hamburger Button */}
        <div className="flex sm:hidden items-center gap-2">
          {activeRole === 'partner' ? (
            <Link
              href="/inspector"
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#181714] text-[#F5C45E] border border-[#F5C45E]/30"
            >
              Inspector
            </Link>
          ) : (
            <Link
              href="/dashboard"
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#181714] text-white border border-[#2B2822]"
            >
              Requests
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-[#181714] border border-[#2B2822] text-white hover:text-[#F5C45E] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#25221B] bg-[#11100E]/95 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3">
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-xl text-sm font-medium ${
                  isCurrent(link.href)
                    ? 'bg-[#1D1B17] text-[#F5C45E] font-semibold border border-[#F5C45E]/20'
                    : 'text-[#9E9B95] hover:bg-[#181714] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-[#25221B] grid grid-cols-2 gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-[#181714] border border-[#2B2822] text-white"
            >
              <User className="w-4 h-4 text-[#F5C45E]" />
              My Requests
            </Link>
            <Link
              href="/inspector"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-semibold bg-[#181714] border border-[#F5C45E]/30 text-[#F5C45E]"
            >
              <Briefcase className="w-4 h-4" />
              Inspector Portal
            </Link>
          </div>

          <div className="pt-1">
            <Link
              href="/#verify-form"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09]"
            >
              <span>Verify a Listing Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
