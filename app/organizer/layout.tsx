'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../src/shared/store/authStore';
import OrganizerSidebar from '../../src/view/organizer/OrganizerSidebar';

export default function OrganizerLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const activeRole = useAuthStore((s) => s.activeRole);

  // Protect organizer routes
  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
    
    // If not authenticated, redirect to login
    if (!token) {
      router.push('/login');
      return;
    }
    
    // Only redirect if user is NOT an organizer
    if (activeRole && activeRole !== 'organizer') {
      router.push(activeRole === 'filmmaker' ? '/films' : '/choose-role');
    }
  }, [activeRole, router]);

  return (
    <div className="flex">
      <OrganizerSidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}