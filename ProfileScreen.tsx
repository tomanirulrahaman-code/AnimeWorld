import React, { useState } from 'react';
import { User, ShieldCheck, Languages, Moon, Download, Heart, Settings, LogOut, ChevronRight, Award } from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const [appLang, setAppLang] = useState<'hindi' | 'english'>('hindi');

  return (
    <div className="flex flex-col min-h-screen pb-28 animate-in fade-in duration-200">
      {/* Header Profile Card */}
      <div className="bg-white p-5 border-b border-gray-200/80 space-y-4">
        <div className="flex items-center gap-3.5">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"
              alt="User Avatar"
              className="w-16 h-16 rounded-2xl object-cover border-2 border-[#e50914] shadow-md"
            />
            <span className="absolute -bottom-1 -right-1 bg-[#e50914] text-white p-1 rounded-full text-[9px] shadow">
              <ShieldCheck className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg font-extrabold text-slate-900 font-['Outfit']">AnimeWorld Otaku</h1>
              <span className="bg-[#e50914]/10 text-[#e50914] text-[9.5px] font-extrabold px-2 py-0.5 rounded-md border border-[#e50914]/30">
                PRO
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">otaku_india_2026@animeworld.in</p>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1">
              VIP Unlimited Hindi Dub Stream Active
            </span>
          </div>
        </div>

        {/* Watch Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5 pt-2">
          <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-200/80 text-center">
            <span className="text-lg font-black text-slate-900 font-['Outfit']">48</span>
            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Episodes</p>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-200/80 text-center">
            <span className="text-lg font-black text-[#e50914] font-['Outfit']">24h</span>
            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Watch Time</p>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-200/80 text-center">
            <span className="text-lg font-black text-amber-500 font-['Outfit']">12</span>
            <p className="text-[10px] font-semibold text-slate-500 mt-0.5">Downloads</p>
          </div>
        </div>
      </div>

      {/* Settings Options */}
      <div className="p-4 space-y-4">
        {/* Language Preference */}
        <div className="bg-white p-3.5 rounded-2xl border border-gray-200/80 shadow-sm space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-red-50 text-[#e50914] flex items-center justify-center">
                <Languages className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-slate-900">Audio & Subtitle Language</h3>
                <p className="text-[10px] text-slate-500">Preferred streaming language</p>
              </div>
            </div>

            <div className="flex items-center bg-gray-100 p-1 rounded-xl border border-gray-200">
              <button
                onClick={() => setAppLang('hindi')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  appLang === 'hindi' ? 'bg-[#e50914] text-white shadow' : 'text-slate-600'
                }`}
              >
                Hindi 🇮🇳
              </button>
              <button
                onClick={() => setAppLang('english')}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                  appLang === 'english' ? 'bg-[#e50914] text-white shadow' : 'text-slate-600'
                }`}
              >
                English 🇬🇧
              </button>
            </div>
          </div>
        </div>

        {/* Quick Menu items */}
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm divide-y divide-gray-100 overflow-hidden">
          <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#e50914]" />
              <span className="text-xs font-bold text-slate-900">My Watchlist</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-bold text-slate-900">AnimeWorld Otaku VIP Rewards</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>

          <div className="p-3.5 flex items-center justify-between hover:bg-gray-50 cursor-pointer">
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-slate-600" />
              <span className="text-xs font-bold text-slate-900">Playback & Video Quality Settings</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
