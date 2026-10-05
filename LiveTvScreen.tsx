import React from 'react';
import { Tv } from 'lucide-react';

export const LiveTvScreen: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen pb-28 bg-[#f8f9fa] animate-in fade-in duration-200">
      {/* Live TV Page Header */}
      <div className="sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-md p-4 border-b border-gray-200/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-[#e50914] text-white flex items-center justify-center shadow-md shadow-[#e50914]/20">
          <Tv className="w-5 h-5 fill-white" />
        </div>
        <h1 className="text-xl font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
          Live TV
        </h1>
      </div>

      {/* Clean Empty State Container */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-auto">
        <div className="w-20 h-20 rounded-3xl bg-white border border-gray-200/90 shadow-sm flex items-center justify-center mb-4 text-[#e50914]">
          <Tv className="w-10 h-10 stroke-[1.75]" />
        </div>

        <h2 className="text-lg font-extrabold text-slate-900 font-['Outfit'] tracking-tight">
          No Live Channels
        </h2>

        <p className="text-xs font-semibold text-slate-500 mt-1 max-w-xs leading-relaxed">
          Live TV channels will appear here later.
        </p>
      </div>
    </div>
  );
};
