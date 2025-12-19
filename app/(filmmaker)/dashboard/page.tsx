// Filmmaker Dashboard Page

'use client';
import React, { useState, useEffect } from 'react';



interface Festival {
  id: string;
  title: string;
  description?: string;
}

export default function FilmmakerDashboardPage() {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchDashboard() {
      setLoading(true);
      setError('');
      try {
        const accessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
        const res = await fetch('/api/films', {
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        });
        if (!res.ok) throw new Error('Failed to load dashboard');
        const data = await res.json();
        setFestivals(data.festivals || []);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Error loading dashboard');
        }
      }
      setLoading(false);
    }
    fetchDashboard();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Filmmaker Dashboard</h1>
      {loading ? (
        <div>Loading…</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : festivals.length === 0 ? (
        <div>No festivals found.</div>
      ) : (
        <ul className="space-y-2">
          {festivals.map((festival: Festival) => (
            <li key={festival.id} className="border p-3 rounded">
              <div className="font-semibold">{festival.title}</div>
              <div className="text-xs text-gray-500">{festival.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

