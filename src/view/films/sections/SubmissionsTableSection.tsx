'use client';

import React, { useEffect, useRef, useState } from 'react';

type Submission = {
  id: string;
  film: string;
  festival: string;
  eventDate?: string;
  submissionStatus: 'Accepted' | 'Rejected';
  judgingStatus?: 'Under Review' | 'Shortlist' | 'Nominee' | string;
  comments?: string;
  image?: string;
};

const SAMPLE: Submission[] = [
  { id: '1', film: 'The Last Dawn', festival: 'Tribeca Film Festival', eventDate: '10.11.2024', submissionStatus: 'Accepted', judgingStatus: 'Best Director', comments: 'Excellent cinematography and narrative.', image: '/image/10.svg' },
  { id: '2', film: 'City Lights', festival: 'SXSW Film Festival', eventDate: '05.09.2024', submissionStatus: 'Rejected', judgingStatus: '-', comments: 'Good attempt but needs stronger development.', image: '/image/10.svg' },
  { id: '3', film: 'Silent Waves', festival: 'Cannes Short Film Corner', eventDate: '18.06.2024', submissionStatus: 'Accepted', judgingStatus: '1st Place - Drama', comments: 'Outstanding achievement in independent filmmaking.', image: '/image/10.svg' },
  { id: '4', film: 'Moonlit Road', festival: 'Berlin Short Fest', eventDate: '12.08.2024', submissionStatus: 'Accepted', judgingStatus: 'Under Review', comments: 'Strong visuals.', image: '/image/10.svg' },
  { id: '5', film: 'Paper Birds', festival: 'Venice Indie', eventDate: '22.07.2024', submissionStatus: 'Accepted', judgingStatus: 'Shortlist', comments: 'Great score and pacing.', image: '/image/10.svg' },
  { id: '6', film: 'Ocean Whispers', festival: 'Toronto Indie', eventDate: '02.05.2024', submissionStatus: 'Rejected', judgingStatus: '-', comments: 'Needs editing work.', image: '/image/10.svg' },
  { id: '7', film: 'Red Lantern', festival: 'SXSW Film Festival', eventDate: '30.09.2024', submissionStatus: 'Accepted', judgingStatus: 'Nominee', comments: 'Strong performances.', image: '/image/10.svg' },
  { id: '8', film: 'Glass Echoes', festival: 'Tribeca Film Festival', eventDate: '14.10.2024', submissionStatus: 'Accepted', judgingStatus: 'Best Sound & Music', comments: 'Excellent sound design.', image: '/image/10.svg' },
];

