import React from 'react';
import { useAuthStore } from '../../../shared/store/authStore';

export default function HeaderSection() {
  const email = useAuthStore((s) => s.userEmail);
  const initials =
    (email || 'John Doe')
      .split('@')[0]
      .split(' ')
      .map((p) => p[0]?.toUpperCase())
      .slice(0, 2)
      .join('') || 'JD';

  return (
    <section className="rounded-xl border border-[#EDEDED] bg-white px-4 py-4 shadow-sm md:px-6 md:py-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#00441B] text-white text-sm font-semibold">
            {initials}
          </div>
          <div>
            <div className="text-lg font-semibold text-[#00441B]">
              Welcome back, {email || 'John Doe'}!
            </div>
            <div className="text-sm text-[#4D4D4D]">
              Ready to submit your next masterpiece?
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => (window.location.href = '/films/new')}
            className="inline-flex items-center gap-2 rounded-md bg-[#00441B] px-3 py-2 text-sm font-medium text-white hover:bg-[#2F623F]"
          >
            <PlusIcon className="h-4 w-4 text-white" />
            Add Film
          </button>
          <button
            onClick={() => (window.location.href = '/billing')}
            className="inline-flex items-center gap-2 rounded-md border border-[#EDEDED] bg-white px-3 py-2 text-sm font-medium text-[#1A1A1A] hover:bg-[#F6F6F6]"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    </section>
  );
}

function PlusIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}