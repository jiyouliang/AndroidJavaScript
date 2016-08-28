/*
 * Rev: TplRelease
 * Ver: 863
 * Date: 2014/03/13
 * Author: Rick  [tagsworld@gmail.com]
 * Author: Bella [chujingjing2006@gmail.com]
 */
Date.prototype.formats = function () {
    var a = this.getMonth() + 1, a = 10 > a ? "0" + a : a, c = this.getDate(), c = 10 > c ? "0" + c : c, b = this.getHours(), b = 10 > b ? "0" + b : b, d = this.getMinutes();
    return a + "-" + c + " " + b + ":" + (10 > d ? "0" + d : d)
};
String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/, "")
};
String.prototype.isMobile = function () {
    return/^1[3|4|5|8][0-9]\d{8}$/.test(this)
};
String.prototype.kilometer = function () {
    if (!this || "" == this || isNaN(this))return"";
    var a = parseFloat(this);
    return 1E3 < a ? (a / 1E3).toFixed(1) + "km" : a.toFixed(0) + "m"
};
String.prototype.num2today = function () {
    if (!this)return 0;
    var a = new Date;
    a.setMinutes(0);
    a.setHours(0);
    var c = new Date(Date.parse(this.substring(0, 10).replace(/-/g, "/")));
    return Math.ceil((c - a) / 1E3 / 60 / 60 / 24) + 1
};
function Storage() {
    if (1 == arguments.length)return localStorage.getItem(arguments[0]);
    localStorage.setItem(arguments[0], arguments[1])
}
var Matrix = {pageId: null, platform: "andh", action: null, poiInfo: null, extraUrl: null, Weibo: {}, config: {introNum: 5, roomTypeNum: 5, carsNum: 5, tuangouDesc: 50}, readyTag: {aroundStation: 0, aroundPoi: 0, streetView: 0}, shortUrlPrefix: "http://amap.com/poi/", imgSize: {s: "?type=5", m: "?type=6", l: "?type=10"}, PanoramaServer: "http://sv.amap.com/AnGeoPoitopanoServer", PanoTol: 364.088889, KomoviePrefix: "http://m.komovie.cn:10000/buyticket.php?access=amap&qid=", shareUrl: "http://wb.test.myamap.com/channel/poishare?", activityUrl: {hotel: "http://group.myamap.com/jingran.wang/activity/hotel_banner.html?poi=1"},
    aosPrefixUrl: {baseUrl: "http://ass.test.myamap.com/ws/valueadded/deepinfo/search?cms_ver=4", hotelSearch: "http://ass.test.myamap.com/ws/valueadded/hotel/search", hotelCanBook: "http://ass.test.myamap.com/ws/valueadded/hotel/hotel_avail", streetView: "http://ass.test.myamap.com/ws/valueadded/streetrecommend/", tuangou: "http://ass.test.myamap.com/ws/valueadded/groupbuy/search", nearestShop: "http://ass.test.myamap.com/ws/valueadded/cms/tuan-shop?version=2.0", nearbyTuanType: "http://ass.test.myamap.com/ws/valueadded/cms/tuan-search?version=2.0",
        nearbyFoodType: "http://ass.test.myamap.com/ws/mapapi/poi/info/?version=2.11", nearbyRoomType: "http://ass.test.myamap.com/ws/mapapi/poi/info/?version=2.11", trafficSearch: "http://ass.test.myamap.com/ws/mapapi/poi/bus/?version=2.0", aroundPoi: "http://ass.test.myamap.com/ws/mapapi/poi/recommend/?version=2.0", send2car: "http://sns.test.myamap.com/ws/archive/sendtoX/", xiaomishu: "http://sns.test.myamap.com/ws/valueadded/dining/xiaomishu/", qqMovieContent: "http://ass.test.myamap.com/ws/valueadded/cinema/movie_info",
        qqMovieTuan: "http://ass.test.myamap.com/ws/valueadded/cinema/cinema_info", qqMovieMore: "http://ass.test.myamap.com/ws/valueadded/cinema/movie_price", qqMoviePicList: "http://ass.test.myamap.com/ws/valueadded/deepinfo/pic_list", qqMovieDate: "http://ass.test.myamap.com/ws/valueadded/cinema/movie_tickets", activity_getVCodeUrl: "http://sns.test.myamap.com/ws/auth/request-verifycode/", activity_verifyVCodeUrl: "http://sns.test.myamap.com/ws/valueadded/telecom/checkin/validate-code/", activity_getSignInfoUrl: "http://sns.test.myamap.com/ws/valueadded/telecom/checkin/query/",
        activity_signArriveUrl: "http://sns.test.myamap.com/ws/valueadded/telecom/checkin/action/", activity_exchangeFlowUrl: "http://sns.test.myamap.com/ws/valueadded/telecom/checkin/exchange/", almm: "http://ass.test.myamap.com/ws/valueadded/alimama/poiad/info"}, connect: function (a) {
        "object" == typeof a ? (Matrix.action = {send: function (a, b) {
            alert("showPanellist");
            a = JSON.stringify(a);
            b ? window.jsInterface.invokeMethod("send", [a, b]) : window.jsInterface.invokeMethod("send", [a])
        }}, Matrix.init()) : (window.ampTpl = a, document.addEventListener("DOMContentLoaded",
            Matrix.connect, !1))
    }, init: function () {
        switch (window.ampTpl) {
            case "index":
                var a = this.action;
                a.send({action: "registerCallback"}, "callback");
                a.send({action: "getFavoriteMark", _action: "setFavoriteMark"});
                a.send({action: "getExtraUrl"});
                a.send({action: "getPoiInfo"});
                break;
            case "intro":
                Matrix.action.send({action: "registerCallback"}, "callback");
                Page.exIntro();
                break;
            case "picture":
                Page.picture.createHtml();
                break;
            case "piclist":
                Page.exPiclist();
                break;
            case "dinningMenu":
                Matrix.action.send({action: "registerCallback"},
                    "callback");
                Action.act("networkInfo");
                break;
            case "tuangou":
                Matrix.action.send({action: "registerCallback"}, "callback");
                Matrix.action.send({action: "tuanGou", _action: "tuanGou"});
                break;
            case "tuangouFromLink":
                Matrix.action.send({action: "registerCallback"}, "callback");
                Action.getTuangouInfo(Storage("tuan.tuangouID"), Storage("tuan.mergeID"), Storage("tuan.src_type"));
                break;
            case "discount":
                Page.exDiscount();
                break;
            case "comments":
                Page.comment.exComment();
                break;
            case "streetView":
                Matrix.action.send({action: "registerCallback"},
                    "callback");
                StreetView.initPage();
                break;
            case "streetdetail":
                Matrix.action.send({action: "registerCallback"}, "callback");
                StreetView.showData();
                break;
            case "data2car":
                Matrix.action.send({action: "registerCallback"}, "callback");
                Page.exData2car();
                break;
            case "room":
                Matrix.action.send({action: "registerCallback"}, "callback");
                Page.hotel.aosRequest(!0);
                break;
            case "data2dinning":
                Matrix.action.send({action: "registerCallback"}, "callback");
                Page.exData2dinning();
                break;
            case "cardecline":
                Page.exCarDecline();
                break;
            case "carbrand":
                Page.exCarBrand();
                break;
            case "carserial":
                Page.exCarSerial();
                break;
            case "carpiclist":
                Page.exCarpiclist();
                break;
            case "cardetail":
                Page.exCarDetail();
                break;
            case "activity":
                Page.exActivitylist();
                break;
            case "travel":
                Page.exTravel();
                break;
            case "calendar":
                Matrix.action.send({action: "registerCallback"}, "callback");
                Matrix.action.send({action: "openHotelCalendar", _action: "openHotelCalendar"});
                break;
            case "golfDetail":
                Matrix.action.send({action: "registerCallback"}, "callback");
                Page.exGolfDetail();
                break;
            case "phoneAd":
                Action.registShareBtn();
                break;
            case "activity_entrance":
                Matrix.action.send({action: "registerCallback"}, "callback");
                entrance.init();
                break;
            case "activity_phoneVerify":
                Matrix.action.send({action: "registerCallback"}, "callback");
                verify.init();
                break;
            case "activity_signArrive":
                Matrix.action.send({action: "registerCallback"}, "callback");
                signArrive.init();
                break;
            case "activity_exchange":
                Matrix.action.send({action: "registerCallback"}, "callback");
                exchange.initExchangePage();
                break;
            case "movieSeats":
                var a = Storage("movieDate") || "{}", a = $.parseJSON(a),
                    c = Storage("pushPara").split(",");
                Page.pushMovieSeat(c, "#MovieInfoSeats", a);
                break;
            case "movieDetail":
                this.action.send({action: "registerCallback"}, "callback");
                "poi" == Storage("movie.detail.from") ? Action.getMovieInfo(Storage("movieID")) : this.action.send({action: "openMovieDetail", _action: "openMovieDetail"});
                break;
            case "movieShowings":
                this.action.send({action: "registerCallback"}, "callback");
                this.action.send({action: "openMovieShowings", _action: "openMovieShowings"});
                break;
            case "movieTuan":
                this.action.send({action: "registerCallback"},
                    "callback");
                Action.getMovieInfoTuan(Storage("pageId"));
                a = [
                    {poiid: Storage("pageId"), sign: 1},
                    {pagenum: 1},
                    {pagesize: 2},
                    {custom: "sort_rule=2"},
                    {classify: "0"}
                ];
                Matrix.action.send({action: "aosrequest", _action: "movieTuanList", params: a, urlPrefix: Matrix.aosPrefixUrl.nearbyTuanType, method: "POST", poiInfo: ""});
                break;
            case "movieQuan":
                Page.movieQuan();
                break;
            case "movieMorePrice":
                this.action.send({action: "registerCallback"}, "callback"), Action.getMovieInfoMore(Storage("pageId"), Storage("movieID"), Storage("ticketID"))
        }
        Log.startLog()
    },
    callback: function (a, c) {
        if (c._action)var b = c; else if (a._action)b = a; else return;
        switch (b._action) {
            case "setMyLocation":
            case "setMapPoint":
            case "setPoiInfo":
                if (Matrix.poiInfo)break;
                Matrix.poiInfo = b.poiInfo;
                Matrix.favInfo = b.favInfo;
                Page.hotel.hotelDate = b.hotelDate;
                Matrix.indoor = "1" == b.indoor;
                Page.showClientData(b._action);
                b.poiInfo.poiid ? (Matrix.pageId = b.poiInfo.poiid, Matrix.getPoiData(Matrix.pageId), localStorage.setItem("pageId", Matrix.pageId)) : (Matrix.noPoiid = !0, Action.showPoiPhone && $("#phone").show());
                break;
            case "setFavoriteMark":
                Matrix.favStatus = b.status;
                Matrix.favInfo = b.favInfo;
                b.status ? Page.util.favInfoEvt() : $("#MyFavInfo,#MyFavPoint").hide();
                break;
            case "setPoiId":
                localStorage.setItem("pageId", b.poiid);
                break;
            case "setAmapUserId":
                Action.getAppPara("", "", b.extra.urlPrefix + b.userid);
                break;
            case "getExtraUrl":
                Matrix.dic = b.dic;
                Matrix.extraUrl = "&div=" + b.div + "&dic=" + b.dic + "&dip=" + b.dip + "&diu=" + b.diu + "&cifa=" + b.cifa;
                break;
            case "setPoiData":
                (b = $.parseJSON(b.content.trim())) && b.code && 1 == b.code && b.poiinfo ?
                    (localStorage.setItem(Matrix.pageId, JSON.stringify(b.poiinfo)), Page.showCmsData()) : ($("#poiFace > a > img").attr("src", "attach/images/empty.png").css({"background-image": "url(attach/images/img_default.png)", "background-color": "#f8f8f8", "background-size": "50px"}), $("#exIntro").hide(), Action.showPoiPhone && $("#phone").show(), Action.showPanorama && $("#StreetViewImage").show());
                break;
            case "showCityList":
                StreetView.showCityList(b);
                break;
            case "setPanoramaImage":
                Page.showPanoramaData(b.content.trim());
                break;
            case "setNearBusData":
                Page.showNearBusData(b.content);
                break;
            case "setMapLocation":
                Matrix.adcode = b.adcode;
                break;
            case "setFeatureList":
                $.parseJSON(b.content.trim());
                break;
            case "networkInfo":
                Page.exGallery(b.type);
                break;
            case "openHotelCalendar":
                hotelCalendar.setPageInfo(b);
                break;
            case "freshRoomData":
                Page.hotel.aosRequest();
                break;
            case "hotelSearchBack":
                Page.hotel.searchResult(b);
                break;
            case "hotelRoomList":
                Page.hotel.createRoomList(b);
                break;
            case "hotelCanBook":
                Page.hotel.canBookRes(b);
                break;
            case "tuanGou":
                Action.getTuangouInfo(b.tuangouID,
                    b.mergeID, b.src_type);
                break;
            case "tuangouBack":
                Page.exTuangou($.parseJSON(b.content.trim()));
                break;
            case "getNearestShop":
                var d = [];
                d.push({tuanid: Storage("tuan.tuangouID"), sign: 1});
                d.push({mergeid: Storage("tuan.mergeID"), sign: 1});
                d.push({src: Storage("tuan.src_type"), sign: 1});
                d.push({latitude: b.lat, sign: 0});
                d.push({longitude: b.lon, sign: 0});
                d.push({pagesize: 1, sign: 0});
                d.push({pagenum: 1, sign: 0});
                Matrix.action.send({action: "aosrequest", _action: "nearestShopBack", params: d, poiInfo: "", urlPrefix: Matrix.aosPrefixUrl.nearestShop,
                    method: "POST"});
                break;
            case "nearestShopBack":
                Page.exNearestShop($.parseJSON(b.content.trim()));
                break;
            case "nearbyTuanBack":
                Page.showNearbyTuan($.parseJSON(b.content.trim()));
                break;
            case "nearbyFoodBack":
                Page.showNearbyFood($.parseJSON(b.content.trim()));
                break;
            case "nearbyRoomBack":
                Page.showNearbyRoom($.parseJSON(b.content.trim()));
                break;
            case "nearbyTrafficStationBack":
                Page.outputNearbyTrafficStation($.parseJSON(b.content.trim()));
                break;
            case "hasTrafficInfoBack":
                Page.hasTrafficInfoBack($.parseJSON(b.content.trim()));
                break;
            case "crossTrafficLinesBack":
                Page.showCrossTrafficLines($.parseJSON(b.content.trim()));
                break;
            case "activity_exchangeFlowCallBack":
                exchange.exchangeFlowCallBack($.parseJSON(b.content.trim()));
                break;
            case "activity_getExchangeVCodeCallBack":
                exchange.getExchangeVCodeCallBack($.parseJSON(b.content.trim()));
                break;
            case "activity_getServerTime":
                entrance.setActTime($.parseJSON(b.content.trim()));
                break;
            case "activity_getSignInfoCallBack":
                signArrive.getSignInfoCallBack($.parseJSON(b.content.trim()));
                break;
            case "activity_signArriveCallBack":
                signArrive.signArriveCallBack($.parseJSON(b.content.trim()));
                break;
            case "activity_getVCodeCallBack":
                verify.getVCodeCallBack($.parseJSON(b.content.trim()));
                break;
            case "activity_verifyVCodeCallBack":
                verify.verifyVCodeCallBack($.parseJSON(b.content.trim()));
                break;
            case "movieInfo":
                Page.exMovieDetail($.parseJSON(b.content.trim()));
                break;
            case "movieTuanList":
                Page.movieTuanList(b);
                break;
            case "movieInfoTuan":
                Page.movieInfoTuan(b);
                break;
            case "movieInfoMore":
                Page.movieInfoMore(b);
                break;
            case "movieInfoDate":
                d = $.parseJSON(b.content.trim());
                Storage("movieDate", b.content.trim());
                d && (d.code && 1 == d.code) && (b = Page.showMovieDate(d), Storage("pushPara", b), Matrix.poiSign ? Page.pushMovieDate(b, "#MovieInfo", d) : Page.pushMovieShowing(b, "#MovieInfoSpec", d));
                break;
            case "picListData":
                Page.util.jumpTo(b.content);
                break;
            case "openMovieDetail":
                Action.getMovieInfo(b.movieID);
                break;
            case "openMovieShowings":
                Storage("pageId", b.poiID);
                Action.getMovieDate(b.poiID, b.movieID, 1);
                break;
            case "showAlmm":
                Page.subcms.showAlmm($.parseJSON(b.content.trim()))
        }
        Log.startLog()
    },
    getPoiData: function (a) {
        var c = [];
        c.push({poiid: a, sign: 1});
        c.push({mode: 255, sign: 1});
        c.push({deepcount: 1, sign: 0});
        Matrix.action.send({action: "aosrequest", _action: "setPoiData", params: c, poiInfo: "", urlPrefix: Matrix.aosPrefixUrl.baseUrl, method: "GET", progress: "\u52a0\u8f7d\u4e2d"})
    }, send: function (a) {
        var c = Matrix.action;
        switch (a) {
            case "sendWeiBo":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid, sinaid: Matrix.Weibo.sinaID, content: Matrix.Weibo.content}});
                break;
            case "pageWeiBoList":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid,
                    cardid: "poistatuses", title: "\u6b64\u5730\u70ed\u8bae"}});
                break;
            case "pagePhotoList":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid, cardid: "poiphoto", title: "\u70ed\u56fe"}});
                break;
            case "pageUserList":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid, cardid: "poiuser", title: "\u4ed6/\u5979\u4eec\u6765\u8fc7\u8fd9\u91cc"}});
                break;
            case "pageInfo":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid, title: "\u4f4d\u7f6e"}});
                break;
            case "nearbyWeiBo":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid, cardid: "nearstatuses",
                    title: "\u5468\u8fb9\u70ed\u8bae"}});
                break;
            case "nearbyPhotoList":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid, cardid: "nearphoto"}});
                break;
            case "nearbyPeople":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid, cardid: "nearuser"}});
                break;
            case "nearbyPageInfo":
                c.send({action: a, data: {pageid: Matrix.Weibo.pageid, title: "\u4f4d\u7f6e"}});
                break;
            case "searchRoute":
                c.send({action: a, poiInfo: Matrix.poiInfo, pointType: "1"});
                break;
            case "errorReport":
                var b = 0, d = {150500: 2, 150600: 2, 150700: 2};
                if (Matrix.poiNewType)switch (d[Matrix.poiNewType]) {
                    case 2:
                        b =
                            2;
                        break;
                    default:
                        b = 1
                }
                c.send({action: a, poiInfo: Matrix.poiInfo, type: b});
                break;
            case "openIndoorMap":
                c.send({action: a, indoorMapArray: Matrix.indoorMapData});
                break;
            case "openPanorama":
                c.send({action: a, poiInfo: Matrix.poiInfo, data: Action.Panorama});
                break;
            case "openBusLine":
                c.send({action: a, data: Matrix.busLineInfo});
                break;
            case "openPoi":
                c.send({action: a, poiInfo: Action.openPoi});
                break;
            case "searchCategory":
                c.send({action: a, poiInfo: Matrix.poiInfo, category: Action.searchCategoryKey, serviceType: Action.serviceType});
                break;
            case "searchPoi":
                c.send({action: a, data: Action.searchPoiKey});
                Log.userAction(Action.searchPoiKey.key);
                break;
            case "logUserAction":
                b = Matrix.userParas;
                c.send({action: a, poiInfo: Matrix.poiInfo, pageid: "1000", buttonid: b.btnid, para: b.para});
                break;
            case "mapControl":
                c.send({action: a, mapInfo: Action.mapControlObj});
                break;
            case "aosrequest":
                c.send({action: a, params: Action.params, poiInfo: Matrix.clientInfo, urlPrefix: Action.aosReqUrl, method: Action.method, encrypt: 1, progress: "\u53d1\u9001\u4e2d...", goback: "1", alert: Action.alert});
                break;
            case "getAmapUserId":
                c.send({action: a, _action: "setAmapUserId", extra: Action.ticketExtra});
                break;
            case "getMapLocation":
                c.send({action: a, _action: "setMapLocation", forceReturnValue: 0});
                break;
            case "share":
                c.send({action: a, type: Action.shareType, message: Action.shareMsg, needShortUrl: Action.needShortUrl});
                break;
            case "triggerFeature":
                c.send({action: a, feature: Action.featureNm, poiInfo: Matrix.poiInfo});
                break;
            case "getFeatureList":
                c.send({action: a, _action: "setFeatureList"});
                break;
            case "showPanellist":
                c.send({action: a,
                    list: Action.lists});
                break;
            case "networkInfo":
                c.send({action: a, _action: "networkInfo"});
                break;
            default:
                c.send({action: a, poiInfo: Matrix.poiInfo})
        }
    }};
