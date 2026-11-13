'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  MessageSquare,
  Plus,
  FileText,
  User,
  ShieldCheck,
  Search,
  CheckCircle,
  LayoutDashboard,
  Briefcase,
} from 'lucide-react';
import { getActiveRole } from '@/lib/store';
import { SubmitListingModal } from './SubmitListingModal';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const [role, setRole] = useState<'customer' | 'partner'>('customer');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    setRole(getActiveRole());

    const handleRoleChange = () => {
      setRole(getActiveRole());
    };

    const handleOpenModal = () => {
      setIsSubmitModalOpen(true);
    };

    window.addEventListener('ezer-role-changed', handleRoleChange);
    window.addEventListener('open-verify-modal', handleOpenModal);

    return () => {
      window.removeEventListener('ezer-role-changed', handleRoleChange);
      window.removeEventListener('open-verify-modal', handleOpenModal);
    };
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href.startsWith('/inspector?tab=')) {
      const tabParam = href.split('tab=')[1];
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        return pathname === '/inspector' && urlParams.get('tab') === tabParam;
      }
      return pathname === '/inspector';
    }
    if (href !== '/' && pathname.startsWith(href.split('?')[0])) return true;
    return false;
  };

  return (
    <>
      {/* Native Mobile Solid Bottom Navigation matching reference layout */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#12110F] border-t border-[#26241F] px-3 pt-2 pb-3 safe-bottom shadow-[0_-15px_35px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {/* Tab 1: Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center flex-1 transition-all ${
              isActive('/') ? 'text-[#F5C45E]' : 'text-[#8E8B85] hover:text-white'
            }`}
          >
            <Home className={`w-5 h-5 ${isActive('/') ? 'text-[#F5C45E]' : 'text-[#8E8B85]'}`} />
            <span className={`text-[10px] mt-1 ${isActive('/') ? 'font-bold text-[#F5C45E]' : 'font-medium'}`}>
              Home
            </span>
          </Link>

          {/* Tab 2: Requests / Chats */}
          <Link
            href={role === 'partner' ? '/inspector?tab=available' : '/dashboard'}
            className={`flex flex-col items-center justify-center flex-1 transition-all ${
              isActive(role === 'partner' ? '/inspector?tab=available' : '/dashboard')
                ? 'text-[#F5C45E]'
                : 'text-[#8E8B85] hover:text-white'
            }`}
          >
            <MessageSquare
              className={`w-5 h-5 ${
                isActive(role === 'partner' ? '/inspector?tab=available' : '/dashboard')
                  ? 'text-[#F5C45E]'
                  : 'text-[#8E8B85]'
              }`}
            />
            <span
              className={`text-[10px] mt-1 ${
                isActive(role === 'partner' ? '/inspector?tab=available' : '/dashboard')
                  ? 'font-bold text-[#F5C45E]'
                  : 'font-medium'
              }`}
            >
              {role === 'partner' ? 'Jobs' : 'Requests'}
            </span>
          </Link>

          {/* Tab 3: Center Elevated Floating Action Button (Verify / Inspect) */}
          <div className="flex flex-col items-center justify-center flex-1 -mt-6">
            <button
              type="button"
              onClick={() => setIsSubmitModalOpen(true)}
              className="relative group p-1 focus:outline-none"
              aria-label="Submit listing for verification"
            >
              <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-[#D99C32] via-[#F5C45E] to-[#FFF1BF] p-[2.5px] shadow-[0_0_20px_rgba(245,196,94,0.45)] group-hover:scale-105 active:scale-95 transition-all">
                <div className="w-full h-full rounded-full bg-[#141311] flex items-center justify-center border border-[#3A352B]">
                  <Plus className="w-6 h-6 text-[#F5C45E] stroke-[3]" />
                </div>
              </div>
            </button>
            <span className="text-[10px] font-extrabold text-[#F5C45E] mt-0.5 tracking-tight">
              Verify
            </span>
          </div>

          {/* Tab 4: Reports / My Jobs */}
          <Link
            href={role === 'partner' ? '/inspector?tab=myjobs' : '/dashboard'}
            className={`flex flex-col items-center justify-center flex-1 transition-all ${
              isActive(role === 'partner' ? '/inspector?tab=myjobs' : '/dashboard')
                ? 'text-[#F5C45E]'
                : 'text-[#8E8B85] hover:text-white'
            }`}
          >
            <FileText
              className={`w-5 h-5 ${
                isActive(role === 'partner' ? '/inspector?tab=myjobs' : '/dashboard')
                  ? 'text-[#F5C45E]'
                  : 'text-[#8E8B85]'
              }`}
            />
            <span
              className={`text-[10px] mt-1 ${
                isActive(role === 'partner' ? '/inspector?tab=myjobs' : '/dashboard')
                  ? 'font-bold text-[#F5C45E]'
                  : 'font-medium'
              }`}
            >
              {role === 'partner' ? 'My Jobs' : 'Reports'}
            </span>
          </Link>

          {/* Tab 5: Account / Profile */}
          <Link
            href={role === 'partner' ? '/inspector?tab=profile' : '/login'}
            className={`flex flex-col items-center justify-center flex-1 transition-all ${
              isActive(role === 'partner' ? '/inspector?tab=profile' : '/login')
                ? 'text-[#F5C45E]'
                : 'text-[#8E8B85] hover:text-white'
            }`}
          >
            <User
              className={`w-5 h-5 ${
                isActive(role === 'partner' ? '/inspector?tab=profile' : '/login')
                  ? 'text-[#F5C45E]'
                  : 'text-[#8E8B85]'
              }`}
            />
            <span
              className={`text-[10px] mt-1 ${
                isActive(role === 'partner' ? '/inspector?tab=profile' : '/login')
                  ? 'font-bold text-[#F5C45E]'
                  : 'font-medium'
              }`}
            >
              Account
            </span>
          </Link>
        </div>
      </nav>

      {/* Global verification modal accessible from the floating center (+) button */}
      <SubmitListingModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        initialMode="url"
        onSuccess={() => {
          setIsSubmitModalOpen(false);
          if (typeof window !== 'undefined') {
            window.location.href = '/dashboard';
          }
        }}
      />
    </>
  );
};
