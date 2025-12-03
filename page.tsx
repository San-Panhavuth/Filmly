'use client';

import React from 'react';
import SubmissionsHeaderSection from '../../../src/view/films/sections/SubmissionsHeaderSection';
import SubmissionsFiltersSection from '../../../src/view/films/sections/SubmissionsFiltersSection';
import SubmissionsTableSection from '../../../src/view/films/sections/SubmissionsTableSection';
import SubmissionsLegendSection from '../../../src/view/films/sections/SubmissionsLegendSection';

export default function SubmissionsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <SubmissionsHeaderSection />

      <div>
        <h3 className="text-base font-semibold text-[#00441B]">Submission</h3>
      </div>

      <SubmissionsFiltersSection />

      <SubmissionsTableSection />

      <SubmissionsLegendSection />
    </div>
  );
}