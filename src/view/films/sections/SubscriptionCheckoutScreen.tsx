'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SubscriptionCheckoutScreen({ billing }: { billing: 'monthly' | 'yearly' }) {
  const [card, setCard] = useState('');
  const [email, setEmail] = useState('');
  const [exp, setExp] = useState(''); // MM/YY
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('');
  const [zip, setZip] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | null>>({});

  const price = billing === 'monthly' ? '9.99' : '96.00';

  function validateAll() {
    const e: Record<string, string | null> = {};

    const digits = card.replace(/\s+/g, '');
    if (!/^\d{13,19}$/.test(digits)) {
      e.card = 'Enter a valid card number (13-19 digits)';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      e.email = 'Enter a valid email';
    }

    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(exp)) {
      e.exp = 'Expiration must be MM/YY';
    } else {
      const [mm, yy] = exp.split('/').map((s) => parseInt(s, 10));
      const year = 2000 + yy;
      const lastDay = new Date(year, mm, 0, 23, 59, 59, 999);
      if (lastDay < new Date()) e.exp = 'Card expired';
    }

    if (!/^\d{3,4}$/.test(cvc)) {
      e.cvc = 'Enter CVC (3-4 digits)';
    }

    if (!country) e.country = 'Select country';
    if (!zip || zip.trim().length < 2) e.zip = 'Enter zip/postal code';

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    if (!validateAll()) return;

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 2200);
  }

  const [nextBillingDate, setNextBillingDate] = useState<string>("");

  React.useEffect(() => {
    const now = Date.now();
    const msToAdd = (billing === 'monthly' ? 30 : 365) * 24 * 3600 * 1000;
    const date = new Date(now + msToAdd).toLocaleDateString();
    setNextBillingDate(date);
  }, [billing]);

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  if (success) {
    return (
      <div className="p-6 w-full min-h-[80vh] flex items-start justify-center">
        <div className="w-full max-w-md bg-white rounded shadow p-6 text-center">
          <Image src="/Icon.svg" alt="Filmly logo" width={32} height={32} className="w-8 h-8 mx-auto mb-3" />
          <div className="text-lg font-semibold text-[#0C0C0C]">You&apos;re Now Pro! 🎉</div>
          <p className="text-sm text-gray-600 mt-2">Your Filmly Pro features are now active.</p>

          <div className="bg-gray-100 rounded mt-6 text-left p-4">
            <div className="text-sm font-semibold text-[#065F46] mb-2">Payment Summary</div>
            <div className="text-xs text-gray-700">Plan: Filmly Pro ({billing === 'monthly' ? 'Monthly' : 'Yearly'})</div>
            <div className="text-xs text-gray-700">Price: ${price}</div>
            <div className="text-xs text-gray-700">Status: Paid successfully</div>
            <div className="text-xs text-gray-700">Next Billing Date: {nextBillingDate}</div>
            <div className="text-xs text-gray-700">
              Payment Method: •••• {card.replace(/\s+/g, '').slice(-4) || '1234'}
            </div>
          </div>

          <div className="text-xs text-gray-400 mt-6">
            © {currentYear} Filmly. All rights reserved.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full flex items-start justify-center min-h-[80vh]">
      <div className="w-full max-w-md bg-white rounded shadow p-6">
        <div className="text-center mb-6">
          <Image
            src="/Icon.svg"
            alt="Filmly logo"
            width={40}
            height={40}
            className="inline-flex items-center justify-center w-10 h-10 rounded bg-green-50 object-contain p-1 mx-auto"
          />
          <h3 className="text-sm font-medium text-[#065F46] mt-3">
            Filmly Pro Subscription
          </h3>
          <p className="text-xs text-gray-500 mt-2">
            Take your filmmaking journey further with advanced tools and higher limits.
          </p>
        </div>

        <p className="text-sm font-medium text-gray-700 mb-3">
          Your payment is encrypted. We never store card information.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs text-gray-700 mb-1">Card Number</label>
            <div className="flex items-center gap-3">
              <input
                value={card}
                onChange={(e) => setCard(e.target.value)}
                placeholder="1234 5678 7654 321"
                className="flex-1 rounded border px-3 py-2 text-sm"
              />
              <div className="flex gap-2">
                <Image src="/Mastercard.svg" alt="Mastercard" width={24} height={24} />
                <Image src="/Visa.svg" alt="Visa" width={24} height={24} />
                <Image src="/Amex.svg" alt="Amex" width={24} height={24} />
              </div>
            </div>
            {errors.card && <div className="text-xs text-red-600 mt-1">{errors.card}</div>}
          </div>

          <div>
            <label className="block text-xs text-gray-700 mb-1">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded border px-3 py-2 text-sm"
            />
            {errors.email && <div className="text-xs text-red-600 mt-1">{errors.email}</div>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-700 mb-1">Expiration</label>
              <input
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                placeholder="MM/YY"
                className="w-full rounded border px-3 py-2 text-sm"
              />
              {errors.exp && <div className="text-xs text-red-600 mt-1">{errors.exp}</div>}
            </div>

            <div>
              <label className="block text-xs text-gray-700 mb-1">Secure Code</label>
              <input
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                placeholder="CVC"
                className="w-full rounded border px-3 py-2 text-sm"
              />
              {errors.cvc && <div className="text-xs text-red-600 mt-1">{errors.cvc}</div>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-gray-700 mb-1">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
              >
                <option value="">Select your country</option>
                <option>United States</option>
                <option>United Kingdom</option>
                <option>Canada</option>
              </select>
              {errors.country && <div className="text-xs text-red-600 mt-1">{errors.country}</div>}
            </div>

            <div>
              <label className="block text-xs text-gray-700 mb-1">Zip Code</label>
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="1234"
                className="w-full rounded border px-3 py-2 text-sm"
              />
              {errors.zip && <div className="text-xs text-red-600 mt-1">{errors.zip}</div>}
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded bg-[#0C4A2A] text-white py-2 text-sm disabled:opacity-60"
            >
              {submitting ? 'Processing…' : `Pay $${price} for Pro Plan Now`}
            </button>
          </div>
        </form>

        <div className="text-center text-xs text-gray-500 mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#065F46]">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
