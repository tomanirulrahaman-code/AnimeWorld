import React from 'react';
import { X, Play, Download, Star, CheckCircle, Share2, Film } from 'lucide-react';
import { Anime, Episode } from '../data/animeData';

interface AnimeDetailsModalProps {
  anime: Anime;
  onClose: () => void;
  onPlayEpisode: (anime: Anime, ep?: Episode) => void;
  onDownloadEpisode: (anime: Anime, ep: Episode) => void;
  isDownloaded?: boolean;
}

export const AnimeDetailsModal: React.FC<AnimeDetailsModalProps> = ({
  anime,
  onClose,
  onPlayEpisode,
  onDownloadEpisode,
  isDownloaded = false
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#f8f9fa] flex flex-col max-w-[420px] mx-auto overflow-y-auto no-scrollbar animate-in slide-in-from-bottom duration-200">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#f8f9fa]/90 backdrop-blur-md p-4 flex items-center justify-between border-b border-gray-200">
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-gray-200 text-slate-800 flex items-center justify-center active:scale-90"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-sm font-extrabold text-slate-900 truncate font-['Outfit'] max-w-[200px]">
          {anime.title}
        </h2>

        <button
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: `${anime.title} on AnimeWorld`,
                url: window.location.href
              }).catch(() => {});
            }
          }}
          className="w-9 h-9 rounded-full bg-gray-200 text-slate-800 flex items-center justify-center active:scale-90"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Banner / Poster */}
      <div className="relative w-full aspect-[16/10] bg-slate-900 shrink-0">
        <img
          src={anime.landscapeBanner || anime.poster}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
          <div>
            <h1 className="text-2xl font-black font-['Outfit'] uppercase drop-shadow-md">
              {anime.title}
            </h1>
            <p className="text-xs text-red-400 font-bold mt-0.5">
              {anime.subtitle || "Hindi Dub • Sub"}
            </p>
          </div>

          <button
            onClick={() => onPlayEpisode(anime)}
            className="w-12 h-12 rounded-full bg-[#e50914] text-white flex items-center justify-center shadow-lg shadow-[#e50914]/50 active:scale-90"
          >
            <Play className="w-6 h-6 fill-white ml-0.5" />
          </button>
        </div>
      </div>

      {/* Details Meta */}
      <div className="p-4 space-y-3 bg-white border-b border-gray-200/80">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200 text-amber-700">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{anime.rating}</span>
          </div>

          <span className="bg-gray-100 px-3 py-1 rounded-full text-slate-700 border border-gray-200">
            {anime.year}
          </span>

          <span className="bg-[#e50914] text-white px-3 py-1 rounded-full text-[11px]">
            Hindi Dub 🇮🇳
          </span>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          {anime.synopsis}
        </p>
      </div>

      {/* Episode List */}
      <div className="p-4 space-y-2.5">
        <h3 className="text-sm font-extrabold text-slate-900 font-['Outfit']">
          Episodes ({anime.episodes?.length || 1})
        </h3>

        {anime.episodes && anime.episodes.length > 0 ? (
          anime.episodes.map((ep) => (
            <div
              key={ep.id}
              onClick={() => onPlayEpisode(anime, ep)}
              className="p-3 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between cursor-pointer hover:border-[#e50914] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#e50914]/10 text-[#e50914] font-bold text-xs flex items-center justify-center">
                  {ep.epNumber}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{ep.title}</h4>
                  <span className="text-[10px] font-semibold text-slate-500">{ep.duration} • Hindi Dub Available</span>
                </div>
              </div>

              <Play className="w-4 h-4 text-[#e50914] fill-[#e50914]" />
            </div>
          ))
        ) : (
          <div className="p-4 bg-white rounded-2xl border border-gray-200 text-center text-xs font-medium text-slate-600">
            Full Movie Streaming in 1080p Hindi Dub
          </div>
        )}
      </div>
    </div>
  );
};
