package com.itheima.androidjavascript;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.widget.Toast;

import com.itheima.androidjavascript.utils.ShareUtils;
import com.itheima.androidjavascript.view.BottomUpDialog;
import com.tencent.tauth.IUiListener;
import com.tencent.tauth.UiError;

import org.json.JSONException;
import org.json.JSONObject;

/**提供给JavaScript调用的方法
 * Created by youliang.ji on 2016/5/15.
 */
public class JavaScriptMetod {
    private Activity context;
    private WebView webView;
    /**js和安卓通信接口（字符串映射对象）*/
    public static final String javaInterface = "jsInterface";


    public JavaScriptMetod(Activity context, WebView webView) {
        this.context = context;
        this.webView = webView;
    }

    @JavascriptInterface//andorid4.2（包括android4.2）以上，如果不写该注解，js无法调用android方法
    public void showToast(String json){
        Log.d("result", json);
        Toast.makeText(context, json, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void getHotelDetail(String jsJson){
        try {
            //解析js callback方法
            JSONObject mJson = new JSONObject(jsJson);
            String callback = mJson.optString("callback");//解析js回调方法


            JSONObject json = new JSONObject();
            json.put("name", "7天酒店东兴店");
            json.put("address", "深圳市宝安区兴东地铁站旁边");
            Toast.makeText(context, "android收到js消息", Toast.LENGTH_SHORT).show();

            //调用js方法必须在主线程
//            webView.loadUrl("javascript:"+callback+"(" + json.toString() + ")");
            invokeJavaScript(callback, json.toString());
        } catch (JSONException e) {
            e.printStackTrace();
        }

    }

    @JavascriptInterface
    public void getHotelList(String json){
        Log.d("result", json);

        try {
            //解析js callback方法
            JSONObject mJson = new JSONObject(json);
            String callback = mJson.optString("callback");//解析js回调方法

            String backData = DataCenter.getInstance().getHotelList();//json数组
            invokeJavaScript(callback, backData);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /**
     * android调用js方法
     * @param callback js回调方法名
     * @param json 传递json数据
     */
    private void invokeJavaScript(final String callback, final String json){
        System.out.println("list = " + json);
        //调用js方法必须在主线程

        webView.post(new Runnable() {
            @Override
            public void run() {
                webView.loadUrl("javascript:" + callback + "(" + json + ")");
            }
        });
    }

    @JavascriptInterface
    public void getOrderDetail(String json){
        try {
            System.out.println(json);
            JSONObject mJson = new JSONObject(json);
            String callback = mJson.optString("callback");

            String orderDetail = DataCenter.getInstance().getOrderDetail();

            invokeJavaScript(callback, orderDetail);
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @JavascriptInterface
    public void showCallPhoneDialog(String json){
        try {
            System.out.println(json);
            JSONObject mJson = new JSONObject(json);
            final String phone = mJson.optString("phone");
            Log.d("result", json);
            BottomUpDialog btmDlg = new BottomUpDialog(context);
            btmDlg.setContent(phone);
            btmDlg.show();

            //拨打电话
            btmDlg.setOnPhoneClickListener(new BottomUpDialog.OnPhoneClickListener() {
                @Override
                public void onPhoneClick() {
                    Intent intent = new Intent(Intent.ACTION_CALL, Uri.parse("tel:" + phone));
                    context.startActivity(intent);
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }

    /**
     * 分享到QQ
     * @param json
     */
    @JavascriptInterface
    public void shareToQQ(String json){
        try {
            Log.e("result", json);
            JSONObject mJson = new JSONObject(json);
            String title = mJson.optString("title");
            String url = mJson.optString("url");
            String summary = mJson.optString("summary");
            String imgUrl = mJson.optString("imgUrl");

            ShareUtils.getInstance().shareToQQ(context, title, url, summary, imgUrl, new IUiListener() {
                @Override
                public void onComplete(Object o) {
                    showToast("分享成功");
                }

                @Override
                public void onError(UiError uiError) {
                    showToast("分享失败：" + uiError.errorDetail);
                }

                @Override
                public void onCancel() {
                    showToast("取消分析");
                }
            });
        } catch (JSONException e) {
            e.printStackTrace();
        }
    }



}
