'use client';

import React from 'react';

function TitleWithDot({ children }: { children: React.ReactNode }) {
  return (
    <h5 className="flex items-center font-semibold mb-2 text-[#00441B]">
      <span aria-hidden className="inline-block mr-2 h-2 w-2 rounded-full bg-[#00441B]" />
      {children}
    </h5>
  );
}

export default function SubmissionsLegendSection() {
  return (
    <div className="rounded-xl border border-[#EDEDED] p-6 bg-white shadow-sm w-full">
      <h4 className="font-semibold text-[#00441B] mb-3">Submissions Status</h4>

      <ul className="list-disc pl-5 text-sm text-[#4B4B4B] space-y-1">
        <li><strong>Accept / Reject:</strong> The festival notifies the filmmaker as either Accept or Reject.</li>
        <li><strong>Under Review:</strong> After an Accept, the submission moves to "Under Review" for judging.</li>
        <li><strong>Shortlist:</strong> A shortlisted film is considered for a main or special award.</li>
        <li><strong>Nominee:</strong> Nominee indicates official selection for an award category (congrats).</li>
        <li><strong>Winner / Award:</strong> If selected, a specific award label (e.g. "Best Director") will appear.</li>
      </ul>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#1A1A1A]">
        <div>
          <TitleWithDot>Main Awards</TitleWithDot>
          <p className="mb-1">Top 1 – Best Overall Film</p>
          <p className="mb-1">Top 2 – Second Place</p>
          <p className="mb-1">Top 3 – Third Place</p>
        </div>

        <div>
          <TitleWithDot>Special Awards</TitleWithDot>
          <ul className="list-none pl-0 space-y-1">
            <li>Best Comedy</li>
            <li>Best Romance</li>
            <li>Best Drama</li>
            <li>Best Educational</li>
            <li>Best Documentary</li>
            <li>Best War</li>
            <li>Best Fantasy</li>
            <li>Best Action</li>
            <li>Best Traditional</li>
            <li>Best Western</li>
            <li>Best Horror</li>
            <li>Best Animation</li>
            <li>Best Thriller</li>
            <li>Best Adventure</li>
            <li>Best Sci‑Fi</li>
          </ul>
        </div>

        <div>
          <TitleWithDot>Technical / Skill Award</TitleWithDot>
          <ul className="list-none pl-0 space-y-1">
            <li>Best Cinematography</li>
            <li>Best Editing</li>
            <li>Best Sound &amp; Music</li>
            <li>Best Screenplay</li>
            <li>Best Director</li>
            <li>Best Actor</li>
            <li>Best Actress</li>
            <li>Best Youth Film</li>
            <li>Audience Choice Award</li>
          </ul>
        </div>
      </div>
    </div>
  );
}