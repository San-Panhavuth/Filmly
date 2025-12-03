import React from 'react';

type PastSubmission = {
  film: string;
  festival: string;
  status: 'Accepted' | 'Rejected';
  awards: string | '-';
  comments: string;
};

const rows: PastSubmission[] = [
  {
    film: 'The Last Dawn',
    festival: 'Tribeca Film Festival',
    status: 'Accepted',
    awards: 'Best Director',
    comments: 'Excellent cinematography and narrative.',
  },
  {
    film: 'City Lights',
    festival: 'SXSW Film Festival',
    status: 'Rejected',
    awards: '-',
    comments: 'Good attempt but needs stronger character development.',
  },
  {
    film: 'The Last Dawn',
    festival: 'Cannes Short Film Corner',
    status: 'Accepted',
    awards: '1st Place - Drama',
    comments: 'Outstanding achievement in independent filmmaking.',
  },
];

export default function PastSubmissionsSection() {
  return (
    <section className="mt-6 rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[#00441B]">Past Submissions</h3>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-xs text-[#4D4D4D]">
              <th className="px-4 py-3 text-left font-semibold">Film</th>
              <th className="px-4 py-3 text-left font-semibold">Festival</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Awards</th>
              <th className="px-4 py-3 text-left font-semibold">Comments</th>
            </tr>
            <tr>
              <td colSpan={5} className="h-[1px] bg-[#EFEFEF]" />
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="text-sm text-[#1A1A1A]">
                <td className="px-4 py-4 align-middle">{r.film}</td>
                <td className="px-4 py-4 align-middle text-[#4D4D4D]">{r.festival}</td>
                <td className="px-4 py-4 align-middle">
                  <StatusBadge status={r.status} />
                </td>
                <td className="px-4 py-4 align-middle">
                  <AwardPill value={r.awards} />
                </td>
                <td className="px-4 py-4 align-middle text-[#4D4D4D]">{r.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: PastSubmission['status'] }) {
  if (status === 'Accepted') {
    return (
      <span className="inline-flex items-center rounded-md bg-[#22C55E] px-3 py-1.5 text-xs font-semibold text-white">
        Accepted
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-md bg-[#EF4444] px-3 py-1.5 text-xs font-semibold text-white">
      Rejected
    </span>
  );
}

function AwardPill({ value }: { value: string | '-' }) {
  if (value === '-' || !value) {
    return <span className="text-[#6F6F6F]">-</span>;
  }
  return (
    <span className="inline-flex items-center rounded-md bg-[#A78BFA] px-3 py-1.5 text-xs font-semibold text-white">
      {value}
    </span>
  );
}