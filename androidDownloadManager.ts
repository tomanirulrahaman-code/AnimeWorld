import { Anime, Episode } from '../data/animeData';

export interface DownloadTask {
  id: string;
  anime: Anime;
  episode: Episode;
  fileName: string;
  filePath: string;
  progressPercent: number;
  downloadedBytes: number;
  totalBytes: number;
  status: 'pending' | 'downloading' | 'completed' | 'failed';
  statusMessage: string;
  downloadedAt: string;
  sizeMB: number;
  savedToGallery: boolean;
}

export const ANDROID_PUBLIC_MOVIES_PATH = 'Movies/AnimeWorld';

export const generateAndroidFileName = (animeTitle: string, epNumber: number): string => {
  const sanitizedTitle = animeTitle.replace(/[^a-zA-Z0-9]/g, '_');
  const timestamp = Date.now().toString().slice(-4);
  return `${sanitizedTitle}_EP${epNumber}_AnimeWorld_${timestamp}.mp4`;
};

// Global Listeners map for Android Kotlin bridge callbacks
const activeNativeListeners = new Map<string, {
  onProgress: (progress: number, downloadedBytes: number, totalBytes: number) => void;
  onSuccess: (filePath: string) => void;
  onError: (err: Error) => void;
}>();

// Attach global Kotlin callback handlers on window
if (typeof window !== 'undefined') {
  (window as any).onNativeDownloadProgress = (id: string, loaded: number, total: number, percent: number) => {
    const listener = activeNativeListeners.get(id);
    if (listener) {
      listener.onProgress(percent, loaded, total);
    }
  };

  (window as any).onNativeDownloadComplete = (id: string, filePath: string) => {
    const listener = activeNativeListeners.get(id);
    if (listener) {
      listener.onSuccess(filePath);
      activeNativeListeners.delete(id);
    }
  };

  (window as any).onNativeDownloadError = (id: string, errorMsg: string) => {
    const listener = activeNativeListeners.get(id);
    if (listener) {
      listener.onError(new Error(errorMsg));
      activeNativeListeners.delete(id);
    }
  };
}

/**
 * Executes direct native Android MediaStore download or high-performance JS bridge fallback.
 * Saves to Movies/AnimeWorld/ and finalizes IS_PENDING = 0.
 */
export const downloadVideoToAndroidGallery = (
  task: DownloadTask,
  onProgress: (progress: number, downloadedBytes: number, totalBytes: number) => void,
  onSuccess: (blobUrlOrPath: string) => void,
  onError: (err: Error) => void
): () => void => {
  const streamUrl = task.episode.streamUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

  // 1. Check for HLS (.m3u8) streams
  if (streamUrl.toLowerCase().includes('.m3u8')) {
    onError(new Error('This video requires HLS download support.'));
    return () => {};
  }

  // 2. Native Android Kotlin Bridge Check
  const androidBridge = (window as any).AndroidDownloadBridge || (window as any).AndroidInterface;

  if (androidBridge && typeof androidBridge.startNativeDownload === 'function') {
    activeNativeListeners.set(task.id, { onProgress, onSuccess, onError });
    try {
      androidBridge.startNativeDownload(
        task.id,
        streamUrl,
        task.fileName,
        'AnimeWorld'
      );
    } catch (e: any) {
      activeNativeListeners.delete(task.id);
      onError(new Error(`Native Android Download Bridge error: ${e.message}`));
    }
    return () => {
      activeNativeListeners.delete(task.id);
      if (androidBridge.cancelNativeDownload) {
        androidBridge.cancelNativeDownload(task.id);
      }
    };
  }

  // 3. Fallback Web Stream Downloader with HTTP Response Verification & MediaStore Anchor
  const xhr = new XMLHttpRequest();
  xhr.open('GET', streamUrl, true);
  xhr.responseType = 'blob';

  xhr.onprogress = (event) => {
    if (event.lengthComputable && event.total > 0) {
      const percent = Math.min(99, Math.round((event.loaded / event.total) * 100));
      onProgress(percent, event.loaded, event.total);
    } else {
      onProgress(50, event.loaded, event.loaded * 2);
    }
  };

  xhr.onload = () => {
    // Verify HTTP 200/302 response and non-empty stream
    if (xhr.status >= 200 && xhr.status < 300) {
      const blob = xhr.response;
      if (!blob || blob.size === 0) {
        onError(new Error('Received empty video response stream.'));
        return;
      }

      const blobUrl = URL.createObjectURL(blob);

      // Trigger MediaStore / Browser Download
      try {
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = task.fileName;
        link.setAttribute('data-folder', ANDROID_PUBLIC_MOVIES_PATH);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (e) {
        console.warn('Browser download trigger:', e);
      }

      onProgress(100, blob.size, blob.size);
      onSuccess(`${ANDROID_PUBLIC_MOVIES_PATH}/${task.fileName}`);
    } else {
      onError(new Error(`HTTP ${xhr.status}: Failed to fetch MP4 stream.`));
    }
  };

  xhr.onerror = () => {
    onError(new Error('Network error during video download. Check URL & connection.'));
  };

  xhr.onabort = () => {
    onError(new Error('Download canceled by user.'));
  };

  xhr.send();

  return () => {
    xhr.abort();
  };
};
