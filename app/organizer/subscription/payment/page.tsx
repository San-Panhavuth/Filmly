'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function PaymentContent() {
  const [paymentData, setPaymentData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<'qr' | 'card'>('qr');
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardholderName: ''
  });
  const [processingCard, setProcessingCard] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const transactionId = searchParams.get('transactionId');

  useEffect(() => {
    const savedData = localStorage.getItem('payment_data_' + transactionId);
    const savedMethod = localStorage.getItem('payment_method') as 'qr' | 'card';
    
    if (savedData) {
      setPaymentData(JSON.parse(savedData));
      if (savedMethod) {
        setPaymentMethod(savedMethod);
      }
      setLoading(false);
    } else {
      setError('Payment session not found');
      setLoading(false);
    }
  }, [transactionId]);

  const handleCardPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setProcessingCard(true);
    setError('');

    try {
      // Validate card data
      if (!cardData.cardNumber || !cardData.expiry || !cardData.cvv || !cardData.cardholderName) {
        setError('Please fill in all card details');
        setProcessingCard(false);
        return;
      }

      // In sandbox, simulate payment with test cards
      const isTestCard = [
        '5156839937706777', // MasterCard Success
        '4286090000000206', // Visa Success
        '5156830272561029', // MasterCard Declined
        '4156839937706777'  // Visa Declined
      ].includes(cardData.cardNumber.replace(/\s/g, ''));

      const isDeclinedCard = [
        '5156830272561029',
        '4156839937706777'
      ].includes(cardData.cardNumber.replace(/\s/g, ''));

      if (!isTestCard) {
        setError('Please use a valid test card number');
        setProcessingCard(false);
        return;
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      if (isDeclinedCard) {
        setError('Card declined. Please try a different card.');
        setProcessingCard(false);
        return;
      }

      // For successful test cards, trigger callback
      const response = await fetch(
        `${API_URL}/api/payment-callback?tran_id=${transactionId}&status=0&hash=test`
      );
      const data = await response.json();
      
      if (data.success || data.message === 'Payment successful') {
        alert('✅ Card payment successful!');
        router.push('/organizer/subscription');
      } else {
        setError('Payment processing failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err) {
      setError('Failed to process card payment: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setProcessingCard(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0C4A2A] to-[#065F46] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-5xl mb-4">⏳</div>
          <h2>Loading payment...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0C4A2A] to-[#065F46] flex items-center justify-center p-6">
        <div className="bg-white rounded-lg p-8 max-w-md text-center">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/organizer/subscription')}
            className="px-6 py-2 bg-[#0C4A2A] text-white rounded-lg hover:bg-[#065F46] transition-colors"
          >
            Back to Subscription
          </button>
        </div>
      </div>
    );
  }

  // QR Code Payment
  if (paymentMethod === 'qr' && paymentData?.qrImage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0C4A2A] to-[#065F46] p-6 flex items-center justify-center">
        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">$10.00 USD</h1>
          <p className="text-gray-600 mb-6">Premium Subscription - 30 Days</p>

          <div className="bg-white p-4 rounded-lg inline-block shadow-md mb-6">
            <img
              src={paymentData.qrImage}
              alt="Payment QR Code"
              className="w-64 h-64 object-contain"
            />
          </div>

          <p className="text-sm text-gray-600 mb-6">
            Scan with ABA Mobile App to complete payment
          </p>

          <button
            onClick={() => router.push('/organizer/subscription')}
            className="w-full py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  // Card Payment Form
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0C4A2A] to-[#065F46] p-6 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">$10.00 USD</h1>
        <p className="text-gray-600 text-center mb-6">Premium Subscription - 30 Days</p>

        <form onSubmit={handleCardPayment} className="space-y-4">
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-xs text-yellow-800 font-semibold mb-1">🧪 Sandbox Test Cards:</p>
            <p className="text-xs text-yellow-700">
              Success: 5156 8399 3770 6777 (01/30, CVV 993)<br/>
              Declined: 5156 8302 7256 1029 (04/30, CVV 777)
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={cardData.cardholderName}
              onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
              placeholder="John Doe"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#065F46] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={cardData.cardNumber}
              onChange={(e) => setCardData({ ...cardData, cardNumber: formatCardNumber(e.target.value) })}
              placeholder="1234 5678 9012 3456"
              maxLength={19}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#065F46] focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                value={cardData.expiry}
                onChange={(e) => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                placeholder="MM/YY"
                maxLength={5}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#065F46] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={cardData.cvv}
                onChange={(e) => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').substring(0, 4) })}
                placeholder="123"
                maxLength={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#065F46] focus:border-transparent"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={processingCard}
            className="w-full py-3 bg-[#0C4A2A] text-white rounded-lg font-semibold hover:bg-[#065F46] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {processingCard ? 'Processing...' : 'Pay $10.00'}
          </button>

          <button
            type="button"
            onClick={() => router.push('/organizer/subscription')}
            disabled={processingCard}
            className="w-full py-2 text-gray-600 hover:text-gray-900 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-[#0C4A2A] to-[#065F46] flex items-center justify-center">
        <div className="text-center text-white">
          <div className="text-5xl mb-4">⏳</div>
          <h2>Loading payment...</h2>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  );
}
