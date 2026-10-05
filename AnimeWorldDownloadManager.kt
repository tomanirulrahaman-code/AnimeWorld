package com.animeworld.app

import android.content.ContentValues
import android.content.Context
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.webkit.JavascriptInterface
import android.webkit.WebView
import java.io.InputStream
import java.net.HttpURLConnection
import java.net.URL
import kotlin.concurrent.thread

/**
 * Native Android Download Manager Bridge for AnimeWorld
 * Saves authorized MP4 video downloads directly into MediaStore (Movies/AnimeWorld/)
 * so they instantly appear in Android Gallery & Google Photos.
 */
class AnimeWorldDownloadManager(
    private val context: Context,
    private val webView: WebView
) {

    @JavascriptInterface
    fun startNativeDownload(id: String, downloadUrl: String, fileName: String, subfolder: String) {
        thread {
            try {
                // 1. Check for HLS stream (.m3u8)
                if (downloadUrl.contains(".m3u8", ignoreCase = true)) {
                    notifyError(id, "This video requires HLS download support.")
                    return@thread
                }

                // 2. Open HTTP/HTTPS Connection with Redirect Handling
                var url = URL(downloadUrl)
                var connection = url.openConnection() as HttpURLConnection
                connection.instanceFollowRedirects = true
                connection.connectTimeout = 15000
                connection.readTimeout = 30000
                connection.requestMethod = "GET"
                connection.connect()

                var responseCode = connection.responseCode
                if (responseCode == HttpURLConnection.HTTP_MOVED_PERM || responseCode == HttpURLConnection.HTTP_MOVED_TEMP) {
                    val newUrl = connection.getHeaderField("Location")
                    connection.disconnect()
                    url = URL(newUrl)
                    connection = url.openConnection() as HttpURLConnection
                    connection.connect()
                    responseCode = connection.responseCode
                }

                if (responseCode != HttpURLConnection.HTTP_OK) {
                    notifyError(id, "HTTP Error $responseCode: Unable to download video stream.")
                    return@thread
                }

                val contentLength = connection.contentLengthLong
                val inputStream: InputStream = connection.inputStream

                // 3. Prepare Android MediaStore Output Target
                val resolver = context.contentResolver
                val contentValues = ContentValues().apply {
                    put(MediaStore.MediaColumns.DISPLAY_NAME, fileName)
                    put(MediaStore.MediaColumns.MIME_TYPE, "video/mp4")
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                        put(MediaStore.MediaColumns.RELATIVE_PATH, "${Environment.DIRECTORY_MOVIES}/$subfolder")
                        put(MediaStore.MediaColumns.IS_PENDING, 1) // Set IS_PENDING = 1 during write
                    }
                }

                val collection = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    MediaStore.Video.Media.getContentUri(MediaStore.VOLUME_EXTERNAL_PRIMARY)
                } else {
                    MediaStore.Video.Media.EXTERNAL_CONTENT_URI
                }

                val uri = resolver.insert(collection, contentValues)
                    ?: throw Exception("Failed to create MediaStore entry.")

                // 4. Download Stream to MediaStore File
                val outputStream = resolver.openOutputStream(uri)
                    ?: throw Exception("Failed to open MediaStore output stream.")

                val buffer = ByteArray(8192)
                var bytesRead: Int
                var totalBytesRead = 0L

                while (inputStream.read(buffer).also { bytesRead = it } != -1) {
                    outputStream.write(buffer, 0, bytesRead)
                    totalBytesRead += bytesRead

                    val percent = if (contentLength > 0) {
                        ((totalBytesRead * 100) / contentLength).toInt()
                    } else {
                        50
                    }

                    notifyProgress(id, totalBytesRead, contentLength, percent)
                }

                outputStream.flush()
                outputStream.close()
                inputStream.close()
                connection.disconnect()

                // 5. Finalize File in MediaStore (Clear IS_PENDING on Android 10+)
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    contentValues.clear()
                    contentValues.put(MediaStore.MediaColumns.IS_PENDING, 0)
                    resolver.update(uri, contentValues, null, null)
                }

                val savedPath = "${Environment.DIRECTORY_MOVIES}/$subfolder/$fileName"
                notifySuccess(id, savedPath)

            } catch (e: Exception) {
                notifyError(id, e.localizedMessage ?: "Native Android download failed.")
            }
        }
    }

    private fun notifyProgress(id: String, loaded: Long, total: Long, percent: Int) {
        webView.post {
            val script = "window.onNativeDownloadProgress && window.onNativeDownloadProgress('$id', $loaded, $total, $percent);"
            webView.evaluateJavascript(script, null)
        }
    }

    private fun notifySuccess(id: String, filePath: String) {
        webView.post {
            val script = "window.onNativeDownloadComplete && window.onNativeDownloadComplete('$id', '$filePath');"
            webView.evaluateJavascript(script, null)
        }
    }

    private fun notifyError(id: String, errorMsg: String) {
        webView.post {
            val safeMsg = errorMsg.replace("'", "\\'")
            val script = "window.onNativeDownloadError && window.onNativeDownloadError('$id', '$safeMsg');"
            webView.evaluateJavascript(script, null)
        }
    }
}
