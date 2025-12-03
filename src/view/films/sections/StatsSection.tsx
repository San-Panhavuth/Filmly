import React from 'react';

export default function StatsSection() {
  const cards = [
    { title: 'Total Films', value: '8', subtitle: 'Films in portfolio', Icon: FilmIcon },
    { title: 'Active Submissions', value: '3', subtitle: 'Currently under review', Icon: TrendUpIcon },
    {
      title: 'Awards Won',
      value: '12',
      subtitle: (
        <>
          Across all festivals
          <div className="mt-1 text-[#2F623F]">↑ 20% vs last month</div>
        </>
      ),
      Icon: RibbonIcon,
    },
  ];

  return (
    <section className="mt-6">
      {/* Use flex so tiles keep fixed width/height and wrap cleanly */}
      <div className="flex flex-wrap gap-5">
        {cards.map(({ title, value, subtitle, Icon }) => (
          <div
            key={title}
            className="w-[214.67px] h-[192.33px] rounded-2xl border border-[#EDEDED] bg-white shadow-sm"
          >
            <div className="h-full px-4 py-4 flex flex-col">
              <div className="flex items-start justify-between">
                <div className="text-[13px] leading-5 text-[#4D4D4D]">{title}</div>
                <div className="rounded-md bg-[#F4F7F5] p-2">
                  <Icon className="h-5 w-5 text-[#00441B]" />
                </div>
              </div>

              <div className="mt-2 text-[22px] font-semibold leading-6 text-[#0F5B2A]">
                {value}
              </div>

              <div className="mt-auto text-[13px] leading-5 text-[#6F6F6F]">
                {subtitle}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function FilmIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="7" cy="9" r="1.25" fill="currentColor" />
      <circle cx="7" cy="13" r="1.25" fill="currentColor" />
      <circle cx="17" cy="9" r="1.25" fill="currentColor" />
      <circle cx="17" cy="13" r="1.25" fill="currentColor" />
      <rect x="9.5" y="9" width="5" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function TrendUpIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M4 16l6-6 4 4 6-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 6h3v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function RibbonIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10 12l-3 8 5-3 5 3-3-8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}