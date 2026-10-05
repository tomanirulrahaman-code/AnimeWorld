export const INSTALLED_VERSION = '2.0.0';

export interface UpdateConfig {
  latestVersion: string;
  updateAvailable: boolean;
  downloadUrl: string;
  releaseNotes?: string[];
}

/**
 * Returns true ONLY if latest version has a higher MAJOR version number than installed version.
 * Example:
 * 3.0.0 vs 2.0.0 -> true (Major update)
 * 2.1.0 vs 2.0.0 -> false (Minor update)
 * 2.0.0 vs 2.0.0 -> false (Same version)
 */
export const isMajorVersionGreater = (latest: string, installed: string): boolean => {
  const latestMajor = parseInt(latest.split('.')[0], 10) || 0;
  const installedMajor = parseInt(installed.split('.')[0], 10) || 0;

  return latestMajor > installedMajor;
};

/**
 * Fetches the update config and determines if the major-update popup should show.
 */
export const checkUpdateAvailable = async (): Promise<{
  shouldShowModal: boolean;
  config: UpdateConfig;
}> => {
  const defaultConfig: UpdateConfig = {
    latestVersion: INSTALLED_VERSION,
    updateAvailable: false,
    downloadUrl: 'https://t.me/+q45jqELWagdmODBl'
  };

  try {
    const res = await fetch('/update-config.json?t=' + Date.now());
    if (!res.ok) {
      return { shouldShowModal: false, config: defaultConfig };
    }
    const config: UpdateConfig = await res.json();

    const isMajorNewer = isMajorVersionGreater(config.latestVersion, INSTALLED_VERSION);
    const dismissedVersion = localStorage.getItem('animeworld_dismissed_update_version');

    // Show popup ONLY IF:
    // 1. latestVersion has a higher MAJOR version than INSTALLED_VERSION
    // 2. updateAvailable is true
    // 3. User hasn't dismissed this specific version
    const shouldShow =
      isMajorNewer &&
      config.updateAvailable &&
      dismissedVersion !== config.latestVersion;

    return { shouldShowModal: shouldShow, config };
  } catch (err) {
    console.warn('Update check failed:', err);
    return { shouldShowModal: false, config: defaultConfig };
  }
};

/**
 * Saves dismissal state so the popup won't show again for this version.
 */
export const dismissUpdateVersion = (version: string) => {
  try {
    localStorage.setItem('animeworld_dismissed_update_version', version);
  } catch (err) {
    console.warn('Unable to save update dismissal in localStorage:', err);
  }
};
