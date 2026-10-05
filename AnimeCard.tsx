import React, { useState } from 'react';
import { Star, Film } from 'lucide-react';
import { Anime } from '../data/animeData';

interface AnimeCardProps {
  anime: Anime;
  onClick: (anime: Anime) => void;
  showEpisodeBadge?: boolean;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick, showEpisodeBadge }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={() => onClick(anime)}
      className="group cursor-pointer w-[98px] min-w-[94px] max-w-[108px] shrink-0 scroll-snap-align-start flex flex-col transition-transform duration-150 active:scale-95"
    >
      {/* Poster Container */}
      <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800/80 shadow-md shadow-black/40">
        {!imgError && anime.poster ? (
          <img
            src={anime.poster}
            alt={anime.title}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        ) : (
          /* High-quality styled CSS Fallback Container */
          <div className={`w-full h-full bg-gradient-to-br ${anime.backdropBg || 'from-rose-950 to-zinc-900'} p-2 flex flex-col justify-between relative`}>
            <div className="flex justify-between items-start">
              <Film className="w-4 h-4 text-[#ff0055]" />
              <span className="text-[9px] font-bold text-amber-400 bg-black/60 px-1 py-0.5 rounded">
                ★ {anime.rating}
              </span>
            </div>
            <div className="z-10">
              <p className="text-[10px] font-bold text-white line-clamp-2 leading-tight">
                {anime.title}
              </p>
            </div>
          </div>
        )}

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 pointer-events-none" />

        {/* Rating Badge */}
        <div className="absolute top-1 right-1 bg-black/75 backdrop-blur-md px-1 py-0.5 rounded flex items-center gap-0.5 border border-white/10">
          <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
          <span className="text-[9px] font-bold text-zinc-100">
            {anime.rating}
          </span>
        </div>

        {/* Episode Badge if latest */}
        {showEpisodeBadge && anime.episodes && anime.episodes.length > 0 && (
          <div className="absolute bottom-1 left-1 bg-[#ff0055]/95 text-white text-[8.5px] font-bold px-1.5 py-0.5 rounded shadow">
            EP {anime.episodes[0].epNumber}
          </div>
        )}
      </div>

      {/* Info Section below poster */}
      <div className="mt-1 flex flex-col">
        {/* Title */}
        <h3 className="text-[11px] font-semibold text-zinc-100 truncate leading-snug group-hover:text-[#ff0055] transition-colors">
          {anime.title}
        </h3>

        {/* Subtitle / Badge text */}
        <p className="text-[9.5px] font-medium text-zinc-400 truncate mt-0.5">
          {anime.badge}
        </p>
      </div>
    </div>
  );
};
