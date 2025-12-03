'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation';
import { useState } from 'react';
import Brand from '../../components/Brand';

export default function ResetPasswordForm() {
  const router = useRouter();
  const params = useSearchParams();
  const routeParams = useParams<{ locale?: string }>();
  const locale = typeof routeParams?.locale === 'string' ? routeParams.locale : undefined;

  const email = params.get('email') ?? '';
  const [code, setCode] = useState('');
  const [pw1, setPw1] = useState('');
  const [pw2, setPw2] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!code || !pw1 || !pw2) return setErr('All fields required.');
    if (pw1 !== pw2) return setErr('Passwords do not match.');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const target = '/password-changed';
      router.push(locale ? `/${locale}${target}` : target);
    }, 800);
  }

  return (
    <div className="mx-auto w-full max-w-md rounded-[10px] border border-[#EDEDED] bg-white p-6 shadow-sm">
      <Brand />

      <h1 className="mt-4 text-center text-sm font-semibold text-[#00441B]">
        Enter New Password
      </h1>
      <p className="mt-2 text-center text-xs text-[#4D4D4D]">
        We have sent a password reset code to your email{email ? ` (${email})` : ''}.
        Enter it below to reset your password.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-3">
        <div>
          <label className="block text-xs text-[#4D4D4D]">Code</label>
          <input
            className="mt-1 w-full rounded-md border border-[#EDEDED] px-3 py-2 text-xs"
            placeholder="1234"
            value={code}
            onChange={e => setCode(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs text-[#4D4D4D]">New Password</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-[#EDEDED] px-3 py-2 text-xs"
            value={pw1}
            onChange={e => setPw1(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-xs text-[#4D4D4D]">Enter new password again</label>
          <input
            type="password"
            className="mt-1 w-full rounded-md border border-[#EDEDED] px-3 py-2 text-xs"
            value={pw2}
            onChange={e => setPw2(e.target.value)}
            required
          />
        </div>

        {err && <p className="text-[11px] text-red-600">{err}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-md bg-[#00441B] px-3 py-2 text-xs font-medium text-white hover:bg-[#0A5B28] disabled:opacity-50"
        >
          {loading ? 'Updating…' : 'Reset Password'}
        </button>

        <button
          type="button"
          onClick={() => router.push(locale ? `/${locale}/forgot-password` : '/forgot-password')}
          className="w-full rounded-md border border-[#EDEDED] bg-[#F5F5F5] px-3 py-2 text-xs text-[#4D4D4D] hover:bg-[#eaeaea]"
        >
          Back
        </button>
      </form>

      <p className="mt-6 text-center text-[10px] text-[#A0A0A0]">
        © {new Date().getFullYear()} Filmly. All rights reserved.
      </p>
    </div>
  );
}