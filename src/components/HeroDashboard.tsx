import React from 'react';
import {
  LayoutDashboard, Calendar, Users, CreditCard, BarChart3,
  TrendingUp, CalendarCheck, Coins, Euro,
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: Calendar, label: 'Classes', active: false },
  { icon: Users, label: 'Students', active: false },
  { icon: CreditCard, label: 'Payments', active: false },
  { icon: BarChart3, label: 'Reports', active: false },
];

const stats = [
  { icon: CalendarCheck, value: '4', label: "Today's Classes", accent: 'bg-tan/10 text-tan' },
  { icon: Users, value: '73', label: 'Active Students', accent: 'bg-[#8B9A6D]/10 text-[#8B9A6D]' },
  { icon: Coins, value: '1,206', label: 'Credits Sold', accent: 'bg-[#B8A07A]/10 text-[#B8A07A]' },
  { icon: Euro, value: '8.249 €', label: 'Revenue', accent: 'bg-[#A08060]/10 text-[#A08060]' },
];

const weekBars = [
  { day: 'M', height: '35%' },
  { day: 'T', height: '55%' },
  { day: 'W', height: '45%' },
  { day: 'T', height: '70%' },
  { day: 'F', height: '60%' },
  { day: 'S', height: '85%' },
  { day: 'S', height: '50%' },
];

const HeroDashboard: React.FC = () => {
  return (
    <div className="w-full h-full flex bg-cream/95 rounded-none overflow-hidden shadow-2xl">
      {/* Sidebar */}
      <div className="w-[72px] sm:w-[80px] lg:w-[88px] bg-sand/80 border-r border-brown/[0.06] flex flex-col items-center py-5 gap-1 flex-shrink-0">
        {sidebarItems.map((item) => (
          <button
            key={item.label}
            className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
              item.active
                ? 'bg-tan/15 text-tan'
                : 'text-brown/35 hover:text-brown/60 hover:bg-brown/[0.04]'
            }`}
            title={item.label}
          >
            <item.icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4 sm:p-5 lg:p-6 overflow-hidden">
        {/* Header */}
        <div className="mb-4 lg:mb-5">
          <h2 className="font-display text-lg sm:text-xl lg:text-2xl font-semibold text-brown leading-tight">
            Studio Dashboard
          </h2>
          <p className="font-body text-[11px] text-brown/40 mt-0.5">Overview</p>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 lg:gap-3 mb-4 lg:mb-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-3 lg:p-3.5 border border-brown/[0.04] shadow-sm"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-7 h-7 rounded-lg ${stat.accent.split(' ')[0]} flex items-center justify-center`}>
                  <stat.icon className={`w-3.5 h-3.5 ${stat.accent.split(' ')[1]}`} strokeWidth={1.8} />
                </div>
                <span className="font-body text-[10px] text-brown/45 uppercase tracking-wider hidden sm:inline">
                  {stat.label}
                </span>
              </div>
              <p className="font-display text-xl sm:text-2xl lg:text-[28px] font-bold text-brown leading-none tracking-[-0.02em]">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 lg:gap-3 flex-1 min-h-0">
          {/* Bar Chart */}
          <div className="bg-white rounded-xl p-3 lg:p-3.5 border border-brown/[0.04] shadow-sm flex flex-col">
            <div className="flex items-center gap-1.5 mb-2">
              <BarChart3 className="w-3 h-3 text-brown/30" strokeWidth={1.8} />
              <span className="font-body text-[10px] text-brown/40 uppercase tracking-wider">Weekly</span>
            </div>
            <div className="flex-1 flex items-end justify-between gap-1 px-1">
              {weekBars.map((bar) => (
                <div key={bar.day} className="flex flex-col items-center gap-1 flex-1">
                  <div
                    className="w-full max-w-[20px] rounded-sm bg-tan/20 transition-all duration-500"
                    style={{ height: bar.height }}
                  />
                  <span className="font-body text-[8px] text-brown/30">{bar.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Line Chart */}
          <div className="bg-white rounded-xl p-3 lg:p-3.5 border border-brown/[0.04] shadow-sm flex flex-col">
            <div className="flex items-center gap-1.5 mb-2">
              <TrendingUp className="w-3 h-3 text-brown/30" strokeWidth={1.8} />
              <span className="font-body text-[10px] text-brown/40 uppercase tracking-wider">Trend</span>
            </div>
            <div className="flex-1 flex items-center justify-center px-1">
              <svg viewBox="0 0 120 60" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C4956A" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#C4956A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 50 L20 42 L40 38 L60 28 L80 22 L100 10 L120 5"
                  fill="none"
                  stroke="#C4956A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M0 50 L20 42 L40 38 L60 28 L80 22 L100 10 L120 5 L120 60 L0 60 Z"
                  fill="url(#lineGrad)"
                />
                <circle cx="120" cy="5" r="3" fill="#C4956A" />
              </svg>
            </div>
          </div>

          {/* Donut Chart */}
          <div className="bg-white rounded-xl p-3 lg:p-3.5 border border-brown/[0.04] shadow-sm flex flex-col col-span-2 lg:col-span-1">
            <div className="flex items-center gap-1.5 mb-2">
              <div className="w-3 h-3 rounded-full bg-tan/30" />
              <span className="font-body text-[10px] text-brown/40 uppercase tracking-wider">Classes</span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <svg viewBox="0 0 80 80" className="w-16 h-16 lg:w-20 lg:h-20">
                <circle cx="40" cy="40" r="30" fill="none" stroke="#F0EAE0" strokeWidth="8" />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="#C4956A"
                  strokeWidth="8"
                  strokeDasharray={`${0.65 * 2 * Math.PI * 30} ${2 * Math.PI * 30}`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="30"
                  fill="none"
                  stroke="#8B9A6D"
                  strokeWidth="8"
                  strokeDasharray={`${0.25 * 2 * Math.PI * 30} ${2 * Math.PI * 30}`}
                  strokeDashoffset={`-${0.65 * 2 * Math.PI * 30}`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDashboard;
