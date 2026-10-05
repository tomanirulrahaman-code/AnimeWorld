import React, { useState } from 'react';
import { Search, X, Star } from 'lucide-react';
import {
  HERO_SLIDES,
  CONTINUE_WATCHING,
  RECENTLY_ADDED,
  POPULAR_MOVIES,
  Anime
} from '../data/animeData';

interface SearchScreenProps {
  onSelectAnime: (anime: Anime) => void;
}

const ALL_ANIME = [
  ...HERO_SLIDES,
  ...CONTINUE_WATCHING,
  ...RECENTLY_ADDED,
  ...POPULAR_MOVIES
].filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));

const QUICK_TAGS = ["One Piece", "Hindi Dub", "Jujutsu Kaisen", "Demon Slayer", "Solo Leveling", "Naruto", "Movies"];

export const SearchScreen: React.FC<SearchScreenProps> = ({ onSelectAnime }) => {
  const [query, setQuery] = useState('');

  const filtered = ALL_ANIME.filter((a) => {
    const q = query.toLowerCase();
    return (
      a.title.toLowerCase().includes(q) ||
      (a.subtitle && a.subtitle.toLowerCase().includes(q)) ||
      (a.genres && a.genres.some((g) => g.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="flex flex-col min-h-screen pb-28 animate-in fade-in duration-200">
      {/* Header Search Bar */}
      <div className="sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-md p-4 border-b border-gray-200/80 space-y-3">
        <h1 className="text-xl font-extrabold text-slate-900 font-['Outfit']">Search Anime</h1>

        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search One Piece, Naruto, Hindi Dub..."
            className="w-full bg-white text-slate-900 text-xs pl-10 pr-9 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#e50914] shadow-sm transition-all"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tag Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-1">
          {QUICK_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1.5 bg-white border border-gray-200 text-slate-700 text-xs font-semibold rounded-full shrink-0 hover:border-[#e50914] hover:text-[#e50914] transition-all shadow-sm"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Results */}
      <div className="p-4">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {filtered.map((anime) => (
              <div
                key={anime.id}
                onClick={() => onSelectAnime(anime)}
                className="flex flex-col cursor-pointer group active:scale-95 transition-transform"
              >
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-md border border-gray-200/60">
                  <img
                    src={anime.poster}
                    alt={anime.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-1.5 right-1.5 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-lg flex items-center gap-0.5">
                    <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                    <span>{anime.rating}</span>
                  </div>
                </div>
                <h3 className="text-xs font-bold text-slate-900 truncate mt-1 leading-tight group-hover:text-[#e50914]">
                  {anime.title}
                </h3>
                <p className="text-[9.5px] font-medium text-slate-500 truncate mt-0.5">
                  {anime.subtitle || "Hindi Dub • Sub"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center space-y-2">
            <p className="text-sm font-bold text-slate-800">No results found for "{query}"</p>
            <p className="text-xs text-slate-500">Try searching for "One Piece", "Hindi Dub", or "Demon Slayer".</p>
          </div>
        )}
      </div>
    </div>
  );
};
