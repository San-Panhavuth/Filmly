'use client';

import React, { useState } from 'react';

const GENRES = [
  'Comedy',
  'Romance',
  'Drama',
  'Educational',
  'Documentary',
  'War',
  'Fantasy',
  'Action',
  'Traditional',
  'Western',
  'Horror',
  'Animation',
  'Thriller',
  'Adventure',
  'Science Fiction',
  'Musical',
];

export default function AddFilmForm() {
  const [title, setTitle] = useState('');
  const [country, setCountry] = useState('');
  const [duration, setDuration] = useState<number | ''>('');
  const [genre, setGenre] = useState('');
  const [language, setLanguage] = useState('');
  const [theme, setTheme] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [filmFile, setFilmFile] = useState<File | null>(null);
  const [subFile, setSubFile] = useState<File | null>(null);
  const [pressFile, setPressFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>, setter: (f: File | null) => void) {
    setter(e.target.files?.[0] ?? null);
  }

  function saveDraft() {
    const draft = { title, country, duration, genre, language, theme, synopsis, savedAt: new Date().toISOString() };
    localStorage.setItem('filmDraft', JSON.stringify(draft));
    alert('Draft saved locally');
  }

  // changed: mock AI submit - requires at least one input, shows spinner, saves mock data and navigates
  function submitToAi() {
    const hasAny =
      Boolean(title) ||
      Boolean(country) ||
      duration !== '' ||
      Boolean(genre) ||
      Boolean(language) ||
      Boolean(theme) ||
      Boolean(synopsis) ||
      Boolean(filmFile) ||
      Boolean(subFile) ||
      Boolean(pressFile);

    if (!hasAny) {
      alert('Please enter at least one field (title, theme, file, etc.) before submitting to AI.');
      return;
    }

    if (loading) return;
    setLoading(true);

    const delay = 2000 + Math.floor(Math.random() * 3000); // 2-5s
    setTimeout(() => {
      // create temporary film id and store film data in localStorage
      const id = `tmp-${Date.now()}`;
      const film = {
        id,
        title: title || `Untitled ${id}`,
        country,
        duration,
        genre,
        language,
        theme,
        synopsis,
        createdAt: new Date().toISOString(),
      };

      const stored = JSON.parse(localStorage.getItem('mock_films') || '[]');
      stored.push(film);
      localStorage.setItem('mock_films', JSON.stringify(stored));

      // create simple mock matches for the new film
      const mockMatches = Array.from({ length: 8 }).map((_, i) => ({
        id: `${id}-m${i + 1}`,
        festival: `Mock Festival ${i + 1}`,
        score: Math.max(60, Math.floor(90 - i * 3 + Math.random() * 10)),
        type: i % 2 === 0 ? 'Feature Film' : 'Short Film',
        country: ['USA', 'UK', 'France', 'Italy'][i % 4],
        deadline: `Dec ${10 + i}, 2025`,
      }));
      localStorage.setItem(`mock_matches_${id}`, JSON.stringify(mockMatches));

      setLoading(false);

      // navigate to the AI matching results screen with filmId/title in query
      const params = new URLSearchParams();
      params.set('filmId', id);
      params.set('title', film.title);
      window.location.href = `/films/matching?${params.toString()}`;
    }, delay);
  }

  function cancel() {
    if (confirm('Discard changes?')) {
      if (typeof window !== 'undefined') window.history.back();
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 relative">
      <h1 className="text-2xl font-semibold text-[#0B5A2E] mb-2">Add New Film</h1>
      <p className="text-sm text-[#6B736F] mb-6">Upload your film and get AI-powered festival recommendations</p>

      <section className="rounded-lg border border-[#E6E6E6] bg-white p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-medium text-[#0B5A2E] mb-4">Film Details</h2>

        {/* Title + Country row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-[#333]">Film Title *</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter film title"
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm bg-[#FBFBFB]"
            />
          </div>

          <div>
            <label className="text-sm text-[#333]">Production Country *</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm bg-[#FBFBFB]"
            >
              <option value="">Select Country</option>
              <option>Thailand</option>
              <option>USA</option>
              <option>France</option>
              <option>India</option>
            </select>
          </div>
        </div>

        {/* Single-row: Duration | Genre | Language */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-sm text-[#333]">Duration (minutes) *</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value === '' ? '' : Number(e.target.value))}
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm bg-[#FBFBFB]"
              placeholder="90"
            />
          </div>

          <div>
            <label className="text-sm text-[#333]">Genre *</label>
            <select
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm bg-[#FBFBFB]"
            >
              <option value="">Select genre</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-[#333]">Language *</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-2 w-full rounded-md border px-3 py-2 text-sm bg-[#FBFBFB']"
            >
              <option value="">Select language</option>
              <option>English</option>
              <option>Thai</option>
              <option>French</option>
              <option>Spanish</option>
            </select>
          </div>
        </div>

        {/* Theme larger input */}
        <div className="mb-4">
          <label className="text-sm text-[#333]">Theme</label>
          <textarea
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            rows={4}
            placeholder="Brief description of your film... (2–3 sentences)"
            className="mt-2 w-full rounded-md border px-3 py-3 text-sm bg-[#FBFBFB] resize-y min-h-[110px]"
          />
        </div>

        {/* Synopsis full width */}
        <div>
          <label className="text-sm text-[#333]">Synopsis</label>
          <textarea
            value={synopsis}
            onChange={(e) => setSynopsis(e.target.value)}
            rows={6}
            placeholder="Brief description of your film... (eg: Lina, a shy 16-year-old girl who loves dancing...)"
            className="mt-2 w-full rounded-md border px-3 py-3 text-sm bg-[#FBFBFB] resize-y min-h-[160px]"
          />
        </div>
      </section>

      {/* Upload Files card */}
      <section className="rounded-lg border border-[#E6E6E6] bg-white p-6 mb-6 shadow-sm">
        <h2 className="text-lg font-medium text-[#0B5A2E] mb-4">Upload Files</h2>

        <div className="space-y-6">
          <div>
            <label className="text-sm text-[#333]">Film File (MP4, MOV, AVI) *</label>
            <label
              className="mt-2 flex items-center justify-center rounded-md border-2 border-dashed border-[#D6D6D6] bg-[#FBFBFB] cursor-pointer text-center p-6"
              style={{ minHeight: 120 }}
            >
              <input type="file" accept="video/*" onChange={(e) => handleFileChange(e, setFilmFile)} className="hidden" />
              <div>
                <div className="text-[#6F6F6F]">Click to upload film file</div>
                <div className="text-xs text-[#9AA0A6] mt-1">Maximum file size: 5GB</div>
                {filmFile && <div className="text-sm text-[#0B5A2E] mt-2">Selected: {filmFile.name}</div>}
              </div>
            </label>
          </div>

          <div>
            <label className="text-sm text-[#333]">Subtitles (SRT) - Optional</label>
            <label className="mt-2 flex items-center justify-center rounded-md border-2 border-dashed border-[#D6D6D6] bg-[#FBFBFB] cursor-pointer p-4" style={{ minHeight: 56 }}>
              <input type="file" accept=".srt" onChange={(e) => handleFileChange(e, setSubFile)} className="hidden" />
              <div className="text-[#6F6F6F]">Click to upload subtitles</div>
              {subFile && <div className="text-sm text-[#0B5A2E] ml-3">Selected: {subFile.name}</div>}
            </label>
          </div>

          <div>
            <label className="text-sm text-[#333]">Press Kit / Director Statement (PDF) - Optional</label>
            <label className="mt-2 flex items-center justify-center rounded-md border-2 border-dashed border-[#D6D6D6] bg-[#FBFBFB] cursor-pointer p-4" style={{ minHeight: 56 }}>
              <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, setPressFile)} className="hidden" />
              <div className="text-[#6F6F6F]">Click to upload press kit</div>
              {pressFile && <div className="text-sm text-[#0B5A2E] ml-3">Selected: {pressFile.name}</div>}
            </label>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-end gap-3 mb-8">
        <button onClick={cancel} className="rounded border px-4 py-2 text-sm bg-white">Cancel</button>
        <button onClick={saveDraft} className="rounded border px-4 py-2 text-sm bg-white">Save Draft</button>
        <button
          onClick={submitToAi}
          disabled={loading}
          className={`rounded px-4 py-2 text-sm ${loading ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-[#0B5A2E] text-white'}`}
        >
          {loading ? 'Running AI...' : 'Submit to Ai'}
        </button>
      </div>

      {/* loading overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin h-10 w-10 text-[#0B5A2E]" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="rgba(11,90,46,0.15)" strokeWidth="4" />
              <path d="M22 12a10 10 0 00-10-10" stroke="#0B5A2E" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="text-sm text-[#0B5A2E]">Running AI matching — this is a mockup</div>
          </div>
        </div>
      )}
    </div>
  );
}