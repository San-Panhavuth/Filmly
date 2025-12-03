'use client';

import React from 'react';

export default function Brand({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <span
        className="h-6 w-6 bg-[#00441B]"
        style={{
          WebkitMaskImage: 'url(/Icon.svg)',
          maskImage: 'url(/Icon.svg)',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
        }}
        aria-hidden
      />
      <span className="text-sm font-semibold text-[#00441B]">Filmly</span>
    </div>
  );
}