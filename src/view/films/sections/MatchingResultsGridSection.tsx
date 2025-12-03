'use client';

import React from 'react';

type Match = {
  id: string;
  festival: string;
  score: number;
  type: string;
  country: string;
  deadline: string;
};

type Props = {
  matches: Match[];         // already paged items to render
  boxWidth: string;
  boxHeight: string;
  columns: number;
  gapPx: number;
};

export default function MatchingResultsGridSection({
  matches,
  boxWidth,
  boxHeight,
  columns,
  gapPx,
}: Props) {
  return (
    <div className="w-full">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, ${boxWidth})`,
          gridAutoRows: boxHeight,
          gap: `${gapPx}px`,
          justifyContent: 'start',
          alignContent: 'start',
          paddingBottom: '8px',
        }}
      >
        {matches.map((m) => (
          <div
            key={m.id}
            style={{ width: boxWidth, height: boxHeight, boxSizing: 'border-box' }}
            className="rounded-lg border border-[#EDEDED] bg-white shadow-sm flex flex-col justify-between p-6 overflow-hidden"
          >
            <div>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="h-12 w-12 rounded-md bg-[#F3F3F3] flex items-center justify-center text-[#6F6F6F]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <path d="M3 7h18" stroke="#6F6F6F" strokeWidth="1.2" strokeLinecap="round" />
                      <rect x="3" y="7" width="18" height="10" rx="2" stroke="#6F6F6F" strokeWidth="1.2" />
                    </svg>
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-[#0C0C0C] leading-snug">{m.festival}</div>
                    <div className="text-xs text-[#6F6F6F] mt-2">{m.type}</div>
                  </div>
                </div>

                <div>
                  <div className="inline-flex items-center justify-center px-3 py-2 rounded-md bg-[#2F9D52] text-white text-sm font-semibold">
                    {m.score}% <span className="ml-2 text-xs opacity-90">Match</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-sm text-[#6F6F6F] space-y-3">
                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 6.1 7 13 7 13s7-6.9 7-13c0-3.87-3.13-7-7-7z" stroke="#6F6F6F" strokeWidth="1.2" />
                  </svg>
                  <span className="capitalize">{m.country}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M7 10h10M7 14h10M17 4v2M7 4v2" stroke="#6F6F6F" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  <span>Deadline: {m.deadline}</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => window.alert(`Open details for ${m.festival} (implement)`)}
                className="w-full rounded bg-[#00441B] text-white py-2 text-sm"
                aria-label={`View details ${m.festival}`}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}