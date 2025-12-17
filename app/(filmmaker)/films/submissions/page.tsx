'use client';

import React from 'react';

import SubmissionsHeaderSection from '../../../../src/view/films/sections/SubmissionsHeaderSection';
import SubmissionsLegendSection from '../../../../src/view/films/sections/SubmissionsLegendSection';
import SubmissionsPageWithFilters from '../../../../src/view/films/sections/SubmissionsPageWithFilters';

export default function SubmissionsPage() {
  return (
    <div className="p-6 w-full">
      <SubmissionsHeaderSection />
      <div className="mt-4">
        <h3 className="text-base font-semibold text-[#00441B]">Submission</h3>
      </div>
      <div className="mt-4">
        <SubmissionsPageWithFilters />
      </div>
      <div className="mt-6">
        <SubmissionsLegendSection />
      </div>
    </div>
  );
}
