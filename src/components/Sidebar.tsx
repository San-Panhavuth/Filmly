'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname() ?? '';

  // detect the Add Film route (handles grouped routes like "/(filmmaker)/films/add")
  const isAddFilmRoute = pathname.includes('/films/add') || (pathname.endsWith('/add') && pathname.includes('/films'));

  const nav = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/submissions', label: 'My Submission' },
    { href: '/films', label: 'Project and AI matching' },
    { href: '/festival', label: 'Festival' },
    { href: '/subscription', label: 'Subscription' },
  ];

  return (
    <nav className="space-y-2">
      {nav.map((n) => {
        // when Add Film is open: only the /films item should be active
        const isActive = isAddFilmRoute ? (n.href === '/films') : (pathname === n.href || pathname.startsWith(n.href + '/'));

        return (
          <Link
            key={n.href}
            href={n.href}
            className={`flex items-center gap-3 px-3 py-2 rounded ${isActive ? 'bg-[#00441B] text-white' : 'text-[#2D2D2D] hover:bg-gray-100'}`}
          >
            {n.label}
          </Link>
        );
      })}
    </nav>
  );
}