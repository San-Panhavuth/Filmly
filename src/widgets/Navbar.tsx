'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center px-6 py-3">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#00441B]">
          <span
            className="inline-block h-6 w-6 bg-black active:bg-[#0A5B28] transition-colors"
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
          Filmly
        </Link>

        {/* Nav + auth grouped tightly */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <Link href="#features" className="text-sm text-[#00441B] hover:underline">Features</Link>
          <Link href="#how" className="text-sm text-[#00441B] hover:underline">How It Works</Link>
          <Link href="#pricing" className="text-sm text-[#00441B] hover:underline">Pricing</Link>
          <Link href="#festivals" className="text-sm text-[#00441B] hover:underline">Festivals</Link>
          <Link
            href="/login"
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-[#00441B] border border-[#00441B] hover:bg-[#00441B] hover:text-white transition"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-white bg-[#00441B] border border-[#00441B] hover:bg-[#0A5B28] transition"
          >
            Get Started
          </Link>
        </div>

        <button
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#EDEDED] ml-auto"
          aria-label="Toggle menu"
          onClick={() => setOpen(o => !o)}
        >
          <span className="block h-0.5 w-4 bg-[#00441B] mb-1" />
          <span className="block h-0.5 w-4 bg-[#00441B] mb-1" />
          <span className="block h-0.5 w-4 bg-[#00441B]" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-[#EDEDED] px-6 py-3">
          <nav className="flex flex-col gap-2">
            <Link href="#features" className="text-sm text-[#00441B]">Features</Link>
            <Link href="#how" className="text-sm text-[#00441B]">How It Works</Link>
            <Link href="#pricing" className="text-sm text-[#00441B]">Pricing</Link>
            <Link href="#festivals" className="text-sm text-[#00441B]">Festivals</Link>
            <div className="mt-3 flex gap-2">
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-[#00441B] border border-[#00441B]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium text-white bg-[#00441B] border border-[#00441B]"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}