'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '../../src/shared/store/authStore';

// Assuming these icons are defined in this file or imported from another location
// Since they are defined at the bottom, we'll keep them there.
// For the purpose of the fix, we just need to make sure they are referenced correctly.

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

// Icons are assumed to be available from the component definitions below.
// Add them here for clarity in the file's scope (or import them if separate).
// They are available because they are defined later in the same file.

const nav: NavItem[] = [
  { href: '/films', label: 'Dashboard', icon: DashboardIcon },
  { href: '/films/submissions', label: 'My Submission', icon: PlusCircleIcon },
  { href: '/films/matching', label: 'Project and Ai matching', icon: TargetIcon },
  { href: '/festival', label: 'Festival', icon: DatabaseIcon },
  { href: '/billing', label: 'Subscription', icon: CardIcon },
];

export default function FilmmakerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() ?? '';
  const role = useAuthStore((s) => s.role);
  const email = useAuthStore((s) => s.userEmail);
  const [collapsed, setCollapsed] = useState(false);

  // choose the nav item with the longest matching prefix so nested routes activate the most specific item
  const activeHref = nav.reduce((best, item) => {
    if (!pathname) return best;
    if (pathname === item.href) return item.href;
    if (pathname.startsWith(item.href) && item.href.length > (best?.length ?? 0)) return item.href;
    return best;
  }, '');

  return (
    // Root container fills the viewport and uses flex row layout
    <div className="h-screen bg-white text-[#0C0C0C] flex">
      {/* Sticky sidebar */}
      <aside
        className={`sticky top-0 h-screen border-r border-[#EDEDED] flex flex-col overflow-y-auto transition-[width] duration-200 ${
          collapsed ? 'w-[72px]' : 'w-[256px]'
        }`}
      >
        {/* Sidebar header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-[#00441B]" />
            {!collapsed && <span className="text-sm font-semibold text-[#00441B]">Filmly</span>}
          </div>
          <button
            aria-label="Toggle sidebar"
            className="rounded-md p-2 hover:bg-[#F6F6F6]"
            onClick={() => setCollapsed((c) => !c)}
          >
            <HamburgerIcon className="h-4 w-4 text-[#1A1A1A]" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="mt-1">
          {nav.map((item) => {
            const Icon = item.icon;
            const active = item.href === activeHref;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 transition-colors text-sm ${
                  active ? 'bg-[#2F623F] text-white' : 'text-[#1A1A1A] hover:bg-[#F4F7F5]'
                } ${collapsed ? 'justify-center' : ''}`}
              >
                <Icon className={`h-5 w-5 ${active ? 'text-white' : 'text-[#2F623F]'}`} />
                {!collapsed && <span className="font-medium">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar profile (at the bottom of nav) */}
        <div className="mt-auto px-3 py-4 border-t border-[#EDEDED]">
          <div
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00441B] text-white text-xs font-semibold">
              {email ? email.substring(0, 2).toUpperCase() : 'FM'}
            </div>
            {!collapsed && (
              <div className="leading-tight">
                <div className="text-sm font-semibold text-[#0C0C0C]">
                  {email || 'John Doe'}
                </div>
                <div className="text-xs text-[#6F6F6F]">{role || 'Filmmaker'}</div>
              </div>
            )}
          </div>
          {!collapsed && (
            <button
              onClick={() => {
                useAuthStore.getState().signOut();
                window.location.href = '/login';
              }}
              className="mt-3 flex items-center gap-2 rounded-md border border-[#EDEDED] px-3 py-2 text-sm text-[#1A1A1A] hover:bg-[#F6F6F6] w-full"
            >
              <LogoutIcon className="h-4 w-4 text-[#2F623F]" />
              Logout
            </button>
          )}
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>

      <footer className="mt-auto border-t border-[#EDEDED] hidden" /> 
    </div>
  );
}

/* Icons (inline SVG) */
function DashboardIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="3" width="8" height="5" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13" y="10" width="8" height="11" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function PlusCircleIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TargetIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    </svg>
  );
}

function DatabaseIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <ellipse cx="12" cy="6" rx="7" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 6v6c0 1.93 3.134 3.5 7 3.5s7-1.57 7-3.5V6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 12v6c0 1.93 3.134 3.5 7 3.5s7-1.57 7-3.5v-6" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 12v6c0 1.93 3.134 3.5 7 3.5s7-1.57 7-3.5v-6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function CardIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3" y="8" width="18" height="3" fill="currentColor" />
      <rect x="7" y="13" width="6" height="2" rx="1" fill="currentColor" />
    </svg>
  );
}

function LogoutIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M14 7V5a2 2 0 0 0-2-2H6A2 2 0 0 0 4 5v14a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 12h9m0 0-3-3m3 3-3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function HamburgerIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}