package com.itheima.androidjavascript.utils;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;

import com.tencent.connect.share.QQShare;
import com.tencent.open.utils.ThreadManager;
import com.tencent.tauth.IUiListener;
import com.tencent.tauth.Tencent;
import com.tencent.tauth.UiError;

/**
 * 分享集合类
 * Created by youliang.ji on 2016/8/28.
 */
public class ShareUtils {
    private static ShareUtils instance;
    private ShareUtils(){}

    public static ShareUtils getInstance(){
        if(instance == null){
            synchronized (ShareUtils.class){
                if(instance == null){
                    instance = new ShareUtils();
                }
            }
        }
        return instance;
    }

    /**
     * 分享到QQ
     * @param activity
     * @param title 分享标题
     * @param url 分享网址
     * @param summary 分享内容简介
     * @param imgUrl 图片
     * @param listener 回调
     */
    public void shareToQQ(final Activity activity, String title, String url, String summary, String imgUrl, final IUiListener listener){
        final Tencent tencent = Tencent.createInstance("222222", activity);
        final Bundle params = new Bundle();
        params.putString(QQShare.SHARE_TO_QQ_TITLE, title);
        params.putString(QQShare.SHARE_TO_QQ_TARGET_URL, url);
        params.putString(QQShare.SHARE_TO_QQ_SUMMARY, summary);
        params.putString(QQShare.SHARE_TO_QQ_IMAGE_URL, imgUrl);

        ThreadManager.getMainHandler().post(new Runnable() {

            @Override
            public void run() {
                if (null != tencent) {
                    tencent.shareToQQ(activity, params, listener);
                }
            }
        });
    }
}
