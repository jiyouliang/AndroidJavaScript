package com.itheima.androidjavascript;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * 数据中心
 * Created by youliang.ji on 2016/5/16.
 */
public class DataCenter {
    private static DataCenter instance;

    private DataCenter() {
    }

    public static DataCenter getInstance() {
        if (instance == null) {
            synchronized (DataCenter.class) {
                if (instance == null) {
                    instance = new DataCenter();
                }
            }
        }
        return instance;
    }

    /**
     * 获取酒店列表数据
     *
     * @return
     */
    public String getHotelList() {
        JSONArray jsonArray = null;
        try {
            //酒店名称
            String[] names = new String[]{"深圳银河系星空大酒店", "深圳米兰时尚酒店西乡店", "维也纳酒店深圳宝安前进路店", "深圳前岸国际酒店", "深圳中天美景酒店", "深圳艾斯威克精品酒店", "深圳本京国际酒店", "深圳宝晖商务酒店", "深圳佳逸捷商务酒店", "深圳翔联宾馆宝安海雅店"};
            //价格
            String[] prices = new String[]{"8888", "202", "271", "505", "291", "192", "221", "372", "140", "138"};
            //图片
            String[] imgs = new String[]{"http://himg.qunarzz.com/imgs/201212/06/nz078uvZz-60q8ylv120.jpg", "http://himg.qunarzz.com/imgs/201506/03/JhS1_tJIavh3tOZAJ120.jpg", "http://himg.qunarzz.com/imgs/201212/11/0x8gF00P-jWyPPtG0120.jpg", "http://himg.qunarzz.com/imgs/201212/06/nz078uvZswEwrW6pv120.jpg", "http://himg.qunarzz.com/imgs/201212/06/nz078uvZswEwrW6pv120.jpg",
                    "http://himg.qunarzz.com/imgs/201108/10/Z7SfQZ9xCwKhGMUcZ120.jpg", "http://himg.qunarzz.com/imgs/201212/08/nz078uvZ5lytDaSuv120.jpg", "http://himg.qunarzz.com/imgs/201602/29/C._M0DCiyXvCk6Mympi120.jpg", "http://himg.qunarzz.com/imgs/201509/25/JhS1_thB9SVza42rJ120.jpg", "http://himg.qunarzz.com/imgs/201502/27/cWOHdHHliwsu3RQaH120.jpg"};
            //地址
            String[] address = new String[]{"罗湖火车站区域|华强北商圈|东门商业区","华强北商圈|会展中心区域, 在福田区人民医院附近","华强北商圈, 紧挨华强北地铁站A口","华强北商圈|会展中心区域, 靠近华强路地铁站B口","宝安中心区|宝安机场区域, 在坪洲地铁站B口附近",
            "宝安中心区, 在灵芝地铁站B2口附近", "宝安中心区, 在宝安区青少年活动中心附近","宝安中心区|宝安机场区域, 靠近凤凰岗幼儿园","宝安中心区, 在翻身地铁站B口附近","华侨城商圈, 与竹子林地铁站B2口相邻"};
            jsonArray = new JSONArray();
            for(int i = 0; i < names.length; i++){
                JSONObject json = new JSONObject();
                json.put("name", names[i]);
                json.put("price", prices[i]);
                json.put("img", imgs[i]);
                json.put("addr", address[i]);

                jsonArray.put(json);

            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonArray.toString();
    }

    public String getOrderDetail(){
        JSONObject json = null;
        try {
            json = new JSONObject();
            json.put("orderId", "20160517848284327");
            json.put("order_status", "等待确认");
            json.put("price", "108");
            json.put("back_price", "39");
            json.put("seller", "携程");
            json.put("phone", "18888888888");
            json.put("contact", "乔峰");
            json.put("pay_tpye", "到店付款");
            json.put("expire_time", "20:30");
            json.put("room_size", "标准双人间  双床（120cm*200cm）");
            json.put("in_date", "2016年5月17日");
            json.put("out_date", "2016年5月18日");
            json.put("root_count", "2间");
            json.put("hotel_name", "宝立方国际大酒店");
            json.put("server_phone", "010-536724567");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return json.toString();
    }

}