export default function SubmissionsTableSection() {
  const [selected, setSelected] = useState<Submission | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const previouslyFocused = useRef<Element | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && selected) setSelected(null);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [selected]);

  useEffect(() => {
    if (selected) {
      previouslyFocused.current = document.activeElement;
      setTimeout(() => closeButtonRef.current?.focus(), 0);
      document.body.style.overflow = 'hidden';
    } else {
      (previouslyFocused.current as HTMLElement | null)?.focus?.();
      document.body.style.overflow = '';
    }
  }, [selected]);

  return (
    <>
      <section className="rounded-xl border border-[#EDEDED] bg-white shadow-sm w-full">
        {/* constrained height so default view shows ~5 rows; user can scroll to see all 8 */}
        <div className="max-h-[340px] overflow-auto">
          <table className="min-w-full table-fixed text-sm">
            <thead>
              <tr className="bg-[#F4F7F6]">
                <th className="px-6 py-3 text-left text-[#3B3B3B] font-semibold sticky top-0 z-10 bg-[#F4F7F6]">Film</th>
                <th className="px-6 py-3 text-left text-[#3B3B3B] font-semibold sticky top-0 z-10 bg-[#F4F7F6]">Festival</th>
                <th className="px-6 py-3 text-left text-[#3B3B3B] font-semibold sticky top-0 z-10 bg-[#F4F7F6]">Submission Status</th>
                <th className="px-6 py-3 text-left text-[#3B3B3B] font-semibold sticky top-0 z-10 bg-[#F4F7F6]">Judging Status</th>
                <th className="px-6 py-3 text-left text-[#3B3B3B] font-semibold sticky top-0 z-10 bg-[#F4F7F6]">Comments</th>
              </tr>
            </thead>

            <tbody className="bg-white">
              {SAMPLE.map((row, idx) => (
                <tr
                  key={row.id}
                  className={`${idx < SAMPLE.length - 1 ? 'border-b border-[#E7E7E7]' : ''} hover:bg-[#FBFEFB] cursor-pointer`}
                  role="button"
                  tabIndex={0}
                  aria-label={`View submission details for ${row.film}`}
                  onClick={() => setSelected(row)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelected(row);
                    }
                  }}
                >
                  <td className="px-6 py-4 align-top max-w-[260px] break-words">{row.film}</td>
                  <td className="px-6 py-4 align-top text-[#4D4D4D] max-w-[240px] break-words">{row.festival}</td>
                  <td className="px-6 py-4 align-top"><SubmissionBadge status={row.submissionStatus} /></td>
                  <td className="px-6 py-4 align-top">
                    {row.judgingStatus && row.judgingStatus !== '-' ? <JudgingBadge status={row.judgingStatus} /> : <span className="text-[#8A8A8A]">-</span>}
                  </td>
                  <td className="px-6 py-4 align-top text-sm text-[#616161] max-w-[380px] break-words">{row.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Modal centered in middle of screen */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="submission-detail-title"
        >
          <div className="absolute inset-0 bg-black/40" onClick={() => setSelected(null)} aria-hidden="true" />

          <div className="relative z-10 max-w-[1100px] w-full">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* left: details — scrollable if content grows */}
                <div className="flex-1 p-6 overflow-auto max-h-[70vh]">
                  <div className="flex items-start justify-between">
                    <h3 id="submission-detail-title" className="text-lg font-semibold text-[#0B3F20]">Submission Detail</h3>
                    <button
                      ref={closeButtonRef}
                      onClick={() => setSelected(null)}
                      aria-label="Close submission detail"
                      className="ml-4 rounded-md px-3 py-1 text-sm text-[#4B4B4B] hover:bg-[#F4F4F4]"
                    >
                      ×
                    </button>
                  </div>

                  <div className="mt-4 rounded-md border border-[#EDEDED] bg-white p-4 shadow-sm">
                    <table className="w-full text-sm">
                      <thead className="text-left sticky top-0 bg-white">
                        <tr className="text-[#6B6B6B]">
                          <th className="py-2">Film</th>
                          <th className="py-2">Festival</th>
                          <th className="py-2">Event Date</th>
                          <th className="py-2">Judging Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-4 w-1/4">{selected.film}</td>
                          <td className="py-4 w-1/4 text-[#4D4D4D]">{selected.festival}</td>
                          <td className="py-4 w-1/6">{selected.eventDate ?? '-'}</td>
                          <td className="py-4 w-1/4">
                            {selected.judgingStatus && selected.judgingStatus !== '-' ? <JudgingBadge status={selected.judgingStatus} /> : <span className="text-[#8A8A8A]">-</span>}
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    <div className="mt-4 text-sm text-[#616161]">
                      <strong>Comments:</strong>
                      <p className="mt-1 whitespace-pre-wrap">{selected.comments}</p>
                    </div>
                  </div>
                </div>

                {/* right: poster/image */}
                <div className="w-full md:w-[300px] p-6 border-t md:border-t-0 md:border-l border-[#F0F0F0] flex items-center justify-center bg-white">
                  <img src={selected.image ?? '/image/10.svg'} alt={`${selected.film} poster`} className="max-h-[60vh] object-contain" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function SubmissionBadge({ status }: { status: Submission['submissionStatus'] }) {
  if (status === 'Accepted') return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#1F8A3A] text-white">Accepted</span>;
  return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#D62E2E] text-white">Rejected</span>;
}

function JudgingBadge({ status }: { status: Submission['judgingStatus'] }) {
  if (!status) return null;
  if (status === 'Under Review') return <span className="inline-flex px-3 py-1 rounded-full text-xs bg-[#F1F5F3] text-[#364A3A]">{status}</span>;
  if (status === 'Shortlist') return <span className="inline-flex px-3 py-1 rounded-full text-xs bg-[#FFF4E6] text-[#B85F00]">{status}</span>;
  if (status === 'Nominee') return <span className="inline-flex px-3 py-1 rounded-full text-xs bg-[#EAF3FF] text-[#0B59A3]">{status}</span>;
  return <span className="inline-flex px-3 py-1 rounded-full text-xs bg-[#9B5CFF] text-white">{status}</span>;
}