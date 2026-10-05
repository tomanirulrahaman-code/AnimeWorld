import React from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import { Anime } from '../data/animeData';
import { AnimeCard } from './AnimeCard';

interface SeeAllModalProps {
  title: string;
  animeList: Anime[];
  onClose: () => void;
  onSelectAnime: (anime: Anime) => void;
}

export const SeeAllModal: React.FC<SeeAllModalProps> = ({
  title,
  animeList,
  onClose,
  onSelectAnime
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-[#0a0a0c] flex flex-col max-w-md mx-auto overflow-y-auto no-scrollbar animate-in slide-in-from-right duration-200">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#0a0a0c]/95 backdrop-blur-md px-4 py-3.5 flex items-center justify-between border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-900 text-zinc-300 hover:text-white flex items-center justify-center transition-all active:scale-90"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4 bg-[#ff0055] rounded-full shadow-[0_0_8px_#ff0055]" />
            <h1 className="text-base font-bold text-white font-['Outfit']">
              {title}
            </h1>
          </div>
        </div>
        <span className="text-xs font-semibold text-zinc-400">
          {animeList.length} Anime
        </span>
      </div>

      {/* Grid Content */}
      <div className="p-4 pb-28">
        <div className="flex flex-wrap gap-3.5 justify-start">
          {animeList.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              onClick={onSelectAnime}
              showEpisodeBadge={title.toLowerCase().includes('latest')}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