callback = function (a) {
    Matrix.callback(null, a)
};
var Log = {startLog: function () {
    var a = this;
    $("a[name],a[href],.more[name]").unbind("click.log").on("click.log", function (c) {
        if ($(this)) {
            var b = $(this).attr("name");
            b ? a.userAction(b) : (b = $(this).attr("href")) && a.userAction(b);
            c.stopPropagation()
        }
    })
}, userAction: function (a, c) {
    if ((c = c || window.ampTpl) && a) {
        var b = lon = new_type = adcode = "";
        Matrix.poiInfo && (b = Matrix.poiInfo.lat, lon = Matrix.poiInfo.lon, new_type = Matrix.poiInfo.new_type, adcode = Matrix.adcode || "0");
        Action.userAction({page: c, click: a, lon: lon, lat: b, poiid: Matrix.pageId,
            new_type: new_type, adcode: adcode})
    }
}}, Action = {act: function (a) {
    Matrix.send(a)
}, showPanellist: function (a) {
    var c = [];
    $.each(a, function (a, d) {
        "object" == typeof d ? c.push(d) : ("number" == typeof d && (d = "" + d), c.push({title: d, content: d}))
    });
    Action.lists = c;
    this.act("showPanellist")
}, getAppPara: function (a, c, b, d, e) {
    a = {action: "openAppUrl", "package": "", version: "", iosh: a || "", andh: c || "", wapUrl: b || "", showloadding: e || 0};
    "object" == typeof d && (a.showButton = d);
    Matrix.action.send(a)
}, goGetTicket: function (a) {
    Action.ticketExtra =
    {urlPrefix: a};
    this.act("getAmapUserId")
}, data2Car: function () {
    $("#recipient").blur();
    $("#mobile").blur();
    $("#customname").blur();
    $("#description").blur();
    $("#vehicleKey").blur();
    var a = $("#recipient").val();
    if (-1 == a)Page.util.showTip("\u8bf7\u9009\u62e9\u6c7d\u8f66\u54c1\u724c!"); else {
        var c = [];
        c.push({type: 2, sign: 0});
        c.push({action: 2});
        var b = Matrix.clientInfo;
        Action.ex2carData || (Action.ex2carData = {});
        Action.ex2carData.carType = $("#recipient").val();
        switch (a) {
            case "BYD":
                var d = $("#vehicleKey").val();
                if (!d.trim() ||
                    "\u8bf7\u8f93\u5165\u8f66\u724c\u53f7(\u5fc5\u586b)" == d.trim()) {
                    Page.util.showTip("\u8bf7\u8f93\u5165\u8f66\u724c\u53f7!");
                    return
                }
                if (10 < d.length) {
                    Page.util.showTip("\u8bf7\u60a8\u8f93\u5165\u6b63\u786e\u7684\u8f66\u724c\u53f7!", "\u5982\uff1a\u4eacN5TY28!");
                    return
                }
                c.push({recipient: 7, sign: 1});
                c.push({account: d, sign: 0});
                Action.ex2carData.vehicleKey = d;
                break;
            case "BULCK":
                d = $("#bcustomname").val();
                if (!d.trim() || "\u4ec5\u9650VOICELINK\u7528\u6237\u4f7f\u7528" == d.trim()) {
                    Page.util.showTip("\u8bf7\u8f93\u5165\u7528\u6237\u540d!");
                    return
                }
                if (100 < d.length) {
                    Page.util.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u7528\u6237\u540d!", "\u4e0d\u80fd\u8d85\u8fc7100\u4e2a\u5b57\u7b26");
                    return
                }
                c.push({recipient: 8, sign: 1});
                c.push({account: d, sign: 0});
                c.push({category: b.new_type, sign: 0});
                Action.ex2carData.bcustomname = d;
                break;
            case "Chevrolet":
                d = $("#xcustomname").val();
                if (!d.trim() || "\u4ec5\u9650e\u8def\u4eab\u7528\u6237\u4f7f\u7528" == d.trim()) {
                    Page.util.showTip("\u8bf7\u8f93\u5165\u7528\u6237\u540d!");
                    return
                }
                if (100 < d.length) {
                    Page.util.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u7528\u6237\u540d!",
                        "\u4e0d\u80fd\u8d85\u8fc7100\u4e2a\u5b57\u7b26");
                    return
                }
                c.push({recipient: 9, sign: 1});
                c.push({account: d, sign: 0});
                c.push({category: b.new_type, sign: 0});
                Action.ex2carData.xcustomname = d;
                break;
            case "BMW":
                d = $("#bmwmobile").val();
                if (!d || 32 < d.length) {
                    Page.util.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7!");
                    return
                }
                a = $("#description").val();
                if (30 < a.length && 60 < a.replace(/[^\x00-\xff]/g, "xx").length) {
                    Page.util.showTip("\u5907\u6ce8(\u53ef\u8f93\u516530\u4e2a\u6c49\u5b57)");
                    return
                }
                c.push({recipient: 3,
                    sign: 1});
                c.push({type: 2, sign: 0});
                c.push({bmwact: "send_external", sign: 0});
                c.push({account: d, sign: 0});
                c.push({poiid: b.poiid, sign: 0});
                a && "\u5907\u6ce8(\u53ef\u8f93\u516530\u4e2a\u6c49\u5b57)" != a.trim() && c.push({message: $("#description").val(), sign: 0});
                Action.ex2carData.bmwMobile = d;
                break;
            default:
                d = $("#mobile").val();
                if (!d.isMobile()) {
                    Page.util.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7!");
                    return
                }
                if (100 < $("#description").val().length) {
                    Page.util.showTip("\u5907\u6ce8\u957f\u5ea6\u4e0d\u8981\u8d85\u8fc7100\u4e2a\u5b57\u7b26!");
                    return
                }
                c.push({recipient: 6, sign: 1});
                c.push({vehicleKey: a, sign: 0});
                c.push({account: d, sign: 0});
                c.push({category: b.new_type, sign: 0});
                $("#description").val().trim() && "\u5907\u6ce8(\u53ef\u8f93\u5165100\u4e2a\u6c49\u5b57)" != $("#description").val().trim() && c.push({message: $("#description").val(), sign: 0});
                Action.ex2carData.mobile = d
        }
        c.push({name: b.name, sign: 0});
        c.push({address: b.address, sign: 0});
        c.push({tel: b.phoneNumbers, sign: 0});
        c.push({longitude: b.lon, sign: 0});
        c.push({latitude: b.lat, sign: 0});
        localStorage.setItem("ex2carData",
            JSON.stringify(Action.ex2carData));
        Action.params = c;
        Action.method = "POST";
        Action.alert = {success: "\u4fe1\u606f\u5df2\u53d1\u9001", fail: "\u53d1\u9001\u5931\u8d25", admin: "1"};
        Action.aosReqUrl = Matrix.aosPrefixUrl.send2car;
        this.act("aosrequest")
    }
}, data2dinning: function () {
    if (void 0 != Matrix.sendStatus)Page.util.showTip("\u60a8\u5df2\u7ecf\u63d0\u4ea4\u6210\u529f!", "\u8bf7\u52ff\u91cd\u590d\u63d0\u4ea4\uff01"); else {
        var a = $(".form article input"), c = a.eq(0).val();
        if (!/^\d{1,2}$/.test(c) || 0 >= parseInt(c))Page.util.showTip("\u8bf7\u8f93\u5165\u6b63\u786e\u8ba2\u9910\u4eba\u6570\uff01",
            "\u6700\u591a\u4e24\u4f4d\u6570\u5b57\uff01"); else {
            var b = a.eq(1).val();
            if (b && "\u59d3\u540d" != b.trim())if (10 < b.length)Page.util.showTip("\u540d\u5b57\u8d85\u957f", "\u4e0d\u80fd\u8d85\u8fc710\u4e2a\u5b57\u7b26\uff01"); else if (/^[\u4E00-\u9FA5]{1,10}$/.test(b)) {
                var d = a.eq(2).val();
                if (d.isMobile())if (50 < $("#description").val().trim().length)Page.util.showTip("\u5907\u6ce8\u8d85\u957f", "\u957f\u5ea6\u4e0d\u80fd\u8d85\u8fc750\u4e2a\u5b57\u7b26\uff01"); else {
                    var a = [], e = localStorage.getItem("pageId"), e = localStorage.getItem(e),
                        e = $.parseJSON(e).idDictionaries || {};
                    a.push({resid: e.dining_xiaomishu_id, sign: 1});
                    a.push({time: $("#dateBox").val() + $("#bookTime input").val().replace(":", ""), sign: 0});
                    a.push({count: c, sign: 0});
                    a.push({bookname: b, sign: 0});
                    a.push({booktel: d, sign: 0});
                    $("#description").val().trim() && "\u5982\uff1a\u5305\u95f4/\u5927\u5385\uff0c\u65e0\u70df" != $("#description").val().trim() && a.push({note: $("#description").val(), sign: 0});
                    c = {};
                    c.mobile = d;
                    c.personNm = b;
                    localStorage.setItem("exDinningData", JSON.stringify(c));
                    b =
                        localStorage.getItem("clientData");
                    b = $.parseJSON(b) || "{}";
                    Matrix.clientInfo = b;
                    Action.aosReqUrl = Matrix.aosPrefixUrl.xiaomishu;
                    Action.params = a;
                    Action.method = "POST";
                    Action.alert = {success: "\u53d1\u9001\u6210\u529f,\u7a0d\u540e\u5546\u5bb6\u4f1a\u4e0e\u60a8\u8054\u7cfb", fail: "\u53d1\u9001\u5931\u8d25,\u8bf7\u60a8\u7a0d\u540e\u91cd\u65b0\u63d0\u4ea4", admin: "1"};
                    Action.act("aosrequest");
                    Log.userAction("dinning-submit")
                } else Page.util.showTip("\u624b\u673a\u53f7\u7801\u9519\u8bef", "\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u624b\u673a\u53f7\u7801!")
            } else Page.util.showTip("\u59d3\u540d\u6587\u5b57\u6709\u8bef",
                "\u4ec5\u652f\u6301\u4e2d\u6587\u5b57\u7b26\uff01"); else Page.util.showTip("\u8bf7\u586b\u5199\u9884\u8ba2\u4eba\u59d3\u540d", "\u59d3\u540d\u4e0d\u80fd\u4e3a\u7a7a!")
        }
    }
}, openPanorama: function (a, c) {
    Action.Panorama = {type: c || "StreetView", panoid: a};
    this.act("openPanorama")
}, openPanoramaItem: function (a, c, b, d, e, f) {
    Matrix.poiInfo = {poiid: e || "", name: d || "", address: "", cityCode: "010", poiType: "1", phoneNumbers: "", x: "", y: "", lon: c || "", lat: b || ""};
    Action.Panorama = {type: f || "StreetView", panoid: a};
    this.act("openPanorama")
},
    openBus: function (a) {
        Action.openPoi = Matrix.busStation[a];
        this.act("openPoi")
    }, busLine: function (a) {
        Matrix.busLineInfo = {busLineid: Matrix.busLineId[a], cityCode: Matrix.poiInfo.cityCode, showType: 1};
        this.act("openBusLine")
    }, searchPoi: function (a) {
        Action.searchPoiKey = {key: a, title: a};
        this.act("searchPoi")
    }, openAroundPoi: function (a) {
        Action.openPoi = Page.aroundPoi[a];
        this.act("openPoi")
    }, searchCategory: function (a, c) {
        Action.searchCategoryKey = a;
        Action.serviceType = c;
        this.act("searchCategory")
    }, userAction: function (a, c) {
        Matrix.userParas = {btnid: c || 1, para: JSON.stringify(a)};
        this.act("logUserAction")
    }, mapControl: function (a, c, b) {
        Action.mapControlObj = {x: a, y: c, level: b};
        this.act("mapControl")
    }, share: function (a, c, b) {
        Action.shareType = a;
        Action.shareMsg = c;
        Action.needShortUrl = b;
        this.act("share")
    }, triggerFeature: function (a) {
        Action.featureNm = a;
        this.act("triggerFeature")
    }, openPoiInfo: function (a, c, b, d, e, f, g, h) {
        Action.openPoi = {poiid: a || "", name: c || "", address: b || "", cityCode: d, poiType: 1, new_type: e, phoneNumbers: f || "", x: "", y: "", lon: g,
            lat: h};
        this.act("openPoi")
    }, getTuangouInfo: function (a, c, b) {
        this.saveTuangouParams(a, c, b);
        var d = [];
        d.push({mergeid: c, sign: 1});
        d.push({groupid: a, sign: 1});
        d.push({src_type: b, sign: 1});
        Matrix.action.send({action: "aosrequest", _action: "tuangouBack", params: d, poiInfo: "", urlPrefix: Matrix.aosPrefixUrl.tuangou, method: "POST", progress: "\u52a0\u8f7d\u4e2d", alert: {success: "", fail: "\u6570\u636e\u8bf7\u6c42\u5f02\u5e38", admin: "1"}})
    }, saveTuangouParams: function (a, c, b) {
        Storage("tuan.tuangouID", a);
        Storage("tuan.mergeID",
            c);
        Storage("tuan.src_type", b)
    }, registShareBtn: function () {
        var a = this.getShareContent();
        Matrix.action.send({action: "registRightButton", type: "share", buttonText: "\u5206\u4eab", "function": {action: "share", content: a, urlType: "1"}})
    }, getMovieInfo: function (a) {
        var c = [];
        c.push({movieid: a, sign: 1});
        Matrix.action.send({action: "aosrequest", _action: "movieInfo", params: c, urlPrefix: Matrix.aosPrefixUrl.qqMovieContent, method: "POST", progress: "\u52a0\u8f7d\u4e2d"})
    }, getMovieInfoTuan: function (a) {
        var c = [];
        c.push({poiid: a,
            sign: 1});
        Matrix.action.send({action: "aosrequest", _action: "movieInfoTuan", params: c, urlPrefix: Matrix.aosPrefixUrl.qqMovieTuan, method: "POST", progress: "\u52a0\u8f7d\u4e2d"})
    }, getMovieInfoMore: function (a, c, b) {
        var d = [];
        d.push({poiid: a, sign: 1}, {movieid: c, sign: 1}, {ticketid: b, sign: 1});
        Matrix.action.send({action: "aosrequest", _action: "movieInfoMore", params: d, urlPrefix: Matrix.aosPrefixUrl.qqMovieMore, method: "POST", progress: "\u52a0\u8f7d\u4e2d"})
    }, getMovieDate: function (a, c, b) {
        var d = [];
        d.push({poiid: a, sign: 1},
            {movieid: c, sign: 1}, {mode: b});
        Matrix.action.send({action: "aosrequest", _action: "movieInfoDate", params: d, urlPrefix: Matrix.aosPrefixUrl.qqMovieDate, method: "POST"})
    }, getPicListData: function (a, c, b) {
        a = [
            {mode: a, sign: 1}
        ];
        b && a.push({itemid: b});
        c && a.push({poiid: c});
        Matrix.action.send({action: "aosrequest", _action: "picListData", params: a, urlPrefix: Matrix.aosPrefixUrl.qqMoviePicList, method: "POST", progress: "\u52a0\u8f7d\u4e2d"})
    }, getMovieContentPic: function (a, c) {
        var b = [];
        b.push({itemid: a}, {mode: c, sign: 1});
        Matrix.action.send({action: "aosrequest",
            _action: "movieInfoContentPic", params: b, urlPrefix: Matrix.aosPrefixUrl.qqMoviePicList, method: "POST", progress: "\u52a0\u8f7d\u4e2d"})
    }, openNearbyCinema: function (a) {
        Matrix.action.send({action: "OpenNearbyCinema", movieID: a})
    }, getShareContent: function () {
        return[
            {type: "weibo", message: "#\u7528\u9ad8\u5fb7\u8d5a\u6d41\u91cf#\u514d\u6d41\u91cf\u795e\u9a6c\u7684\u90fd\u5f31\u7206\u4e86\uff0c\u7528\u9ad8\u5fb7\u5730\u56fe\uff0c\u6bcf\u5929\u989d\u5916\u8d5a\u6d41\u91cf\uff0c\u7b7e\u5230\u5c31\u900130M\uff0c\u6700\u9ad8\u53ef\u5f9790M\uff0c\u6b22\u4e50\u70b9\u51fb\u9886\u53d6\uff1a",
                title: "\u514d\u8d39\u62ff\u6d41\u91cf\u55bd\uff01", url: "a=1"},
            {type: "weixin", message: "\u8fd8\u4e0d\u5feb\u6765\u62a2\uff01\u767d\u9001\u4f60\u90fd\u4e0d\u8981\uff1f\u9ad8\u5fb7\u514d\u8d39\u9001\u6d41\u91cf\uff0c\u7b7e\u5230\u900130M\uff0c\u6700\u9ad8\u53ef\u83b7\u5f9790M\uff01", title: "\u514d\u8d39\u62ff\u6d41\u91cf\u55bd\uff01", url: "a=1"},
            {type: "pengyou", message: "", title: "\u5feb\u6765\u62a2\uff01\u9ad8\u5fb7\u514d\u8d39\u9001\u6d41\u91cf\uff01\u7b7e\u5230\u5373\u900130M\uff0c\u6700\u9ad8\u53ef\u5f9790M",
                url: "a=1"}
        ]
    }, amapPay: function (a, c) {
        Matrix.action.send({action: "amapPay", type: a, params: c})
    }};