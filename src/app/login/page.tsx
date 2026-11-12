'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  User,
  Briefcase,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Info,
} from 'lucide-react';
import { EzerLogo } from '@/components/EzerLogo';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { setActiveRole } from '@/lib/store';

export default function LoginPage() {
  const router = useRouter();
  const isSupabaseReady = isSupabaseConfigured();

  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [role, setRole] = useState<'customer' | 'partner'>('customer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSupabaseAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!isSupabaseReady || !supabase) {
      setErrorMessage(
        'Supabase credentials are not configured in your environment. You can test immediately using the 1-Click Demo Profiles below.'
      );
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone,
              role,
            },
          },
        });

        if (error) {
          setErrorMessage(error.message);
        } else {
          setSuccessMessage('Account created! Please check your email to confirm registration.');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setErrorMessage(error.message);
        } else {
          setActiveRole(role);
          if (role === 'partner') {
            router.push('/inspector');
          } else {
            router.push('/dashboard');
          }
        }
      }
    } catch {
      setErrorMessage('An unexpected authentication error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemoSwitch = (selectedRole: 'customer' | 'partner') => {
    setActiveRole(selectedRole);
    window.dispatchEvent(new Event('ezer-role-changed'));
    if (selectedRole === 'partner') {
      router.push('/inspector');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0A09] text-white py-14 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-7">
        {/* Brand Logo */}
        <div className="text-center space-y-2.5">
          <div className="flex justify-center">
            <EzerLogo size="lg" showTagline={true} />
          </div>
          <p className="text-xs text-[#8E8B85]">
            Secure Verification Access for Buyers & Certified Partners
          </p>
        </div>

        {/* 1-Click Instant Demo Access Selector */}
        <div className="bg-[#141311] border border-[#F5C45E]/35 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.85),0_0_25px_rgba(245,196,94,0.12)]">
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#F5C45E] uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#F5C45E]" />
            1-Click Instant Demo Login
          </div>
          <p className="text-xs text-[#8E8B85] mb-3.5 leading-relaxed">
            Quickly test the full end-to-end verification flows without waiting for SMS or email confirmation:
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleQuickDemoSwitch('customer')}
              className="py-3 px-3 rounded-2xl bg-[#1C1A17] hover:bg-[#25231F] border border-[#2E2B25] text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
            >
              <User className="w-4 h-4 text-[#F5C45E]" />
              <span>Customer Mode</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoSwitch('partner')}
              className="py-3 px-3 rounded-2xl bg-[#1C1A17] hover:bg-[#25231F] border border-[#F5C45E]/40 text-xs font-semibold text-[#F5C45E] flex items-center justify-center gap-2 transition-all hover:scale-[1.01] shadow-[0_0_12px_rgba(245,196,94,0.15)]"
            >
              <Briefcase className="w-4 h-4" />
              <span>Inspector Mode</span>
            </button>
          </div>
        </div>

        {/* Main Auth Form Container */}
        <div className="bg-[#141311] border border-[#26241F] rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_25px_60px_rgba(0,0,0,0.95)]">
          {/* Mode switch */}
          <div className="grid grid-cols-2 gap-1 bg-[#1A1815] p-1.5 rounded-2xl border border-[#2B2822] text-xs font-semibold">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] font-bold shadow-sm'
                  : 'text-[#8E8B85] hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('signup')}
              className={`py-2.5 rounded-xl transition-all ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-[#F5C45E] to-[#D99C32] text-[#0B0A09] font-bold shadow-sm'
                  : 'text-[#8E8B85] hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Role select */}
          <div>
            <label className="block text-xs font-semibold text-[#B8B5B0] mb-2">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-2.5 text-xs">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`py-3 px-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
                  role === 'customer'
                    ? 'border-[#F5C45E] bg-[#F5C45E]/15 text-white font-bold shadow-[0_0_15px_rgba(245,196,94,0.15)]'
                    : 'border-[#26241F] text-[#8E8B85] bg-[#1C1A17]'
                }`}
              >
                <User className="w-4 h-4 text-[#F5C45E]" />
                Customer
              </button>
              <button
                type="button"
                onClick={() => setRole('partner')}
                className={`py-3 px-3 rounded-2xl border flex items-center justify-center gap-2 transition-all ${
                  role === 'partner'
                    ? 'border-[#F5C45E] bg-[#F5C45E]/15 text-[#F5C45E] font-bold shadow-[0_0_15px_rgba(245,196,94,0.15)]'
                    : 'border-[#26241F] text-[#8E8B85] bg-[#1C1A17]'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Expert Partner
              </button>
            </div>
          </div>

          {/* Status Message */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-red-950/30 border border-red-800 text-red-300 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-4 rounded-2xl bg-green-950/30 border border-green-800 text-green-300 text-xs flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMessage}</span>
            </div>
          )}

          <form onSubmit={handleSupabaseAuth} className="space-y-4 text-xs">
            {authMode === 'signup' && (
              <>
                <div>
                  <label className="block font-semibold text-[#B8B5B0] mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Arjun Mehta"
                    className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl px-4 py-3 text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#B8B5B0] mb-1.5">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9876543210"
                    className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl px-4 py-3 text-white outline-none"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8E8B85] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl pl-10 pr-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-[#B8B5B0] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8E8B85] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#1C1A17] border border-[#2E2B25] focus:border-[#F5C45E]/70 rounded-2xl pl-10 pr-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-[#F5C45E] via-[#E8B44A] to-[#D99C32] text-[#0B0A09] shadow-[0_0_20px_rgba(245,196,94,0.35)] hover:shadow-[0_0_30px_rgba(245,196,94,0.55)] transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0B0A09] border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>{authMode === 'login' ? 'Sign In with Supabase' : 'Create Supabase Account'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Supabase status note */}
          <div className="pt-2 text-xs text-[#8E8B85] border-t border-[#201E1A]">
            <p className="flex items-center gap-2">
              <Info className="w-4 h-4 text-[#F5C45E]" />
              <span>
                Supabase Status: {isSupabaseReady ? (
                  <strong className="text-[#35A66A]">Connected & Configured</strong>
                ) : (
                  <strong className="text-amber-400">Keys pending in .env (Demo mode active)</strong>
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
