import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-12 text-center">
      <h1 className="text-[32px] font-semibold leading-tight text-[#00441B]">
        Connect Your Films with the Perfect Festivals
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[#4D4D4D]">
        Filmly uses AI to match your films with the most compatible film festivals worldwide.
        Submit smarter, track effortlessly, and maximize your chances of acceptance.
      </p>

      {/* Buttons above the image */}
      <div className="mt-6 flex justify-center gap-3">
        <Link
          href="/signup"
          className="inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium text-white bg-[#00441B] border border-[#00441B] hover:bg-[#0A5B28] transition"
        >
          Start Submitting for Free
        </Link>
        <Link
          href="/login"
          className="inline-flex h-10 items-center justify-center rounded-md px-5 text-sm font-medium text-[#00441B] bg-white border border-[#00441B] hover:bg-[#00441B] hover:text-white transition"
        >
          Sign in
        </Link>
      </div>

      {/* Theater image below the buttons */}
      <div className="mt-6 flex justify-center">
        <Image
          src="/theater.svg"
          alt="Theater illustration"
          width={720}
          height={360}
          className="w-full max-w-3xl h-auto"
          priority
        />
      </div>
    </section>
  );
}