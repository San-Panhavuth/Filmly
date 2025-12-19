'use client';

export default function LineChartSection({ analytics }: { analytics: unknown }) {
  const getValue = (key: string, defaultValue = 0): string | number => {
    if (analytics && typeof analytics === 'object' && analytics !== null && key in analytics) {
      const value = (analytics as Record<string, unknown>)[key];
      if (typeof value === 'string' || typeof value === 'number') {
        return value;
      }
      if (typeof value === 'boolean') {
        return value ? 1 : 0;
      }
      return defaultValue;
    }
    return defaultValue;
  };
  const totalEvents = getValue('totalEvents');
  const activeEvents = getValue('activeEvents');
  const pastEvents = getValue('pastEvents');
  const acceptanceRate = getValue('acceptanceRate');
  const avgSubmissionsPerEvent = getValue('averageSubmissionsPerEvent');

  return (
    <section className="mb-6 bg-white rounded-xl shadow p-6">
      <h2 className="text-green-900 font-semibold text-lg mb-4">Event Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm mb-1">Total Events</p>
          <p className="text-2xl font-bold text-green-900">{String(totalEvents)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm mb-1">Active Events</p>
          <p className="text-2xl font-bold text-green-900">{String(activeEvents)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm mb-1">Past Events</p>
          <p className="text-2xl font-bold text-green-900">{String(pastEvents)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-500 text-sm mb-1">Acceptance Rate</p>
          <p className="text-2xl font-bold text-green-900">{String(acceptanceRate)}%</p>
        </div>
      </div>
      <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
        <p className="text-sm text-green-900">
          <span className="font-semibold">Average submissions per event:</span> {String(avgSubmissionsPerEvent)}
        </p>
      </div>
    </section>
  );
}
