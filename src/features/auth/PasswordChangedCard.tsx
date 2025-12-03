'use client';

import { useRouter, useParams } from 'next/navigation';
import Brand from '../../components/Brand';

export default function PasswordChangedCard() {
  const router = useRouter();
  const params = useParams<{ locale?: string }>();
  const locale = typeof params?.locale === 'string' ? params.locale : undefined;

  return (
    <div className="mx-auto w-full max-w-md rounded-[10px] border border-[#EDEDED] bg-white p-6 shadow-sm">
      <Brand />

      <p className="mt-6 text-center text-sm font-semibold text-[#00441B]">
        Your password has been changed.
      </p>
      <p className="mt-1 text-center text-xs text-[#4D4D4D]">
        Please log in using your new password.
      </p>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => router.push(locale ? `/${locale}/login` : '/login')}
          className="rounded-md border border-[#00441B] bg-[#00441B] px-4 py-2 text-xs font-medium text-white hover:bg-[#0A5B28]"
        >
          Back to Login
        </button>
      </div>

      <p className="mt-6 text-center text-[10px] text-[#A0A0A0]">
        © {new Date().getFullYear()} Filmly. All rights reserved.
      </p>
    </div>
  );
}