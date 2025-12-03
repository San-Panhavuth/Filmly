'use client';

import HeaderSection from '../../../src/view/films/sections/HeaderSection';
import StatsSection from '../../../src/view/films/sections/StatsSection';
import AnalyticsSection from '../../../src/view/films/sections/AnalyticsSection';
import ActiveSubmissionsSection from '../../../src/view/films/sections/ActiveSubmissionsSection';
import PastSubmissionsSection from '../../../src/view/films/sections/PastSubmissionsSection';

export default function FilmmakerDashboardPage() {
  return (
    <div className="p-6">
      <HeaderSection />
      <StatsSection />
      <AnalyticsSection />
      <ActiveSubmissionsSection />
      <PastSubmissionsSection />
    </div>
  );
}