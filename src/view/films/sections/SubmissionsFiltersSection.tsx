'use client';

import React, { useState } from 'react';

type FiltersProps = {
  // future: expose callbacks to parent if you want query param sync
};

export default function SubmissionsFiltersSection(_props?: FiltersProps) {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [judgingFilter, setJudgingFilter] = useState<string>('All');

  // NOTE: for now total is static; when table is wired to API you can lift state up
  const total = 3;

  return (
    <section className="rounded-xl border border-[#EDEDED] bg-white px-4 py-4 shadow-sm md:px-6 md:py-5 w-full">
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm bg-white min-w-[180px]"
            aria-label="Submission Status"
          >
            <option value="All">Submission Status</option>
            <option value="Accept">Accept</option>
            <option value="Reject">Reject</option>
          </select>

          <select
            value={judgingFilter}
            onChange={(e) => setJudgingFilter(e.target.value)}
            className="rounded-md border px-3 py-2 text-sm bg-white min-w-[180px]"
            aria-label="Judging Status"
          >
            <option value="All">Judging Status</option>
            <option value="Under Review">Under Review</option>
            <option value="Shortlist">Shortlist</option>
            <option value="Nominee">Nominee</option>
            <option value="Best Director">Best Director</option>
            <option value="1st Place - Drama">1st Place - Drama</option>
            <option value="-">-</option>
          </select>
        </div>

        <div className="mt-2 md:mt-0 md:ml-auto text-sm text-[#6F6F6F]">Total: {total}</div>
      </div>
    </section>
  );
}