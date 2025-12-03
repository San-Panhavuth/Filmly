'use client';

import React from 'react';
import SubmissionsHeaderSection from '../../../../src/view/films/sections/SubmissionsHeaderSection';
import SubmissionsFiltersSection from '../../../../src/view/films/sections/SubmissionsFiltersSection';
import SubmissionsTableSection from '../../../../src/view/films/sections/SubmissionsTableSection';
import SubmissionsLegendSection from '../../../../src/view/films/sections/SubmissionsLegendSection';

export default function SubmissionsPage() {
  return (
    // use full width (no centering) so content sits closer to the left nav
    <div className="p-6 w-full">
      <SubmissionsHeaderSection />

      <div className="mt-4">
        <h3 className="text-base font-semibold text-[#00441B]">Submission</h3>
      </div>

      <div className="mt-4">
        <SubmissionsFiltersSection />
      </div>

      <div className="mt-4">
        <SubmissionsTableSection />
      </div>

      <div className="mt-6">
        <SubmissionsLegendSection />
      </div>
    </div>
  );
}
