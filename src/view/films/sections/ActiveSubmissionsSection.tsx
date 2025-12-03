import React from 'react';

type Submission = {
  film: string;
  festival: string;
  status: 'Under Review' | 'Shortlisted' | 'Submitted';
  date: string;
  awards?: string | '-';
};

const submissions: Submission[] = [
  {
    film: 'Midnight Dreams',
    festival: 'Sundance Film Festival',
    status: 'Under Review',
    date: 'Aug 15, 2025',
    awards: '-',
  },
  {
    film: 'Urban Echoes',
    festival: 'Toronto International Film Festival',
    status: 'Shortlisted',
    date: 'Jul 22, 2025',
    awards: '-',
  },
  {
    film: 'Silent Waves',
    festival: 'Venice Film Festival',
    status: 'Submitted',
    date: 'Sep 1, 2025',
    awards: '-',
  },
];

export default function ActiveSubmissionsSection() {
  return (
    <section className="mt-6 rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold text-[#00441B]">Active Submissions</h3>

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="text-xs text-[#4D4D4D]">
              <th className="px-4 py-3 text-left font-semibold">Film</th>
              <th className="px-4 py-3 text-left font-semibold">Festival</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Submission Date</th>
              <th className="px-4 py-3 text-left font-semibold">Awards</th>
            </tr>
            <tr>
              <td colSpan={5} className="h-[1px] bg-[#EFEFEF]" />
            </tr>
          </thead>
          <tbody>
            {submissions.map((s, i) => (
              <tr key={i} className="text-sm text-[#1A1A1A]">
                <td className="px-4 py-4 align-middle">{s.film}</td>
                <td className="px-4 py-4 align-middle text-[#4D4D4D]">{s.festival}</td>
                <td className="px-4 py-4 align-middle">
                  <StatusBadge status={s.status} />
                </td>
                <td className="px-4 py-4 align-middle text-[#4D4D4D]">{s.date}</td>
                <td className="px-4 py-4 align-middle text-[#4D4D4D]">{s.awards || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function StatusBadge({ status }: { status: Submission['status'] }) {
  if (status === 'Under Review') {
    return (
      <span className="inline-flex items-center rounded-md bg-[#2F7CF1] px-3 py-1.5 text-xs font-semibold text-white">
        Under Review
      </span>
    );
  }
  if (status === 'Shortlisted') {
    return (
      <span className="inline-flex items-center rounded-md bg-[#F2B705] px-3 py-1.5 text-xs font-semibold text-[#1A1A1A]">
        Shortlisted
      </span>
    );
  }
  return (
    <span className="inline-flex items-center rounded-md bg-[#8A8F98] px-3 py-1.5 text-xs font-semibold text-white">
      Submitted
    </span>
  );
}