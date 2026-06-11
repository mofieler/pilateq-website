import React from 'react';

// --- Scheduling UI ---
export const SchedulingUI: React.FC = () => (
  <div className="bg-white rounded-2xl border border-brown/[0.06] shadow-sm p-4 sm:p-5 w-full">
    <div className="flex items-center justify-between mb-4">
      <span className="font-display text-sm font-semibold text-brown">Weekly Schedule</span>
      <span className="font-body text-[10px] text-brown/40">Oct 23 – 27</span>
    </div>
    <div className="grid grid-cols-5 gap-1.5">
      {['M', 'T', 'W', 'T', 'F'].map((d, i) => (
        <div key={i} className="text-center">
          <span className="font-body text-[9px] text-brown/40 uppercase block mb-1.5">{d}</span>
          <div className="space-y-1">
            <div className={`rounded-md px-1.5 py-1 ${i % 2 === 0 ? 'bg-tan/10' : 'bg-[#8B9A6D]/8'}`}>
              <p className="font-body text-[8px] font-medium text-brown/70 leading-tight">
                {i % 2 === 0 ? 'Chair' : 'Mat'}
              </p>
              <p className="font-body text-[7px] text-brown/40">
                {i % 2 === 0 ? '9:00 AM' : '10:30 AM'}
              </p>
            </div>
            {i < 4 && (
              <div className={`rounded-md px-1.5 py-1 ${i % 2 === 0 ? 'bg-[#B8A07A]/8' : 'bg-tan/8'}`}>
                <p className="font-body text-[8px] font-medium text-brown/70 leading-tight">
                  {i % 2 === 0 ? 'Reformer' : 'Chair'}
                </p>
                <p className="font-body text-[7px] text-brown/40">5:00 PM</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- Credits UI ---
export const CreditsUI: React.FC = () => (
  <div className="bg-white rounded-2xl border border-brown/[0.06] shadow-sm p-4 sm:p-5 w-full">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-tan/10 flex items-center justify-center">
        <svg className="w-4 h-4 text-tan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="M7 15h0M2 10h20" />
        </svg>
      </div>
      <span className="font-display text-sm font-semibold text-brown">Pass Credits</span>
    </div>
    <div className="text-center mb-4">
      <span className="font-display text-3xl sm:text-4xl font-bold text-brown">30</span>
      <p className="font-body text-[10px] text-brown/45 mt-0.5">credits available</p>
    </div>
    <div className="flex flex-wrap gap-1.5 justify-center">
      {['Reformer', 'Mat', 'Yoga', 'Chair'].map((tag, i) => (
        <span
          key={tag}
          className={`font-body text-[9px] px-2 py-1 rounded-full ${
            i === 0 ? 'bg-[#8B9A6D]/10 text-[#6B7A4D]' :
            i === 1 ? 'bg-tan/10 text-tan' :
            i === 2 ? 'bg-[#9B8BB0]/10 text-[#7B6B90]' :
            'bg-[#B8A07A]/10 text-[#8B7A5A]'
          }`}
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

// --- Analytics UI ---
export const AnalyticsUI: React.FC = () => {
  const bars = [35, 55, 42, 70, 58, 85, 62];
  return (
    <div className="bg-white rounded-2xl border border-brown/[0.06] shadow-sm p-4 sm:p-5 w-full">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display text-sm font-semibold text-brown">Statistics</span>
        <div className="flex gap-1">
          <span className="font-body text-[8px] text-brown/40 bg-sand px-2 py-0.5 rounded-full">30d</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        {[
          { label: 'Bookings', value: '47', dot: 'bg-[#8B9A6D]' },
          { label: 'Revenue', value: '2.334 €', dot: 'bg-tan' },
          { label: 'Students', value: '73', dot: 'bg-brown' },
          { label: 'Cancel', value: '3%', dot: 'bg-[#C08060]' },
        ].map((s) => (
          <div key={s.label} className="bg-sand/50 rounded-lg p-2.5">
            <div className="flex items-center gap-1 mb-1">
              <div className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              <span className="font-body text-[8px] text-brown/45">{s.label}</span>
            </div>
            <span className="font-display text-lg font-semibold text-brown">{s.value}</span>
          </div>
        ))}
      </div>
      <div className="flex items-end justify-between gap-1 h-12 px-1">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full max-w-[16px] rounded-sm bg-tan/20" style={{ height: `${h}%` }} />
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Payments UI ---
export const PaymentsUI: React.FC = () => (
  <div className="bg-white rounded-2xl border border-brown/[0.06] shadow-sm p-4 sm:p-5 w-full">
    <div className="flex items-center gap-3 mb-4">
      <span className="font-body text-[11px] text-brown/50 px-3 py-1 rounded-full bg-sand">Credits</span>
      <span className="font-body text-[11px] text-brown font-medium px-3 py-1 border-b-2 border-tan">Bills</span>
    </div>
    <div className="bg-sand/40 rounded-xl p-3.5">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="font-body text-[10px] text-brown/50">Invoice</p>
          <p className="font-body text-[11px] font-semibold text-brown">POS-BS-2026-00123</p>
        </div>
        <span className="bg-[#8B9A6D]/15 text-[#6B7A4D] font-body text-[9px] font-semibold px-2.5 py-1 rounded-full">PAID</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="font-body text-[10px] text-brown/45">30 credits</span>
        <span className="font-display text-lg font-bold text-brown">220,00 €</span>
      </div>
    </div>
    <div className="mt-3 pt-3 border-t border-brown/[0.04]">
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-tan/10 flex items-center justify-center">
          <svg className="w-3 h-3 text-tan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <span className="font-body text-[10px] text-brown/50">Payment confirmed</span>
      </div>
    </div>
  </div>
);
