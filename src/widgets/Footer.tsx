import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#00441B] text-sm text-white">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span
              className="inline-block h-6 w-6 bg-white"
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
            <span>Filmly</span>
          </Link>
          <p className="mt-3 leading-relaxed text-[#D6D6D6]">
            Connecting filmmakers with festivals worldwide through AI‑powered matching.
          </p>
        </div>

        <div>
          <h4 className="font-semibold">Product</h4>
          <ul className="mt-3 space-y-1">
            <li><Link className="text-[#D6D6D6] hover:text-white" href="#features">Features</Link></li>
            <li><Link className="text-[#D6D6D6] hover:text-white" href="#pricing">Pricing</Link></li>
            <li><Link className="text-[#D6D6D6] hover:text-white" href="#faq">FAQ</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Company</h4>
          <ul className="mt-3 space-y-1">
            <li><Link className="text-[#D6D6D6] hover:text-white" href="#about">About</Link></li>
            <li><Link className="text-[#D6D6D6] hover:text-white" href="#blog">Blog</Link></li>
            <li><Link className="text-[#D6D6D6] hover:text-white" href="#contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Legal</h4>
          <ul className="mt-3 space-y-1">
            <li><Link className="text-[#D6D6D6] hover:text-white" href="#privacy">Privacy Policy</Link></li>
            <li><Link className="text-[#D6D6D6] hover:text-white" href="#terms">Terms of Service</Link></li>
          </ul>
        </div>
      </div>

      {/* Centered copyright, removed extra links */}
      <div className="border-t border-[#0A5B28]">
        <div className="mx-auto max-w-6xl px-6 py-5 text-center text-xs text-[#D6D6D6]">
          © {new Date().getFullYear()} Filmly. All rights reserved.
        </div>
      </div>
    </footer>
  );
}