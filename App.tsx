import React, { useState, useEffect, useRef } from 'react';
import { HomeScreen } from './screens/HomeScreen';
import { SearchScreen } from './screens/SearchScreen';
import { DownloadsScreen } from './screens/DownloadsScreen';
import { LiveTvScreen } from './screens/LiveTvScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { AnimeDetailsModal } from './screens/AnimeDetailsModal';
import { SeeAllModal } from './components/SeeAllModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { UpdateModal } from './components/UpdateModal';
import { BottomNav, TabType } from './components/BottomNav';
import { AndroidFrame } from './components/AndroidFrame';
import {
  HERO_SLIDES,
  POPULAR_MOVIES,
  Anime,
  Episode
} from './data/animeData';
import {
  DownloadTask,
  generateAndroidFileName,
  downloadVideoToAndroidGallery,
  ANDROID_PUBLIC_MOVIES_PATH
} from './utils/androidDownloadManager';
import {
  checkUpdateAvailable,
  dismissUpdateVersion,
  UpdateConfig,
  INSTALLED_VERSION
} from './utils/updateService';
import { FolderCheck } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [selectedAnime, setSelectedAnime] = useState<Anime | null>(null);
  const [playingAnime, setPlayingAnime] = useState<Anime | null>(null);
  const [playingEpisode, setPlayingEpisode] = useState<Episode | undefined>(undefined);
  const [seeAllSection, setSeeAllSection] = useState<{ title: string; list: Anime[] } | null>(null);
  
  // Update detection state - defaults to false until check completed
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
  const [updateConfig, setUpdateConfig] = useState<UpdateConfig>({
    latestVersion: INSTALLED_VERSION,
    updateAvailable: false,
    downloadUrl: 'https://t.me/+q45jqELWagdmODBl'
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Pre-downloaded sample tasks
  const [downloadTasks, setDownloadTasks] = useState<DownloadTask[]>([
    {
      id: 'op-1095',
      anime: HERO_SLIDES[0], // One Piece
      episode: HERO_SLIDES[0].episodes[0],
      fileName: 'One_Piece_EP1095_AnimeWorld.mp4',
      filePath: `${ANDROID_PUBLIC_MOVIES_PATH}/One_Piece_EP1095_AnimeWorld.mp4`,
      progressPercent: 100,
      downloadedBytes: 280 * 1024 * 1024,
      totalBytes: 280 * 1024 * 1024,
      status: 'completed',
      statusMessage: 'Download Complete • Saved to Gallery',
      downloadedAt: 'Today',
      sizeMB: 280,
      savedToGallery: true
    },
    {
      id: 'yn-full',
      anime: POPULAR_MOVIES[3], // Your Name
      episode: POPULAR_MOVIES[3].episodes[0],
      fileName: 'Your_Name_EP1_AnimeWorld.mp4',
      filePath: `${ANDROID_PUBLIC_MOVIES_PATH}/Your_Name_EP1_AnimeWorld.mp4`,
      progressPercent: 100,
      downloadedBytes: 850 * 1024 * 1024,
      totalBytes: 850 * 1024 * 1024,
      status: 'completed',
      statusMessage: 'Download Complete • Saved to Gallery',
      downloadedAt: 'Yesterday',
      sizeMB: 850,
      savedToGallery: true
    }
  ]);

  const mainScrollRef = useRef<HTMLDivElement>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Silent update check on app launch
  useEffect(() => {
    checkUpdateAvailable().then(({ shouldShowModal, config }) => {
      setUpdateConfig(config);
      if (shouldShowModal) {
        setShowUpdateModal(true);
      }
    });
  }, []);

  // Toast message trigger helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Reset scroll position on launch & tab change
  useEffect(() => {
    window.scrollTo(0, 0);
    if (mainScrollRef.current) {
      mainScrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const handlePlayAnime = (anime: Anime, ep?: Episode) => {
    setPlayingAnime(anime);
    setPlayingEpisode(ep || (anime.episodes && anime.episodes[0]));
  };

  const handleInfoAnime = (anime: Anime) => {
    setSelectedAnime(anime);
  };

  const handleViewAllSection = (title: string, list: Anime[]) => {
    setSeeAllSection({ title, list });
  };

  const handleCloseUpdateModal = () => {
    dismissUpdateVersion(updateConfig.latestVersion);
    setShowUpdateModal(false);
  };

  // Initiate real Android MediaStore / Browser download
  const startTaskDownload = (anime: Anime, ep: Episode) => {
    const taskId = `${anime.id}-${ep.id}`;
    const fileName = generateAndroidFileName(anime.title, ep.epNumber);
    const filePath = `${ANDROID_PUBLIC_MOVIES_PATH}/${fileName}`;

    const newTask: DownloadTask = {
      id: taskId,
      anime,
      episode: ep,
      fileName,
      filePath,
      progressPercent: 0,
      downloadedBytes: 0,
      totalBytes: 240 * 1024 * 1024,
      status: 'downloading',
      statusMessage: 'Starting MP4 download...',
      downloadedAt: 'Just now',
      sizeMB: 240,
      savedToGallery: false
    };

    setDownloadTasks((prev) => {
      const filtered = prev.filter((t) => !(t.anime.id === anime.id && t.episode.id === ep.id));
      return [newTask, ...filtered];
    });

    showToast(`Downloading: ${anime.title} EP ${ep.epNumber}`);

    // Call real Android download procedure
    downloadVideoToAndroidGallery(
      newTask,
      (progress, downloadedBytes, totalBytes) => {
        setDownloadTasks((prev) =>
          prev.map((t) => {
            if (t.anime.id === anime.id && t.episode.id === ep.id) {
              return {
                ...t,
                progressPercent: progress,
                downloadedBytes,
                totalBytes: totalBytes || t.totalBytes,
                statusMessage: progress < 100 ? `Downloading ${progress}%` : 'Download Complete'
              };
            }
            return t;
          })
        );
      },
      () => {
        // On Success
        setDownloadTasks((prev) =>
          prev.map((t) => {
            if (t.anime.id === anime.id && t.episode.id === ep.id) {
              return {
                ...t,
                status: 'completed',
                progressPercent: 100,
                savedToGallery: true,
                statusMessage: 'Download Complete • Saved to Gallery'
              };
            }
            return t;
          })
        );
        showToast(`Download Complete! Saved to Gallery (${ANDROID_PUBLIC_MOVIES_PATH})`);
      },
      () => {
        // On Error
        setDownloadTasks((prev) =>
          prev.map((t) => {
            if (t.anime.id === anime.id && t.episode.id === ep.id) {
              return {
                ...t,
                status: 'failed',
                statusMessage: 'Failed • Tap Retry'
              };
            }
            return t;
          })
        );
        showToast(`Download failed. Tap Retry in Downloads.`);
      }
    );
  };

  const handleDownloadEpisode = (anime: Anime, ep: Episode) => {
    const existing = downloadTasks.find((t) => t.anime.id === anime.id && t.episode.id === ep.id);
    if (!existing || existing.status === 'failed') {
      startTaskDownload(anime, ep);
    } else {
      showToast(`${anime.title} EP ${ep.epNumber} is already in Downloads`);
    }
  };

  const handleRemoveDownload = (animeId: string, epId: string) => {
    setDownloadTasks((prev) =>
      prev.filter((d) => !(d.anime.id === animeId && d.episode.id === epId))
    );
    showToast('Download removed from list');
  };

  return (
    <AndroidFrame>
      <div
        ref={mainScrollRef}
        className="flex-1 w-full bg-[#f8f9fa] text-slate-900 flex flex-col no-scrollbar overflow-y-auto overflow-x-hidden selection:bg-[#e50914] selection:text-white relative"
      >
        {/* Floating Toast Notification Banner */}
        {toastMessage && (
          <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 max-w-[380px] w-[90%] bg-slate-900/95 text-white backdrop-blur-md p-3 px-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="w-8 h-8 rounded-xl bg-[#e50914] text-white flex items-center justify-center shrink-0">
              <FolderCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-bold font-['Outfit'] block truncate">
                {toastMessage}
              </span>
            </div>
          </div>
        )}

        {/* Render Selected Tab Screen */}
        {activeTab === 'home' && (
          <HomeScreen
            onPlayAnime={(anime) => handlePlayAnime(anime)}
            onInfoAnime={handleInfoAnime}
            onViewAllSection={handleViewAllSection}
            onOpenNotifications={() => setActiveTab('calendar')}
          />
        )}

        {activeTab === 'search' && (
          <SearchScreen onSelectAnime={handleInfoAnime} />
        )}

        {activeTab === 'downloads' && (
          <DownloadsScreen
            downloadTasks={downloadTasks}
            onPlayEpisode={(anime, ep) => handlePlayAnime(anime, ep)}
            onRemoveDownload={handleRemoveDownload}
            onRetryDownload={handleDownloadEpisode}
          />
        )}

        {activeTab === 'livetv' && (
          <LiveTvScreen />
        )}

        {activeTab === 'calendar' && (
          <CalendarScreen onSelectAnime={handleInfoAnime} />
        )}

        {/* ANIMEWORLD FIXED 5-ITEM BOTTOM NAVIGATION */}
        <BottomNav
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          downloadCount={downloadTasks.length}
        />

        {/* Video Player Modal */}
        {playingAnime && (
          <VideoPlayerModal
            anime={playingAnime}
            selectedEpisode={playingEpisode}
            onClose={() => setPlayingAnime(null)}
            onDownloadEpisode={handleDownloadEpisode}
            isDownloaded={downloadTasks.some(
              (d) =>
                d.anime.id === playingAnime.id &&
                playingEpisode &&
                d.episode.id === playingEpisode.id &&
                d.status === 'completed'
            )}
          />
        )}

        {/* Anime Info Modal */}
        {selectedAnime && (
          <AnimeDetailsModal
            anime={selectedAnime}
            onClose={() => setSelectedAnime(null)}
            onPlayEpisode={(anime, ep) => {
              setSelectedAnime(null);
              handlePlayAnime(anime, ep);
            }}
            onDownloadEpisode={handleDownloadEpisode}
          />
        )}

        {/* See All Grid Listing Modal */}
        {seeAllSection && (
          <SeeAllModal
            title={seeAllSection.title}
            animeList={seeAllSection.list}
            onClose={() => setSeeAllSection(null)}
            onSelectAnime={(anime) => {
              setSeeAllSection(null);
              handleInfoAnime(anime);
            }}
          />
        )}

        {/* New Update Available Modal */}
        <UpdateModal
          isOpen={showUpdateModal}
          onClose={handleCloseUpdateModal}
          latestVersion={updateConfig.latestVersion}
          downloadUrl={updateConfig.downloadUrl}
          releaseNotes={updateConfig.releaseNotes}
        />
      </div>
    </AndroidFrame>
  );
}
