'use client';

import React from 'react';

type Film = { id: string; title: string };
type Props = {
  films: Film[];
  matchesCount: number;
  selectedFilmId: string;
  selectedFilmTitle: string;
  onSelectChange: (id: string) => void;
  boxHeight: string;
};

export default function MatchingResultsHeaderSection({
  films,
  matchesCount,
  selectedFilmId,
  selectedFilmTitle,
  onSelectChange,
  boxHeight,
}: Props) {
  return (
    <div>
      {/* TOP: count + select (NOT scrollable) */}
      <div className="flex items-start justify-between mb-4 gap-4">
        <div className="text-sm text-[#4B4B4B]">
          Found <span className="font-semibold text-[#00441B]">{matchesCount}</span> festivals matching your film
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-[#4B4B4B]">Select film</label>
          <select
            id="film-select"
            value={selectedFilmId}
            onChange={(e) => onSelectChange(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm"
          >
            {films.map((f) => (
              <option key={f.id} value={f.id}>
                {f.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Title box (kept as the same box — now taller / stronger green and title centered) */}
      <div className="mb-4">
        <div
          className="rounded-md w-full flex items-center justify-center gap-3"
          style={{
            background: '#E8FCEC',           // stronger single green tone
            border: '1px solid rgba(0,122,52,0.14)',
            padding: '14px 18px',            // taller box
            minHeight: 72,                   // ensure noticeable height
          }}
          aria-hidden={false}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{ width: 44, height: 44, background: '#007A34', color: 'white', fontWeight: 700 }}
          >
            {String(selectedFilmTitle).charAt(0) || 'F'}
          </div>

          <div className="text-center">
            <div className="text-sm text-[#0B5A2E] opacity-90">Selected film</div>
            <div className="text-lg font-semibold text-[#03411B] leading-tight">{selectedFilmTitle}</div>
          </div>
        </div>
      </div>

      {/* LARGER film card: taller and title centered vertically */}
      <div
        className="rounded-lg border border-[#F0F0F0] bg-white mb-6 w-full"
        style={{ minHeight: boxHeight }}
      >
        <div className="h-full flex flex-col items-center justify-center text-center p-6">
          <div className="h-14 w-14 rounded-md border border-[#DDEEE0] flex items-center justify-center text-[#00441B] mb-4">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="4" width="18" height="16" stroke="#0F5A34" strokeWidth="1.2" rx="2" />
              <path d="M7 4v16" stroke="#0F5A34" strokeWidth="1.2" />
            </svg>
          </div>

          <h3 className="text-3xl font-semibold text-[#00441B]">{selectedFilmTitle}</h3>
        </div>
      </div>
    </div>
  );
}