'use client';

import React from 'react';

type Film = { id: string; title: string; year?: string };

const SAMPLE_FILMS: Film[] = [
  { id: 'f1', title: 'Midnight Dreams', year: '2024' },
  { id: 'f2', title: 'Urban Echoes', year: '2024' },
  { id: 'f3', title: 'Silent Waves', year: '2024' },
];

export default function MatchingTableSection() {
  function goEdit(id: string) {
    window.location.href = `/films/edit/${encodeURIComponent(id)}`;
  }

  function goAiMatch(id: string, title: string) {
    window.location.href = `/films/matching?filmId=${encodeURIComponent(id)}&title=${encodeURIComponent(title)}`;
  }

  return (
    <section className="rounded-xl border border-[#EDEDED] bg-white shadow-sm w-full overflow-hidden">
      {/* header */}
      <div className="px-4 py-3 hidden md:grid grid-cols-6 text-sm font-semibold text-[#6F6F6F] bg-[#FBFBFB]">
        <div className="col-span-5">Film</div>
        <div className="col-span-1 text-right">Action</div>
      </div>

      {/* rows - removed divide-y to avoid dark separators on dark backgrounds */}
      <ul>
        {SAMPLE_FILMS.map((f) => (
          <li key={f.id} className="px-4 py-4 md:grid md:grid-cols-6 md:gap-4 flex flex-col md:flex-row items-start md:items-center">
            <div className="md:col-span-5 flex items-center gap-3 w-full">
              <div className="h-10 w-10 rounded-md bg-[#F3F3F3] flex items-center justify-center text-sm font-medium text-[#6F6F6F]">
                {f.title.split(' ').slice(0,2).map(s => s[0]).join('')}
              </div>
              <div>
                <div className="text-sm font-medium text-[#0C0C0C]">{f.title}</div>
                <div className="text-xs text-[#6F6F6F] md:hidden">Year: {f.year}</div>
              </div>
            </div>

            <div className="md:col-span-1 mt-3 md:mt-0 flex items-center justify-end gap-3 w-full">
              <button
                onClick={() => goEdit(f.id)}
                className="rounded border border-[#2F623F] text-[#2F623F] px-3 py-1 text-sm"
                aria-label={`Edit ${f.title}`}
              >
                Edit
              </button>

              <button
                onClick={() => goAiMatch(f.id, f.title)}
                className="rounded bg-[#00441B] text-white px-3 py-1 text-sm"
                aria-label={`AI matching for ${f.title}`}
              >
                AI matching
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}