import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Sun,
  Maximize,
  Download,
  Share2,
  Cast,
  Lock,
  Unlock,
  Gauge,
  Maximize2,
  Subtitles,
  Globe,
  AlertCircle,
  Check
} from 'lucide-react';
import Hls from 'hls.js';
import { Anime, Episode, VIDEO_URL } from '../data/animeData';

interface VideoPlayerModalProps {
  anime: Anime;
  selectedEpisode?: Episode;
  onClose: () => void;
  onDownloadEpisode: (anime: Anime, ep: Episode) => void;
  isDownloaded?: boolean;
}

type ModalMenuType = 'none' | 'speed' | 'quality' | 'fit' | 'subtitles' | 'audio';

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  anime,
  selectedEpisode,
  onClose,
  onDownloadEpisode,
  isDownloaded = false
}) => {
  const defaultEp = selectedEpisode || (anime.episodes && anime.episodes[0]) || {
    id: `${anime.id}-ep1`,
    epNumber: 1,
    title: `${anime.title} - Episode 1`,
    duration: '23:00',
    hindiDubAvailable: true,
    streamUrl: VIDEO_URL,
    summary: anime.synopsis
  };

  const [activeEp, setActiveEp] = useState<Episode>(defaultEp);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [brightness, setBrightness] = useState(100);

  // Custom Controls State
  const [showControls, setShowControls] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2);
  const [quality, setQuality] = useState<string>('1080p');
  const [fitMode, setFitMode] = useState<'contain' | 'cover' | 'none'>('contain');
  const [subtitleTrack, setSubtitleTrack] = useState<string>('Hindi');
  const [audioTrack, setAudioTrack] = useState<string>('Japanese');
  const [activeMenu, setActiveMenu] = useState<ModalMenuType>('none');
  const [hasError, setHasError] = useState(false);
  const [downloadedState, setDownloadedState] = useState(isDownloaded);

  const videoRef = useRef<HTMLVideoElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimerRef = useRef<NodeJS.Timeout | null>(null);

  const streamUrl = activeEp.streamUrl || VIDEO_URL;

  // Listen for fullscreen state changes & manage orientation restoration
  useEffect(() => {
    const handleFSChange = () => {
      const isFS = !!document.fullscreenElement || !!(document as any).webkitFullscreenElement;
      setIsFullscreen(isFS);

      if (!isFS) {
        if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
          try { window.screen.orientation.unlock(); } catch (e) {}
        }
        if ((window as any).AndroidOrientationBridge?.exitFullscreenPortrait) {
          (window as any).AndroidOrientationBridge.exitFullscreenPortrait();
        }
      }
    };

    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
      document.removeEventListener('webkitfullscreenchange', handleFSChange);

      // On unmount: ensure orientation is unlocked & system UI restored
      if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
        try { window.screen.orientation.unlock(); } catch (e) {}
      }
      if ((window as any).AndroidOrientationBridge?.exitFullscreenPortrait) {
        (window as any).AndroidOrientationBridge.exitFullscreenPortrait();
      }
    };
  }, []);

  // Auto-hide controls timer
  const resetHideTimer = () => {
    setShowControls(true);
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
    }

    // Only set auto-hide timer if video is actively playing and no popup menu is open
    if (isPlaying && activeMenu === 'none') {
      hideControlsTimerRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    if (!isPlaying) {
      // Keep controls visible indefinitely while video is paused
      setShowControls(true);
      if (hideControlsTimerRef.current) {
        clearTimeout(hideControlsTimerRef.current);
      }
    } else {
      resetHideTimer();
    }
    return () => {
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    };
  }, [isPlaying, activeMenu]);

  // Handle Screen Tap on Video Container
  const handleScreenTap = () => {
    if (!showControls) {
      // Tap when hidden -> show controls & start 3s timer
      resetHideTimer();
    } else if (isPlaying && activeMenu === 'none') {
      // Tap when controls visible & playing -> hide controls
      setShowControls(false);
      if (hideControlsTimerRef.current) clearTimeout(hideControlsTimerRef.current);
    }
  };

  // Load Stream Source (HLS or MP4)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setHasError(false);
    setCurrentTime(0);
    setIsPlaying(false);

    let hlsInstance: Hls | null = null;
    const isM3u8 = streamUrl.toLowerCase().includes('.m3u8');

    if (isM3u8) {
      if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = streamUrl;
      } else if (Hls.isSupported()) {
        hlsInstance = new Hls({ enableWorker: true });
        hlsInstance.loadSource(streamUrl);
        hlsInstance.attachMedia(video);
        hlsInstance.on(Hls.Events.ERROR, () => setHasError(true));
      } else {
        video.src = streamUrl;
      }
    } else {
      video.src = streamUrl;
    }

    video.load();

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }

    return () => {
      if (hlsInstance) hlsInstance.destroy();
    };
  }, [activeEp]);

  // Play/Pause Toggle
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => setHasError(true));
    } else {
      video.pause();
      setIsPlaying(false);
    }
    resetHideTimer();
  };

  // Time Update
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      if (video.duration && !isNaN(video.duration)) {
        setDuration(video.duration);
      }
    }
  };

  // Seek
  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime = time;
      setCurrentTime(time);
    }
    resetHideTimer();
  };

  // Skip -10s / +10s
  const skipTime = (seconds: number) => {
    const video = videoRef.current;
    if (video) {
      const target = Math.max(0, Math.min(video.duration || 0, video.currentTime + seconds));
      video.currentTime = target;
      setCurrentTime(target);
    }
    resetHideTimer();
  };

  // Playback Speed Change
  const setSpeed = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) {
      videoRef.current.playbackRate = speed;
    }
    setActiveMenu('none');
    resetHideTimer();
  };

  // Volume Change
  const handleVolumeChange = (v: number) => {
    setVolume(v);
    if (videoRef.current) {
      videoRef.current.volume = v;
      videoRef.current.muted = v === 0;
    }
  };

  // Close Player & Restore Orientation
  const handleClosePlayer = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
    if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
      try { window.screen.orientation.unlock(); } catch (e) {}
    }
    if ((window as any).AndroidOrientationBridge?.exitFullscreenPortrait) {
      (window as any).AndroidOrientationBridge.exitFullscreenPortrait();
    }
    onClose();
  };

  // Fullscreen Request & Landscape Lock
  const handleFullscreen = () => {
    const container = playerContainerRef.current;
    if (!container) return;

    if (!isFullscreen && !document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      } else if ((container as any).webkitRequestFullscreen) {
        (container as any).webkitRequestFullscreen();
      }

      // Lock Web orientation to landscape
      if (window.screen && window.screen.orientation && window.screen.orientation.lock) {
        (window.screen.orientation.lock as any)('landscape').catch(() => {});
      }

      // Native Android orientation bridge
      if ((window as any).AndroidOrientationBridge?.enterFullscreenLandscape) {
        (window as any).AndroidOrientationBridge.enterFullscreenLandscape();
      }

      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      } else if ((document as any).webkitExitFullscreen) {
        (document as any).webkitExitFullscreen();
      }

      if (window.screen && window.screen.orientation && window.screen.orientation.unlock) {
        try { window.screen.orientation.unlock(); } catch (e) {}
      }

      if ((window as any).AndroidOrientationBridge?.exitFullscreenPortrait) {
        (window as any).AndroidOrientationBridge.exitFullscreenPortrait();
      }

      setIsFullscreen(false);
    }
    resetHideTimer();
  };

  // Format Time (MM:SS)
  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div
      ref={playerContainerRef}
      onClick={handleScreenTap}
      style={{ filter: `brightness(${brightness}%)` }}
      className="fixed inset-0 z-50 bg-black flex flex-col justify-between overflow-hidden select-none animate-in fade-in duration-200"
    >
      {/* HTML5 Video Element */}
      <video
        ref={videoRef}
        controls={false}
        playsInline={true}
        preload="metadata"
        poster={anime.poster}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
        className={`w-full h-full absolute inset-0 cursor-pointer ${
          fitMode === 'cover'
            ? 'object-cover'
            : fitMode === 'none'
            ? 'object-none'
            : 'object-contain'
        }`}
      />

      {/* Video Unavailable Fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-black/95 flex flex-col items-center justify-center gap-3 p-6 z-20 text-white">
          <AlertCircle className="w-12 h-12 text-[#ff1744]" />
          <h3 className="text-base font-extrabold font-['Outfit']">Video Unavailable</h3>
          <p className="text-xs text-slate-400 text-center max-w-xs">
            Unable to stream this video source. Please replace VIDEO_URL with your direct stream link.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#ff1744] text-white text-xs font-bold rounded-xl shadow-lg"
          >
            Close Player
          </button>
        </div>
      )}

      {/* LOCKED SCREEN OVERLAY */}
      {isLocked && (
        <div className="absolute inset-0 z-40 pointer-events-auto flex items-start justify-end p-5">
          <button
            onClick={() => setIsLocked(false)}
            className="bg-black/80 backdrop-blur-md text-white p-3 px-4 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-2 text-xs font-extrabold active:scale-95 transition-transform"
          >
            <Unlock className="w-4 h-4 text-[#ff1744]" />
            <span>Unlock Screen</span>
          </button>
        </div>
      )}

      {/* UNLOCKED CONTROLS OVERLAY MATCHING REFERENCE SCREENSHOT EXACTLY */}
      {!isLocked && (
        <div
          className={`absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-6 bg-gradient-to-t from-black/80 via-black/20 to-black/80 transition-opacity duration-300 ${
            showControls ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* TOP BAR */}
          <div className="flex items-center justify-between text-white">
            {/* Left: Circular Back Arrow + Anime Title & Episode Subtitle */}
            <div className="flex items-center gap-3 min-w-0 pr-2">
              <button
                onClick={handleClosePlayer}
                aria-label="Back"
                className="w-11 h-11 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/90 active:scale-90 transition-transform shadow-lg shrink-0"
              >
                <ArrowLeft className="w-5 h-5 text-white" />
              </button>

              <div className="flex flex-col min-w-0">
                <h2 className="text-base sm:text-lg font-extrabold text-white truncate font-['Outfit'] tracking-tight">
                  {anime.title}
                </h2>
                <div className="flex items-center gap-1 text-xs font-bold truncate">
                  <span className="text-white">S1 E{activeEp.epNumber}</span>
                  <span className="text-white">•</span>
                  <span className="text-[#ff1744]">Hindi Dub</span>
                  <span className="text-white">• {activeEp.title}</span>
                </div>
              </div>
            </div>

            {/* Right Action Icons (Download, Share, Cast, Fullscreen) */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => {
                  onDownloadEpisode(anime, activeEp);
                  setDownloadedState(true);
                }}
                aria-label="Download"
                className={`w-11 h-11 rounded-full border border-white/10 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform ${
                  downloadedState ? 'bg-emerald-600 text-white' : 'bg-black/70 text-white hover:bg-black/90'
                }`}
              >
                <Download className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: `${anime.title} S1 E${activeEp.epNumber}`,
                      url: window.location.href
                    }).catch(() => {});
                  }
                }}
                aria-label="Share"
                className="w-11 h-11 rounded-full bg-black/70 border border-white/10 text-white hover:bg-black/90 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform"
              >
                <Share2 className="w-5 h-5" />
              </button>

              <button
                onClick={() => alert("Casting stream to Smart TV / Chromecast...")}
                aria-label="Cast"
                className="w-11 h-11 rounded-full bg-black/70 border border-white/10 text-white hover:bg-black/90 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform"
              >
                <Cast className="w-5 h-5" />
              </button>

              <button
                onClick={handleFullscreen}
                aria-label="Fullscreen"
                className="w-11 h-11 rounded-full bg-black/70 border border-white/10 text-white hover:bg-black/90 backdrop-blur-md flex items-center justify-center active:scale-90 transition-transform"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CENTER SECTION: LEFT BRIGHTNESS CAPSULE + CENTER PLAY/SKIP + RIGHT VOLUME CAPSULE */}
          <div className="flex items-center justify-between my-auto w-full px-1">
            {/* Left: Brightness Capsule Slider */}
            <div className="w-11 h-44 bg-black/75 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center py-3 justify-between shadow-2xl shrink-0">
              <Sun className="w-4 h-4 text-white" />
              <div className="relative flex-1 w-full flex items-center justify-center py-2">
                <input
                  type="range"
                  min={30}
                  max={150}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-24 h-1 bg-gray-700 accent-[#ff1744] rounded-lg cursor-pointer transform -rotate-90 origin-center"
                />
              </div>
            </div>

            {/* Center Controls: -10s Skip | PLAY/PAUSE | +10s Skip */}
            <div className="flex items-center justify-center gap-5 sm:gap-8 mx-auto">
              {/* -10s Backward */}
              <button
                onClick={() => skipTime(-10)}
                aria-label="Skip 10 seconds backward"
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/80 border border-white/15 text-white flex items-center justify-center active:scale-90 transition-transform shadow-xl"
              >
                <div className="relative flex items-center justify-center">
                  <RotateCcw className="w-7 h-7 text-white" />
                  <span className="absolute text-[8px] font-black text-white top-2.5">10</span>
                </div>
              </button>

              {/* Large Glowing Red Play / Pause Button */}
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#ff1744] text-white flex items-center justify-center shadow-[0_0_25px_rgba(255,23,68,0.8)] active:scale-90 transition-transform ring-2 ring-white/20"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8 fill-white text-white" />
                ) : (
                  <Play className="w-8 h-8 fill-white text-white ml-1" />
                )}
              </button>

              {/* +10s Forward */}
              <button
                onClick={() => skipTime(10)}
                aria-label="Skip 10 seconds forward"
                className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-black/80 border border-white/15 text-white flex items-center justify-center active:scale-90 transition-transform shadow-xl"
              >
                <div className="relative flex items-center justify-center">
                  <RotateCw className="w-7 h-7 text-white" />
                  <span className="absolute text-[8px] font-black text-white top-2.5">10</span>
                </div>
              </button>
            </div>

            {/* Right: Volume Capsule Slider */}
            <div className="w-11 h-44 bg-black/75 backdrop-blur-md rounded-2xl border border-white/10 flex flex-col items-center py-3 justify-between shadow-2xl shrink-0">
              <Volume2 className="w-4 h-4 text-white" />
              <div className="relative flex-1 w-full flex items-center justify-center py-2">
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={volume}
                  onChange={(e) => handleVolumeChange(Number(e.target.value))}
                  className="w-24 h-1 bg-gray-700 accent-[#ff1744] rounded-lg cursor-pointer transform -rotate-90 origin-center"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM SEEK BAR & SETTINGS CAPSULE */}
          <div className="flex flex-col gap-2.5 w-full">
            {/* Time & Progress Range Bar */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-white shrink-0">
                {formatTime(currentTime)}
              </span>

              <div className="relative flex-1 flex items-center">
                <input
                  type="range"
                  min={0}
                  max={duration || 100}
                  value={currentTime}
                  onChange={(e) => handleSeek(Number(e.target.value))}
                  aria-label="Video seek position"
                  className="w-full h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#ff1744]"
                />
              </div>

              <span className="text-xs font-mono font-bold text-white shrink-0">
                {formatTime(duration)}
              </span>
            </div>

            {/* BOTTOM SETTINGS CAPSULE BAR (EXACT REFERENCE SCREENSHOT REPLICATION) */}
            <div className="bg-black/85 backdrop-blur-lg border border-white/20 rounded-2xl p-2.5 px-4 flex items-center justify-between text-white shadow-2xl overflow-x-auto no-scrollbar">
              {/* 1. Speed */}
              <button
                onClick={() => setActiveMenu(activeMenu === 'speed' ? 'none' : 'speed')}
                className="flex items-center gap-2 pr-3 border-r border-white/10 shrink-0 hover:opacity-80 active:scale-95 transition-all"
              >
                <Gauge className="w-4 h-4 text-[#ff1744]" />
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[11px] font-bold text-white">Speed</span>
                  <span className="text-[10px] font-extrabold text-[#ff1744] mt-0.5">{playbackSpeed}x</span>
                </div>
              </button>

              {/* 2. Quality */}
              <button
                onClick={() => setActiveMenu(activeMenu === 'quality' ? 'none' : 'quality')}
                className="flex items-center gap-2 px-3 border-r border-white/10 shrink-0 hover:opacity-80 active:scale-95 transition-all"
              >
                <span className="w-4 h-4 rounded border border-[#ff1744] text-[#ff1744] font-black text-[8px] flex items-center justify-center">
                  HD
                </span>
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[11px] font-bold text-white">Quality</span>
                  <span className="text-[10px] font-extrabold text-[#ff1744] mt-0.5">{quality}</span>
                </div>
              </button>

              {/* 3. Lock */}
              <button
                onClick={() => setIsLocked(true)}
                className="flex items-center gap-2 px-3 border-r border-white/10 shrink-0 hover:opacity-80 active:scale-95 transition-all"
              >
                <Lock className="w-4 h-4 text-white" />
                <span className="text-[11px] font-bold text-white">Lock</span>
              </button>

              {/* 4. Fit Screen */}
              <button
                onClick={() => {
                  const modes: ('contain' | 'cover' | 'none')[] = ['contain', 'cover', 'none'];
                  const nextIndex = (modes.indexOf(fitMode) + 1) % modes.length;
                  setFitMode(modes[nextIndex]);
                }}
                className="flex items-center gap-2 px-3 border-r border-white/10 shrink-0 hover:opacity-80 active:scale-95 transition-all"
              >
                <Maximize2 className="w-4 h-4 text-white" />
                <span className="text-[11px] font-bold text-white">Fit Screen</span>
              </button>

              {/* 5. Subtitles */}
              <button
                onClick={() => setActiveMenu(activeMenu === 'subtitles' ? 'none' : 'subtitles')}
                className="flex items-center gap-2 px-3 border-r border-white/10 shrink-0 hover:opacity-80 active:scale-95 transition-all"
              >
                <Subtitles className="w-4 h-4 text-[#ff1744]" />
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[11px] font-bold text-white">Subtitles</span>
                  <span className="text-[10px] font-extrabold text-[#ff1744] mt-0.5">{subtitleTrack}</span>
                </div>
              </button>

              {/* 6. Audio */}
              <button
                onClick={() => setActiveMenu(activeMenu === 'audio' ? 'none' : 'audio')}
                className="flex items-center gap-2 pl-3 shrink-0 hover:opacity-80 active:scale-95 transition-all"
              >
                <Globe className="w-4 h-4 text-[#ff1744]" />
                <div className="flex flex-col items-start leading-none text-left">
                  <span className="text-[11px] font-bold text-white">Audio</span>
                  <span className="text-[10px] font-extrabold text-[#ff1744] mt-0.5">{audioTrack}</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* POPUP OPTIONS MENU OVERLAY */}
      {activeMenu !== 'none' && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 w-full max-w-xs space-y-3 text-white shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold font-['Outfit'] uppercase text-[#ff1744]">
                Select {activeMenu}
              </h3>
              <button
                onClick={() => setActiveMenu('none')}
                className="text-slate-400 hover:text-white font-bold text-xs"
              >
                Close
              </button>
            </div>

            {/* Speed Options */}
            {activeMenu === 'speed' && (
              <div className="grid grid-cols-2 gap-2">
                {[0.5, 0.75, 1, 1.25, 1.5, 2].map((s) => (
                  <button
                    key={s}
                    onClick={() => setSpeed(s)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      playbackSpeed === s
                        ? 'bg-[#ff1744] text-white border-[#ff1744]'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>{s}x</span>
                    {playbackSpeed === s && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}

            {/* Quality Options */}
            {activeMenu === 'quality' && (
              <div className="space-y-2">
                {['1080p', '720p', '480p', '360p'].map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      setQuality(q);
                      setActiveMenu('none');
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      quality === q
                        ? 'bg-[#ff1744] text-white border-[#ff1ff4]'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>{q} HD</span>
                    {quality === q && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}

            {/* Subtitles Options */}
            {activeMenu === 'subtitles' && (
              <div className="space-y-2">
                {['Off', 'Hindi', 'English'].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => {
                      setSubtitleTrack(sub);
                      setActiveMenu('none');
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      subtitleTrack === sub
                        ? 'bg-[#ff1744] text-white border-[#ff1744]'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>{sub}</span>
                    {subtitleTrack === sub && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}

            {/* Audio Options */}
            {activeMenu === 'audio' && (
              <div className="space-y-2">
                {['Japanese', 'Hindi', 'English'].map((aud) => (
                  <button
                    key={aud}
                    onClick={() => {
                      setAudioTrack(aud);
                      setActiveMenu('none');
                    }}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold border transition-all flex items-center justify-between ${
                      audioTrack === aud
                        ? 'bg-[#ff1744] text-white border-[#ff1744]'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    <span>{aud}</span>
                    {audioTrack === aud && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
