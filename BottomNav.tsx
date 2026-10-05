import React from 'react';
import { Search, Download, Home, Tv, Calendar } from 'lucide-react';

export type TabType = 'search' | 'downloads' | 'home' | 'livetv' | 'calendar';

interface BottomNavProps {
  activeTab: TabType;
  onSelectTab: (tab: TabType) => void;
  downloadCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onSelectTab,
  downloadCount = 0
}) => {
  return (
    <nav
      aria-label="Main Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-gray-200/80 px-2 py-1.5 flex items-end justify-around shrink-0 max-w-[420px] mx-auto shadow-[0_-8px_20px_rgba(0,0,0,0.06)] select-none"
    >
      {/* 1. Search */}
      <button
        onClick={() => onSelectTab('search')}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-all active:scale-90 ${
          activeTab === 'search' ? 'text-[#e50914]' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Search className={`w-5 h-5 ${activeTab === 'search' ? 'stroke-[2.5px] text-[#e50914]' : 'stroke-[1.75px]'}`} />
        <span className={`text-[10px] font-['Outfit'] font-semibold mt-1 ${activeTab === 'search' ? 'text-[#e50914]' : ''}`}>
          Search
        </span>
      </button>

      {/* 2. Downloads */}
      <button
        onClick={() => onSelectTab('downloads')}
        className={`relative flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-all active:scale-90 ${
          activeTab === 'downloads' ? 'text-[#e50914]' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className="relative">
          <Download className={`w-5 h-5 ${activeTab === 'downloads' ? 'stroke-[2.5px] text-[#e50914]' : 'stroke-[1.75px]'}`} />
          {downloadCount > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#e50914] text-white text-[8px] font-bold min-w-[14px] h-[14px] rounded-full flex items-center justify-center px-1 border border-white shadow-sm">
              {downloadCount}
            </span>
          )}
        </div>
        <span className={`text-[10px] font-['Outfit'] font-semibold mt-1 ${activeTab === 'downloads' ? 'text-[#e50914]' : ''}`}>
          Downloads
        </span>
      </button>

      {/* 3. HOME (Center Item - Large Circular Red Button) */}
      <button
        onClick={() => onSelectTab('home')}
        className="flex flex-col items-center justify-center px-2 relative -top-3 transition-transform active:scale-95"
      >
        <div className="w-13 h-13 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg shadow-[#e50914]/50 ring-4 ring-[#f8f9fa] border border-amber-400/50">
          <Home className="w-6 h-6 fill-white text-white" />
        </div>
        <span className="text-[10px] font-['Outfit'] font-extrabold text-[#e50914] mt-1 tracking-wider uppercase">
          HOME
        </span>
      </button>

      {/* 4. Live TV */}
      <button
        onClick={() => onSelectTab('livetv')}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-all active:scale-90 ${
          activeTab === 'livetv' ? 'text-[#e50914]' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Tv className={`w-5 h-5 ${activeTab === 'livetv' ? 'stroke-[2.5px] text-[#e50914]' : 'stroke-[1.75px]'}`} />
        <span className={`text-[10px] font-['Outfit'] font-semibold mt-1 ${activeTab === 'livetv' ? 'text-[#e50914]' : ''}`}>
          Live TV
        </span>
      </button>

      {/* 5. Calendar */}
      <button
        onClick={() => onSelectTab('calendar')}
        className={`flex flex-col items-center justify-center py-1 px-2 min-w-[56px] transition-all active:scale-90 ${
          activeTab === 'calendar' ? 'text-[#e50914]' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Calendar className={`w-5 h-5 ${activeTab === 'calendar' ? 'stroke-[2.5px] text-[#e50914]' : 'stroke-[1.75px]'}`} />
        <span className={`text-[10px] font-['Outfit'] font-semibold mt-1 ${activeTab === 'calendar' ? 'text-[#e50914]' : ''}`}>
          Calendar
        </span>
      </button>
    </nav>
  );
};
