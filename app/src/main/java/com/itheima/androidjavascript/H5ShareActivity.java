package com.itheima.androidjavascript;

import android.app.Activity;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;

/**
 * H5调用安卓分享
 */
public class H5ShareActivity extends Activity {

    private WebView webView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview_layout);
        initView();
        setWebView();
        setWebViewClient();
//        webView.loadUrl("http://192.168.0.102:8080/Matrix/index.html");//在线模板
        webView.loadUrl("file:///android_asset/Matrix/index.html");//本地模板
    }


    private void setWebViewClient() {
        webView.setWebViewClient(new WebViewClient(){
            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view, url, favicon);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
            }
        });

        webView.setWebChromeClient(new WebChromeClient(){
            @Override
            public void onProgressChanged(WebView view, int newProgress) {
                super.onProgressChanged(view, newProgress);
            }
        });
    }

    private void setWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        webView.addJavascriptInterface(new JavaScriptMetod(this, webView), JavaScriptMetod.javaInterface);
    }

    private void initView() {
        webView = (WebView) findViewById(R.id.webView);
    }


}
