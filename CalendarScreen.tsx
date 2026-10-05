import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Bell, CheckCircle2, Play, ChevronRight } from 'lucide-react';
import { Anime, HERO_SLIDES, RECENTLY_ADDED, POPULAR_MOVIES } from '../data/animeData';

export interface ScheduledEpisode {
  id: string;
  animeTitle: string;
  epNumber: number;
  releaseTime: string;
  hindiDub: boolean;
  poster: string;
  dateKey: string;
  summary: string;
  animeData: Anime;
}

interface CalendarScreenProps {
  onSelectAnime: (anime: Anime) => void;
}

export const DAYS_SCHEDULE = [
  { key: "mon", label: "Mon", dateNum: "05 Oct" },
  { key: "tue", label: "Tue", dateNum: "06 Oct" },
  { key: "wed", label: "Wed", dateNum: "07 Oct" },
  { key: "thu", label: "Thu", dateNum: "08 Oct" },
  { key: "fri", label: "Fri", dateNum: "09 Oct" },
  { key: "sat", label: "Sat", dateNum: "10 Oct" },
  { key: "sun", label: "Sun", dateNum: "11 Oct" }
];

export const SCHEDULED_EPISODES: ScheduledEpisode[] = [
  {
    id: "sc-1",
    animeTitle: "One Piece",
    epNumber: 1096,
    releaseTime: "06:30 PM IST",
    hindiDub: true,
    poster: "/src/assets/images/poster_one_piece_1791177966343.jpg",
    dateKey: "mon",
    summary: "Egghead Island Climax - Vegapunk's Great Speech",
    animeData: HERO_SLIDES[0]
  },
  {
    id: "sc-2",
    animeTitle: "Jujutsu Kaisen S2",
    epNumber: 48,
    releaseTime: "08:00 PM IST",
    hindiDub: true,
    poster: "/src/assets/images/jjk_continue_watching_1791182643396.jpg",
    dateKey: "mon",
    summary: "Shibuya Incident Aftermath & Cursed Spirits Strike",
    animeData: HERO_SLIDES[1]
  },
  {
    id: "sc-3",
    animeTitle: "Solo Leveling Season 2",
    epNumber: 13,
    releaseTime: "09:30 PM IST",
    hindiDub: true,
    poster: "/src/assets/images/solo_leveling_portrait_1791182678840.jpg",
    dateKey: "tue",
    summary: "Sung Jinwoo Monarch Skill Evolution",
    animeData: RECENTLY_ADDED[2] || HERO_SLIDES[0]
  },
  {
    id: "sc-4",
    animeTitle: "Demon Slayer S4",
    epNumber: 12,
    releaseTime: "07:00 PM IST",
    hindiDub: true,
    poster: "/src/assets/images/demon_slayer_portrait_1791182664683.jpg",
    dateKey: "wed",
    summary: "Infinity Castle Siege Begins",
    animeData: RECENTLY_ADDED[1] || HERO_SLIDES[0]
  },
  {
    id: "sc-5",
    animeTitle: "Dragon Ball Super S2",
    epNumber: 132,
    releaseTime: "05:00 PM IST",
    hindiDub: true,
    poster: "/src/assets/images/one_piece_hero_banner_1791182629860.jpg",
    dateKey: "thu",
    summary: "Multiverse God Battle Finale",
    animeData: POPULAR_MOVIES[1] || HERO_SLIDES[0]
  },
  {
    id: "sc-6",
    animeTitle: "Naruto Shippuden Special",
    epNumber: 501,
    releaseTime: "08:30 PM IST",
    hindiDub: true,
    poster: "/src/assets/images/naruto_continue_watching_1791182654215.jpg",
    dateKey: "fri",
    summary: "Shinobi World War Celebration Ep",
    animeData: POPULAR_MOVIES[2] || HERO_SLIDES[0]
  }
];

export const CalendarScreen: React.FC<CalendarScreenProps> = ({ onSelectAnime }) => {
  const [selectedDayKey, setSelectedDayKey] = useState("mon");
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const dayEpisodes = SCHEDULED_EPISODES.filter(
    (ep) => ep.dateKey === selectedDayKey
  );

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex flex-col min-h-screen pb-28 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-md p-4 border-b border-gray-200/80 space-y-3">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#e50914] text-white flex items-center justify-center shadow-md">
            <CalendarIcon className="w-5 h-5 fill-white" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 font-['Outfit'] leading-none">
              Anime Release Calendar
            </h1>
            <span className="text-[10px] font-semibold text-slate-500 mt-1 block">
              Upcoming Hindi Dub & Sub Airing Schedule
            </span>
          </div>
        </div>

        {/* Date Selector Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {DAYS_SCHEDULE.map((day) => {
            const isSelected = selectedDayKey === day.key;
            return (
              <button
                key={day.key}
                onClick={() => setSelectedDayKey(day.key)}
                className={`flex flex-col items-center justify-center py-2 px-3.5 rounded-2xl shrink-0 transition-all active:scale-95 ${
                  isSelected
                    ? "bg-[#e50914] text-white shadow-md shadow-[#e50914]/30"
                    : "bg-white text-slate-700 border border-gray-200 hover:bg-gray-50"
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-90">{day.label}</span>
                <span className="text-xs font-black font-['Outfit'] mt-0.5">{day.dateNum}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Episode Schedule List */}
      <div className="p-4 space-y-3">
        {dayEpisodes.length > 0 ? (
          dayEpisodes.map((ep) => {
            const isSet = !!reminders[ep.id];
            return (
              <div
                key={ep.id}
                onClick={() => onSelectAnime(ep.animeData)}
                className="bg-white p-3.5 rounded-3xl border border-gray-200/80 shadow-sm flex items-center justify-between gap-3 group cursor-pointer hover:border-[#e50914] transition-all"
              >
                {/* Poster */}
                <div className="relative w-16 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-900 shrink-0">
                  <img
                    src={ep.poster}
                    alt={ep.animeTitle}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-1 left-1 bg-[#e50914] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded-md shadow">
                    EP {ep.epNumber}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-900 truncate font-['Outfit'] group-hover:text-[#e50914] transition-colors">
                    {ep.animeTitle}
                  </h3>
                  <p className="text-[11px] font-semibold text-slate-600 line-clamp-1">
                    {ep.summary}
                  </p>

                  <div className="flex items-center gap-2 text-[10px] text-slate-500 pt-0.5">
                    <span className="flex items-center gap-1 font-bold text-slate-800 bg-gray-100 px-2 py-0.5 rounded-md">
                      <Clock className="w-3 h-3 text-[#e50914]" />
                      {ep.releaseTime}
                    </span>
                    <span className="text-emerald-600 font-bold flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" />
                      Hindi Dub 🇮🇳
                    </span>
                  </div>
                </div>

                {/* Reminder Action Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleReminder(ep.id);
                  }}
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all shrink-0 active:scale-90 ${
                    isSet
                      ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30"
                      : "bg-gray-100 text-slate-600 hover:bg-gray-200 border border-gray-200"
                  }`}
                  aria-label="Set reminder"
                >
                  <Bell className={`w-4 h-4 ${isSet ? "fill-white" : ""}`} />
                </button>
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center space-y-2 bg-white rounded-3xl border border-gray-200 shadow-sm my-6">
            <CalendarIcon className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-sm font-bold text-slate-900 font-['Outfit']">No Scheduled Releases</h3>
            <p className="text-xs text-slate-500">Check Monday or Tuesday for upcoming Hindi dubbed anime episodes.</p>
          </div>
        )}
      </div>
    </div>
  );
};
