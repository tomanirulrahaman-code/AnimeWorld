import React from 'react';
import { Download, Play, Trash2, HardDrive, CheckCircle2 } from 'lucide-react';
import { Anime, Episode } from '../data/animeData';

export interface DownloadedItem {
  anime: Anime;
  episode: Episode;
  downloadedAt: string;
  sizeMB: number;
}

interface DownloadsViewProps {
  downloads: DownloadedItem[];
  onPlayEpisode: (anime: Anime, ep: Episode) => void;
  onRemoveDownload: (animeId: string, epId: string) => void;
}

export const DownloadsView: React.FC<DownloadsViewProps> = ({
  downloads,
  onPlayEpisode,
  onRemoveDownload
}) => {
  const totalMB = downloads.reduce((acc, curr) => acc + curr.sizeMB, 0);

  return (
    <div className="flex flex-col min-h-screen pb-28 animate-in fade-in duration-200">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#0a0a0c]/95 backdrop-blur-md p-4 border-b border-zinc-900 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Download className="w-5 h-5 text-[#ff0055]" />
            <h1 className="text-lg font-bold text-white font-['Outfit']">Offline Downloads</h1>
          </div>
          <span className="text-xs font-semibold text-[#ff0055] bg-[#ff0055]/10 px-2.5 py-1 rounded-full border border-[#ff0055]/30">
            {downloads.length} Episodes
          </span>
        </div>

        {/* Storage Bar Card */}
        <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 space-y-2">
          <div className="flex justify-between items-center text-xs text-zinc-300">
            <span className="flex items-center gap-1.5 font-medium">
              <HardDrive className="w-3.5 h-3.5 text-zinc-400" />
              Device Storage
            </span>
            <span className="font-mono text-[11px] text-zinc-400">
              {(totalMB / 1024).toFixed(2)} GB / 32 GB Used
            </span>
          </div>
          <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff0055] to-rose-400 rounded-full"
              style={{ width: `${Math.max(5, (totalMB / 32000) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Downloads List */}
      <div className="p-4 space-y-3">
        {downloads.length > 0 ? (
          downloads.map(({ anime, episode, downloadedAt, sizeMB }) => (
            <div
              key={`${anime.id}-${episode.id}`}
              className="p-3 bg-zinc-900/80 rounded-xl border border-zinc-800 flex items-center justify-between gap-3 hover:border-zinc-700 transition-all"
            >
              {/* Thumbnail / Poster */}
              <div
                onClick={() => onPlayEpisode(anime, episode)}
                className="relative w-16 aspect-[3/4] rounded-lg overflow-hidden bg-zinc-950 shrink-0 cursor-pointer group"
              >
                <img
                  src={anime.poster}
                  alt={anime.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Play className="w-5 h-5 text-white fill-white" />
                </div>
              </div>

              {/* Info */}
              <div
                onClick={() => onPlayEpisode(anime, episode)}
                className="flex-1 min-w-0 cursor-pointer space-y-0.5"
              >
                <h3 className="text-xs font-bold text-white truncate font-['Outfit']">
                  {anime.title}
                </h3>
                <p className="text-[11px] font-semibold text-[#ff0055] truncate">
                  EP {episode.epNumber} • {episode.title}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                  <span className="flex items-center gap-0.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    Hindi Dub 🇮🇳
                  </span>
                  <span>•</span>
                  <span>{sizeMB} MB</span>
                </div>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => onRemoveDownload(anime.id, episode.id)}
                aria-label="Remove download"
                className="w-8 h-8 rounded-lg bg-zinc-800/80 hover:bg-rose-950 hover:text-rose-400 text-zinc-400 flex items-center justify-center transition-all active:scale-90"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <div className="p-8 text-center space-y-3 bg-zinc-900/40 rounded-2xl border border-zinc-800/60 my-6">
            <Download className="w-8 h-8 text-zinc-600 mx-auto" />
            <h3 className="text-sm font-bold text-zinc-200">No Offline Downloads</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              Download your favorite anime episodes in Hindi Dub to watch anywhere offline without internet connection.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
