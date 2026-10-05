import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Anime, HERO_SLIDES, CONTINUE_WATCHING, RECENTLY_ADDED, POPULAR_MOVIES } from '../data/animeData';
import { AnimeCard } from './AnimeCard';

interface ExploreViewProps {
  onSelectAnime: (anime: Anime) => void;
}

const ALL_ANIME_COMBINED = [
  ...HERO_SLIDES,
  ...CONTINUE_WATCHING,
  ...RECENTLY_ADDED,
  ...POPULAR_MOVIES
].filter((item, index, self) => index === self.findIndex((t) => t.id === item.id));

const GENRES = ["All", "Hindi Dubbed", "Action", "Shonen", "Movies", "Supernatural", "Romance", "Adventure"];

export const ExploreView: React.FC<ExploreViewProps> = ({ onSelectAnime }) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredAnime = ALL_ANIME_COMBINED.filter((anime) => {
    const matchesQuery =
      anime.title.toLowerCase().includes(query.toLowerCase()) ||
      (anime.hindiTitle && anime.hindiTitle.toLowerCase().includes(query.toLowerCase())) ||
      anime.genres.some((g: string) => g.toLowerCase().includes(query.toLowerCase()));

    if (selectedGenre === 'All') return matchesQuery;
    if (selectedGenre === 'Hindi Dubbed') return matchesQuery && anime.subtitle.includes('Hindi');
    if (selectedGenre === 'Movies') return matchesQuery && (anime.isMovie || anime.badge.includes('Movie'));

    return matchesQuery && anime.genres.includes(selectedGenre);
  });

  return (
    <div className="flex flex-col min-h-screen pb-28 animate-in fade-in duration-200">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-md p-4 border-b border-gray-200 space-y-3">
        <h1 className="text-xl font-black text-slate-900 font-['Outfit']">Explore Anime</h1>

        {/* Search Input Bar */}
        <div className="relative flex items-center">
          <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search anime, movies, Hindi dub..."
            className="w-full bg-white text-slate-900 text-xs pl-10 pr-9 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#e50914] transition-colors"
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

        {/* Genre Horizontal Filter Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {GENRES.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#e50914] text-white shadow'
                    : 'bg-white text-slate-700 hover:text-slate-900 border border-gray-200'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid List */}
      <div className="p-4">
        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-3 gap-3">
            {filteredAnime.map((anime) => (
              <AnimeCard
                key={anime.id}
                anime={anime}
                onClick={onSelectAnime}
              />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center space-y-2">
            <p className="text-sm font-semibold text-slate-800">No anime found matching "{query}"</p>
            <p className="text-xs text-slate-500">Try searching for "One Piece", "Hindi Dub", or "Demon Slayer".</p>
          </div>
        )}
      </div>
    </div>
  );
};
