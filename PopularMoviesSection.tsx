import React from 'react';
import { Star, ChevronRight, Film } from 'lucide-react';
import { Anime } from '../data/animeData';

interface PopularMoviesProps {
  items: Anime[];
  onSelect: (anime: Anime) => void;
  onViewAll: () => void;
}

export const PopularMoviesSection: React.FC<PopularMoviesProps> = ({
  items,
  onSelect,
  onViewAll
}) => {
  return (
    <section className="w-full mt-4 mb-4">
      {/* Section Header */}
      <div className="flex items-center justify-between px-4 mb-2.5">
        <h2 className="text-lg font-['Outfit'] font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
          <span>Popular Movies</span>
        </h2>
        <button
          onClick={onViewAll}
          className="flex items-center text-xs font-bold text-[#e50914] hover:text-red-700 active:scale-95 transition-transform"
        >
          <span>View All</span>
          <ChevronRight className="w-4 h-4 ml-0.5 text-[#e50914]" />
        </button>
      </div>

      {/* Cards Row */}
      <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar scroll-snap-x py-1">
        {items.map((anime) => (
          <div
            key={anime.id}
            onClick={() => onSelect(anime)}
            className="w-[30%] min-w-[104px] max-w-[120px] shrink-0 scroll-snap-align-start flex flex-col group cursor-pointer active:scale-95 transition-transform"
          >
            {/* Poster */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-gray-200/60">
              <img
                src={anime.poster}
                alt={anime.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />

              {/* Movie Tag */}
              <div className="absolute top-1.5 left-1.5 bg-[#e50914] text-white text-[8px] font-bold px-1.5 py-0.5 rounded-full shadow">
                MOVIE
              </div>

              {/* Top Right Rating Badge */}
              <div className="absolute top-1.5 right-1.5 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-0.5 border border-white/10 text-white">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                <span className="text-[9.5px] font-bold">{anime.rating}</span>
              </div>
            </div>

            {/* Title & Subtitle */}
            <div className="mt-1.5 flex flex-col">
              <h3 className="text-xs font-bold text-slate-900 truncate leading-tight group-hover:text-[#e50914] transition-colors">
                {anime.title}
              </h3>
              <p className="text-[10px] font-medium text-slate-500 truncate mt-0.5">
                {anime.subtitle || "Hindi Dub • Sub"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
