# AnimeWorld - Android APK & Web App

**AnimeWorld** is a high-performance streaming application built with React, Vite, Tailwind CSS, and Capacitor for Android.

---

## 📱 How to Download the Built Android APK

You can easily download the ready-to-install **AnimeWorld Debug APK** directly from GitHub Actions without installing Android Studio locally:

1. Go to the **[GitHub Repository]** page.
2. Click on the **Actions** tab at the top.
3. Select the latest workflow run named **"Build AnimeWorld Android APK"**.
4. Scroll down to the **Artifacts** section at the bottom of the summary page.
5. Click on **`AnimeWorld-Debug-APK`** to download the ZIP archive containing `app-debug.apk`.
6. Extract the ZIP file and transfer `app-debug.apk` to your Android phone, or open it directly to install!

---

## 🛠️ Key App Features

- **Hindi Dubbed Streaming**: Watch popular anime episodes in Hindi Dub with fast HLS & MP4 playback.
- **Direct Android Gallery Downloads**: Save authorized anime episodes directly to your device's Gallery (`Movies/AnimeWorld/`) using modern Android MediaStore APIs.
- **Smart Major-Version Update System**: Checks for remote update configurations silently; notifies users only when a newer major version (e.g. `3.0.0` vs `2.0.0`) is published.
- **5-Tab Navigation**: Home, Search, Downloads, Live TV, and Release Calendar.

---

## 🚀 Local Development & Manual Build Guide

### Prerequisites
- Node.js (v18+)
- Java JDK 17
- Android Studio & Android SDK (API level 34)

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Web App Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build Web Production Assets & Sync Capacitor
```bash
npm run build
npx cap sync android
```

### 4. Build Android APK via Command Line
```bash
cd android
./gradlew assembleDebug
```
The output APK will be generated at:
`android/app/build/outputs/apk/debug/app-debug.apk`

---

## 📄 Configuration Files

- `capacitor.config.json` — Capacitor project settings (`com.animeworld.app`)
- `public/update-config.json` — Remote version check configuration
- `android/app/src/main/AndroidManifest.xml` — Android permissions & activity declarations
- `android/app/src/main/java/com/animeworld/app/AnimeWorldDownloadManager.kt` — Native MediaStore Android download manager
