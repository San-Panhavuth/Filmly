import React from 'react';

export default function AnalyticsSection() {
  return (
    <section className="mt-6">
      <h2 className="text-[15px] font-semibold text-[#00441B]">Quick Analytics</h2>

      {/* Full-width columns */}
      <div className="mt-3 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Pie chart tile */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#00441B]">Genre Success Rate</h3>
          <div className="mt-4 rounded-lg bg-[#F9FAF9] relative overflow-hidden min-h-[260px]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-40 w-40">
                <div className="absolute inset-0 rounded-full bg-[#0F5B2A]" />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 40%)',
                    backgroundColor: '#114F27',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    clipPath: 'polygon(50% 50%, 100% 40%, 100% 100%, 70% 100%)',
                    backgroundColor: '#1E7A3A',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    clipPath: 'polygon(50% 50%, 70% 100%, 0% 100%, 0% 60%)',
                    backgroundColor: '#2F623F',
                  }}
                />
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    clipPath: 'polygon(50% 50%, 0% 60%, 0% 0%, 50% 0%)',
                    backgroundColor: '#EEF3EF',
                  }}
                />
              </div>
            </div>
            {/* Labels */}
            <div className="absolute top-4 right-5 text-xs text-[#0F5B2A]">Drama 45%</div>
            <div className="absolute bottom-6 left-5 text-xs text-[#1E7A3A]">Documentary 25%</div>
            <div className="absolute bottom-6 right-8 text-xs text-[#2F623F]">Comedy 20%</div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 text-xs text-[#B9C7BD]">
              Thriller 10%
            </div>
          </div>
        </div>

        {/* Bar chart tile */}
        <div className="rounded-2xl border border-[#EDEDED] bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#00441B]">Submissions by Category</h3>
          <div className="mt-4 rounded-lg bg-[#F9FAF9] relative min-h-[260px]">
            {/* Grid lines */}
            <div className="absolute inset-0 px-6 py-6">
              <div className="h-full w-full border-l border-[#DDE4DE]">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="border-t border-dashed border-[#DDE4DE]"
                    style={{ height: 'calc(25% - 1px)' }}
                  />
                ))}
              </div>
            </div>
            {/* Bars */}
            <div className="absolute inset-0 flex items-end gap-8 px-8 pb-8">
              <div className="w-10 rounded-md" style={{ height: '85%', backgroundColor: '#0F5B2A' }} />
              <div className="w-10 rounded-md" style={{ height: '65%', backgroundColor: '#1E7A3A' }} />
              <div className="w-10 rounded-md" style={{ height: '45%', backgroundColor: '#2F623F' }} />
              <div className="w-10 rounded-md" style={{ height: '30%', backgroundColor: '#3A8C58' }} />
            </div>
            {/* X-axis labels */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-between px-8 text-xs text-[#4D4D4D]">
              <span>Feature</span>
              <span>Short</span>
              <span>Student</span>
              <span>Doc</span>
            </div>
            {/* Y-axis labels */}
            <div className="absolute left-2 top-6 flex h-[calc(100%-48px)] flex-col justify-between text-xs text-[#4D4D4D]">
              <span>12</span>
              <span>9</span>
              <span>6</span>
              <span>3</span>
              <span>0</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}