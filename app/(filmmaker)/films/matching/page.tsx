'use client';

import React from 'react';
import MatchingHeaderSection from '../../../../src/view/films/sections/MatchingHeaderSection';
import MatchingTableSection from '../../../../src/view/films/sections/MatchingTableSection';
import MatchingResultsSection from '../../../../src/view/films/sections/MatchingResultsSection';

export default function MatchingPage() {
  return (
    <div className="p-6 w-full">
      <MatchingHeaderSection />

      <div className="mt-4">
        <h3 className="text-base font-semibold text-[#00441B]">Project & AI Matching</h3>
      </div>

      <div className="mt-4">
        <MatchingTableSection />
      </div>

      <div className="mt-4">
        <MatchingResultsSection />
      </div>
    </div>
  );
}