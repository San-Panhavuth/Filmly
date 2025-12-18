'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SelectPaymentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePaymentMethod = async (method: 'qr' | 'card') => {
    setLoading(true);
    setError('');

    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        setError('Please login to continue');
        setLoading(false);
        return;
      }

      // Get user profile
      const profileResponse = await fetch(`${API_URL}/api/user-profile`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      if (!profileResponse.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const profileData = await profileResponse.json();
      const userProfile = profileData.profile;

      // Create checkout session
      const response = await fetch(`${API_URL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 10.00,
          currency: 'USD',
          firstname: userProfile.username.split(' ')[0] || userProfile.username,
          lastname: userProfile.username.split(' ')[1] || 'User',
          email: userProfile.email,
          phone: '0123456789',
          items: [
            {
              name: 'Filmly Premium Subscription - 30 Days',
              quantity: 1,
              price: 10.00,
            },
          ],
          payment_option: method === 'card' ? 'cards' : 'abapay',
          return_params: JSON.stringify({ userUuid: userProfile.uuid }),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout');
      }

      // Store payment data
      localStorage.setItem('pending_transaction', data.transactionId);
      localStorage.setItem('payment_data_' + data.transactionId, JSON.stringify(data));
      localStorage.setItem('payment_method', method);

      // Redirect to payment page
      router.push(`/films/billing/payment?transactionId=${data.transactionId}&method=${method}`);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-10 border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          Choose Payment Method
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Premium Subscription - $10.00 USD
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => handlePaymentMethod('qr')}
            disabled={loading}
            className="w-full p-6 border border-gray-200 rounded-lg hover:border-green-700 hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4"
          >
            <span className="text-3xl">📱</span>
            <span className="flex-1 text-left">
              <span className="block text-lg font-semibold text-gray-900">QR Code</span>
              <span className="block text-sm text-gray-600">Scan with ABA mobile app</span>
            </span>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => handlePaymentMethod('card')}
            disabled={loading}
            className="w-full p-6 border border-gray-200 rounded-lg hover:border-green-700 hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-4"
          >
            <span className="text-3xl">💳</span>
            <span className="flex-1 text-left">
              <span className="block text-lg font-semibold text-gray-900">Credit/Debit Card</span>
              <span className="block text-sm text-gray-600">Pay with your card</span>
            </span>
            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {loading && (
          <div className="mt-6 text-center text-gray-600">
            <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
            <p className="mt-2 text-sm">Processing...</p>
          </div>
        )}

        <button
          onClick={() => router.push('/films/billing')}
          disabled={loading}
          className="w-full mt-6 py-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
