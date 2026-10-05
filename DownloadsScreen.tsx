import React from 'react';
import { Download, Play, Trash2, HardDrive, CheckCircle2, RefreshCw, FolderCheck, AlertCircle, Loader2 } from 'lucide-react';
import { Anime, Episode } from '../data/animeData';
import { DownloadTask, ANDROID_PUBLIC_MOVIES_PATH } from '../utils/androidDownloadManager';

interface DownloadsScreenProps {
  downloadTasks: DownloadTask[];
  onPlayEpisode: (anime: Anime, ep: Episode) => void;
  onRemoveDownload: (animeId: string, epId: string) => void;
  onRetryDownload: (anime: Anime, ep: Episode) => void;
}

export const DownloadsScreen: React.FC<DownloadsScreenProps> = ({
  downloadTasks,
  onPlayEpisode,
  onRemoveDownload,
  onRetryDownload
}) => {
  const completedTasks = downloadTasks.filter((t) => t.status === 'completed');
  const inProgressTasks = downloadTasks.filter((t) => t.status === 'downloading' || t.status === 'pending');
  const totalMB = downloadTasks.reduce((acc, curr) => acc + (curr.sizeMB || 240), 0);

  const formatBytes = (bytes: number) => {
    if (bytes <= 0) return '0 MB';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  return (
    <div className="flex flex-col min-h-screen pb-28 animate-in fade-in duration-200 select-none">
      {/* Top Header */}
      <div className="sticky top-0 z-30 bg-[#f8f9fa]/95 backdrop-blur-md p-4 border-b border-gray-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#e50914] text-white flex items-center justify-center shadow-md shadow-[#e50914]/20">
              <Download className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 font-['Outfit'] leading-none">
                Offline Downloads
              </h1>
              <span className="text-[10px] font-semibold text-slate-500 mt-1 block">
                Saved to Android Gallery ({ANDROID_PUBLIC_MOVIES_PATH})
              </span>
            </div>
          </div>
          <span className="text-xs font-bold text-[#e50914] bg-[#e50914]/10 px-3 py-1 rounded-full border border-[#e50914]/20">
            {completedTasks.length} Completed
          </span>
        </div>

        {/* Device Storage Status Card */}
        <div className="p-3.5 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-2">
          <div className="flex justify-between items-center text-xs font-semibold text-slate-800">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-4 h-4 text-slate-500" />
              Device Gallery Storage
            </span>
            <span className="font-mono text-[11px] text-slate-500">
              {(totalMB / 1024).toFixed(2)} GB / 32 GB Used
            </span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#e50914] rounded-full shadow-[0_0_8px_#e50914] transition-all duration-300"
              style={{ width: `${Math.max(8, (totalMB / 32000) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Downloads List */}
      <div className="p-4 space-y-3">
        {downloadTasks.length > 0 ? (
          downloadTasks.map((task) => {
            const { anime, episode, status, progressPercent, downloadedBytes, totalBytes, sizeMB, statusMessage, savedToGallery } = task;
            const isCompleted = status === 'completed';
            const isDownloading = status === 'downloading' || status === 'pending';
            const isFailed = status === 'failed';

            return (
              <div
                key={`${anime.id}-${episode.id}`}
                className="p-3.5 bg-white rounded-2xl border border-gray-200/80 shadow-sm space-y-3 hover:border-gray-300 transition-all"
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Thumbnail Image */}
                  <div
                    onClick={() => isCompleted && onPlayEpisode(anime, episode)}
                    className="relative w-16 aspect-[16/10] rounded-xl overflow-hidden bg-slate-900 shrink-0 cursor-pointer group"
                  >
                    <img
                      src={anime.landscapeBanner || anime.poster}
                      alt={anime.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    {isCompleted ? (
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                    ) : (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <Loader2 className="w-5 h-5 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  {/* Info Details */}
                  <div
                    onClick={() => isCompleted && onPlayEpisode(anime, episode)}
                    className="flex-1 min-w-0 cursor-pointer space-y-0.5"
                  >
                    <h3 className="text-xs font-bold text-slate-900 truncate font-['Outfit']">
                      {anime.title}
                    </h3>
                    <p className="text-[11px] font-bold text-[#e50914] truncate">
                      EP {episode.epNumber} • {episode.title}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-medium pt-0.5">
                      {isCompleted && (
                        <span className="flex items-center gap-1 text-emerald-600 font-extrabold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/60">
                          <FolderCheck className="w-3 h-3" />
                          Saved to Gallery
                        </span>
                      )}

                      {isDownloading && (
                        <span className="flex items-center gap-1 text-[#e50914] font-bold animate-pulse">
                          <Download className="w-3 h-3" />
                          Downloading {progressPercent}%
                        </span>
                      )}

                      {isFailed && (
                        <span className="flex items-center gap-1 text-rose-600 font-bold">
                          <AlertCircle className="w-3 h-3" />
                          Download Failed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons: Play/Retry/Delete */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {isFailed && (
                      <button
                        onClick={() => onRetryDownload(anime, episode)}
                        className="p-2 rounded-xl bg-amber-500 text-white font-bold text-xs flex items-center gap-1 active:scale-90 transition-transform shadow-sm"
                        aria-label="Retry download"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>Retry</span>
                      </button>
                    )}

                    {isCompleted && (
                      <button
                        onClick={() => onPlayEpisode(anime, episode)}
                        className="p-2 rounded-xl bg-[#e50914] text-white font-bold text-xs flex items-center gap-1 active:scale-90 transition-transform shadow-sm"
                        aria-label="Play offline"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Play</span>
                      </button>
                    )}

                    <button
                      onClick={() => onRemoveDownload(anime.id, episode.id)}
                      aria-label="Remove download"
                      className="w-8 h-8 rounded-xl bg-gray-100 hover:bg-rose-100 text-slate-500 hover:text-rose-600 flex items-center justify-center transition-all active:scale-90"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress Bar for Downloading Tasks */}
                {isDownloading && (
                  <div className="space-y-1 pt-1 border-t border-gray-100">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-600 font-mono">
                      <span>{statusMessage || 'Downloading MP4...'}</span>
                      <span>
                        {formatBytes(downloadedBytes)} / {formatBytes(totalBytes || sizeMB * 1024 * 1024)} ({progressPercent}%)
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#e50914] rounded-full transition-all duration-200"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-8 text-center space-y-3 bg-white rounded-3xl border border-gray-200/80 shadow-sm my-6">
            <Download className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900 font-['Outfit']">No Offline Downloads</h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Download your favorite Hindi Dub anime episodes directly to your Android device Gallery (<span className="font-semibold text-slate-700">{ANDROID_PUBLIC_MOVIES_PATH}</span>) to watch anytime offline.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
