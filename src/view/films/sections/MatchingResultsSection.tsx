'use client';

import React, { useEffect, useState } from 'react';
import MatchingResultsHeaderSection from './MatchingResultsHeaderSection';
import MatchingResultsGridSection from './MatchingResultsGridSection';

type Film = { id: string; title: string };
type Match = { id: string; festival: string; score: number; type: string; country: string; deadline: string; };

const SAMPLE_FILMS: Film[] = [
  { id: 'f1', title: 'Midnight Dreams' },
  { id: 'f2', title: 'Urban Echoes' },
  { id: 'f3', title: 'Silent Waves' },
];

// increased sample so pagination can be tested up to 4 pages
const MATCHES: Record<string, Match[]> = {
  // f1 now has 40 items (8 items per page -> 5 pages possible; we cap pages below)
  f1: Array.from({ length: 40 }).map((_, i) => ({
    id: `m${i + 1}`,
    festival: `Festival ${i + 1}`,
    score: 95 - (i % 20),
    type: i % 3 === 0 ? 'Feature Film' : 'Short Film',
    country: ['USA', 'UK', 'France', 'Italy', 'Spain'][i % 5],
    deadline: `Oct ${10 + (i % 20)}, 2025`,
  })),
  f2: Array.from({ length: 12 }).map((_, i) => ({
    id: `n${i + 1}`,
    festival: `TIFF ${i + 1}`,
    score: 88 - i,
    type: 'Feature Film',
    country: 'Canada',
    deadline: `Aug ${10 + i}, 2025`,
  })),
  f3: Array.from({ length: 10 }).map((_, i) => ({
    id: `p${i + 1}`,
    festival: `ShortFest ${i + 1}`,
    score: 80 - i,
    type: 'Short Film',
    country: 'USA',
    deadline: `Sep ${5 + i}, 2025`,
  })),
};

export default function MatchingResultsSection() {
  const [selectedFilmId, setSelectedFilmId] = useState<string>(SAMPLE_FILMS[0].id);
  const [selectedFilmTitle, setSelectedFilmTitle] = useState<string>(SAMPLE_FILMS[0].title);
  const [matches, setMatches] = useState<Match[]>(MATCHES[SAMPLE_FILMS[0].id] || []);

  // page layout: 2 rows x 4 columns per page (8 items per page)
  const ROWS_PER_PAGE = 2;
  const COLUMNS = 4;
  const ITEMS_PER_PAGE = ROWS_PER_PAGE * COLUMNS;

  // cap pages to 4 so we can test up to 4 pages
  const maxPagesCap = 4;

  // box sizing (unchanged)
  const BOX_W = '294.22px';
  const BOX_H = '338.33px';
  const GAP_PX = 16;

  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const qId = params.get('filmId');
    const qTitle = params.get('title');
    if (qId && SAMPLE_FILMS.find((f) => f.id === qId)) {
      const film = SAMPLE_FILMS.find((f) => f.id === qId)!;
      setSelectedFilmId(film.id);
      setSelectedFilmTitle(film.title);
      setMatches(MATCHES[film.id] ?? []);
      setPage(1);
      return;
    }
    if (qTitle) {
      const film = SAMPLE_FILMS.find((f) => f.title === qTitle);
      if (film) {
        setSelectedFilmId(film.id);
        setSelectedFilmTitle(film.title);
        setMatches(MATCHES[film.id] ?? []);
        setPage(1);
      }
    }
  }, []);

  function onSelectChange(id: string) {
    const film = SAMPLE_FILMS.find((f) => f.id === id)!;
    setSelectedFilmId(film.id);
    setSelectedFilmTitle(film.title);
    setMatches(MATCHES[film.id] ?? []);
    setPage(1);
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      params.set('filmId', film.id);
      params.set('title', film.title);
      window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
    }
  }

  // compute pages
  const computedTotalPages = Math.max(1, Math.ceil(matches.length / ITEMS_PER_PAGE));
  const totalPages = Math.min(maxPagesCap, computedTotalPages);
  useEffect(() => { if (page > totalPages) setPage(totalPages); }, [totalPages, page]);

  const start = (page - 1) * ITEMS_PER_PAGE;
  const pagedMatches = matches.slice(start, start + ITEMS_PER_PAGE);

  return (
    <div className="rounded-xl border border-[#EDEDED] bg-white p-4 shadow-sm w-full">
      <MatchingResultsHeaderSection
        films={SAMPLE_FILMS}
        matchesCount={matches.length}
        selectedFilmId={selectedFilmId}
        selectedFilmTitle={selectedFilmTitle}
        onSelectChange={onSelectChange}
        boxHeight={BOX_H}
      />

      {/* Pagination moved to top-right of the festival area */}
      <div className="mb-3 flex items-center justify-end">
        <div className="inline-flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-2 py-1 rounded border bg-white text-sm disabled:opacity-50"
            aria-label="Previous page"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            return (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-2 py-1 rounded text-sm ${p === page ? 'bg-[#00441B] text-white' : 'bg-white border'}`}
                aria-label={`Page ${p}`}
              >
                {p}
              </button>
            );
          })}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-2 py-1 rounded border bg-white text-sm disabled:opacity-50"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      </div>

      {/* Grid renders current page (no vertical scroll) */}
      <MatchingResultsGridSection
        matches={pagedMatches}
        boxWidth={BOX_W}
        boxHeight={BOX_H}
        columns={COLUMNS}
        gapPx={GAP_PX}
      />
    </div>
  );
}