package com.animeworld.app

import android.content.pm.ActivityInfo
import android.os.Build
import android.os.Bundle
import android.view.View
import android.view.WindowInsets
import android.view.WindowInsetsController
import android.webkit.JavascriptInterface
import android.webkit.WebView
import com.getcapacitor.BridgeActivity

class MainActivity : BridgeActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        // Inject Native AnimeWorld Download & Orientation Bridges into Capacitor WebView
        val webView: WebView? = this.bridge?.webView
        webView?.let {
            val downloadManager = AnimeWorldDownloadManager(this, it)
            it.addJavascriptInterface(downloadManager, "AndroidDownloadBridge")
            it.addJavascriptInterface(downloadManager, "AndroidInterface")

            val orientationBridge = OrientationBridge(this)
            it.addJavascriptInterface(orientationBridge, "AndroidOrientationBridge")
        }
    }

    inner class OrientationBridge(private val activity: MainActivity) {

        @JavascriptInterface
        fun enterFullscreenLandscape() {
            activity.runOnUiThread {
                activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_SENSOR_LANDSCAPE
                activity.hideSystemBars()
            }
        }

        @JavascriptInterface
        fun exitFullscreenPortrait() {
            activity.runOnUiThread {
                activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_PORTRAIT
                activity.showSystemBars()
                // Reset to unspecified after 1s so device orientation behaves normally in standard view
                activity.window.decorView.postDelayed({
                    activity.requestedOrientation = ActivityInfo.SCREEN_ORIENTATION_UNSPECIFIED
                }, 1000)
            }
        }
    }

    fun hideSystemBars() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.let { controller ->
                controller.hide(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
                controller.systemBarsBehavior = WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
            }
        } else {
            @Suppress("DEPRECATION")
            window.decorView.systemUiVisibility = (
                View.SYSTEM_UI_FLAG_FULLSCREEN
                or View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                or View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                or View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                or View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                or View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
            )
        }
    }

    fun showSystemBars() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.insetsController?.show(WindowInsets.Type.statusBars() or WindowInsets.Type.navigationBars())
        } else {
            @Suppress("DEPRECATION")
            window.decorView.systemUiVisibility = View.SYSTEM_UI_FLAG_VISIBLE
        }
    }
}
