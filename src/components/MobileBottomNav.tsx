'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Compass,
  Layers,
  User,
  LayoutDashboard,
  Search,
  CheckCircle,
  Briefcase,
} from 'lucide-react';
import { getActiveRole } from '@/lib/store';

export const MobileBottomNav: React.FC = () => {
  const pathname = usePathname();
  const [role, setRole] = useState<'customer' | 'partner'>('customer');

  useEffect(() => {
    setRole(getActiveRole());

    const handleRoleChange = () => {
      setRole(getActiveRole());
    };

    window.addEventListener('ezer-role-changed', handleRoleChange);
    return () => window.removeEventListener('ezer-role-changed', handleRoleChange);
  }, [pathname]);

  const customerItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Explore', href: '/marketplace', icon: Compass },
    { label: 'Requests', href: '/dashboard', icon: Layers },
    { label: 'Profile', href: '/login', icon: User },
  ];

  const partnerItems = [
    { label: 'Dashboard', href: '/inspector?tab=overview', icon: LayoutDashboard },
    { label: 'Jobs', href: '/inspector?tab=available', icon: Search },
    { label: 'My Jobs', href: '/inspector?tab=myjobs', icon: CheckCircle },
    { label: 'Profile', href: '/inspector?tab=profile', icon: Briefcase },
  ];

  const items = role === 'partner' ? partnerItems : customerItems;

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
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0B0A09]/95 backdrop-blur-xl border-t border-[#23211D] px-2 py-2 safe-bottom shadow-[0_-10px_30px_rgba(0,0,0,0.9)]">
      <div className="grid grid-cols-4 items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition-all ${
                active ? 'text-[#F5C45E]' : 'text-[#8E8B85] hover:text-[#B8B5B0]'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  active ? 'bg-[#F5C45E]/15 shadow-[0_0_12px_rgba(245,196,94,0.35)]' : ''
                }`}
              >
                <Icon className={`w-5 h-5 ${active ? 'text-[#F5C45E]' : 'text-[#8E8B85]'}`} />
              </div>
              <span className={`text-[10px] mt-0.5 ${active ? 'font-bold text-[#F5C45E]' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
