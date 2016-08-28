package com.itheima.androidjavascript;

import android.app.Activity;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * andorid和js通信
 * 1.安卓调用js方法
 * 2.js调用安卓方法
 * 3.js调用安卓方法（带callback方式）
 */
public class AndroidJavaScriptActivity extends Activity {

    private WebView webview;
    private JavaScriptMetod javaScriptMetod;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.android_js_activity);
        initView();
        setWebView();
    }

    /**
     * 设置WebView
     */
    private void setWebView() {
        WebSettings settings = webview.getSettings();
        settings.setJavaScriptEnabled(true);

        webview.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onReceivedTitle(WebView view, String title) {
                super.onReceivedTitle(view, title);
            }

            @Override
            public void onReceivedIcon(WebView view, Bitmap icon) {
                super.onReceivedIcon(view, icon);
            }

            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                super.onProgressChanged(view, newProgress);
            }
        });

        webview.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                try {
                    //页面加载完成后，调用js方法
                    JSONObject json = new JSONObject();
                    json.put("name", "安卓");
                    json.put("message", "我是安卓，收到了你的消息");

                    webview.loadUrl("javascript:showMessage(" + json.toString() + ")");
                } catch (JSONException e) {
                    e.printStackTrace();
                }
            }
        });

//        webview.loadUrl("http://192.168.0.103:8080/html5/index.html");//在线模板，开发阶段使用在线模板，为了便于调试
        webview.loadUrl("file:///android_asset/html5/index.html");//本地模板，最终发布，很多公司喜欢用本地模板，用户体验号，省流量
        javaScriptMetod = new JavaScriptMetod(this, webview);
        //其实就是告诉js，我提供给哪个对象给你调用，这样js就可以调用对象里面的方法
        webview.addJavascriptInterface(javaScriptMetod, "jsInterface");
    }

    private void initView() {
        webview = (WebView) findViewById(R.id.webview);
    }
}
