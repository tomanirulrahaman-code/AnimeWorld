import React from 'react';
import { Play, MoreVertical, ChevronRight } from 'lucide-react';
import { Anime } from '../data/animeData';

interface ContinueWatchingProps {
  items: Anime[];
  onPlay: (anime: Anime) => void;
  onViewAll: () => void;
  onMenuClick?: (anime: Anime) => void;
}

export const ContinueWatchingSection: React.FC<ContinueWatchingProps> = ({
  items,
  onPlay,
  onViewAll,
  onMenuClick
}) => {
  return (
    <section className="w-full mt-4 mb-2">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-2.5">
        <h2 className="text-lg font-['Outfit'] font-extrabold text-slate-900 tracking-tight">
          Continue Watching
        </h2>
        <button
          onClick={onViewAll}
          className="flex items-center text-xs font-bold text-[#e50914] hover:text-red-700 active:scale-95 transition-transform"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 ml-0.5 text-[#e50914]" />
        </button>
      </div>

      {/* Cards Container */}
      <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar scroll-snap-x py-1">
        {items.map((anime) => {
          const cw = anime.continueWatching || {
            timeLeft: "20m left",
            progressPercent: 50,
            seasonEpisodeInfo: "S1 E1 • Hindi Dub"
          };

          return (
            <div
              key={anime.id}
              className="w-[47%] min-w-[170px] max-w-[200px] shrink-0 scroll-snap-align-start flex flex-col group cursor-pointer"
            >
              {/* Image Box */}
              <div
                onClick={() => onPlay(anime)}
                className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-gray-200/60"
              >
                <img
                  src={anime.landscapeBanner || anime.poster}
                  alt={anime.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors" />

                {/* Top Right Remaining Time Badge */}
                <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-md text-white text-[9.5px] font-bold px-2 py-0.5 rounded-full border border-white/10">
                  {cw.timeLeft}
                </div>

                {/* Center Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md text-white flex items-center justify-center border border-white/20 shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                  </div>
                </div>

                {/* Bottom Red Progress Bar */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700/60">
                  <div
                    className="h-full bg-[#e50914] rounded-r-full shadow-[0_0_6px_#e50914]"
                    style={{ width: `${cw.progressPercent}%` }}
                  />
                </div>
              </div>

              {/* Card Meta below poster */}
              <div className="mt-1.5 flex items-start justify-between">
                <div className="flex flex-col min-w-0 flex-1 pr-1">
                  <h3 className="text-xs font-bold text-slate-900 truncate leading-tight group-hover:text-[#e50914] transition-colors">
                    {anime.title}
                  </h3>
                  <p className="text-[10px] font-medium text-slate-500 truncate mt-0.5">
                    {cw.seasonEpisodeInfo}
                  </p>
                </div>

                {/* Three Dot Menu */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onMenuClick) onMenuClick(anime);
                  }}
                  className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <MoreVertical className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
