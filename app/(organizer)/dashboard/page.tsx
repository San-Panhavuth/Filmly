'use client';

import React from 'react';
import { useAuthStore } from '../../../src/shared/store/authStore';

export default function DashboardPage() {
  const role = useAuthStore((s) => s.role);
  const email = useAuthStore((s) => s.userEmail);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-[#00441B]">Dashboard</h1>
      <p className="mt-2 text-sm text-[#4D4D4D]">
        {role === 'organizer' ? (
          <>Welcome Organizer{email ? ` (${email})` : ''}.</>
        ) : (
          <>You reached Dashboard, but you are {role ?? 'not signed in'}.</>
        )}
      </p>
    </div>
  );
}