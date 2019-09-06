//app.js
App({
    globalData: {
        user_id: 0,
        user_mobile: null,
        user_token: null,
    },
    year: null,
    month: null,
    day: null,
    access_token: null,
    siteInfo: require('siteinfo.js'),

    onLaunch: function() {
        this.getSystemInformation();
        this.setYMD();
        this.createAccessToken();
        this.setApiRoot()

    },
    /**
     * 获取系统信息
     */
    getSystemInformation: function() {
        let _this = this
            // 获取系统状态栏信息
        wx.getSystemInfo({
            success: function(e) {
                console.log(e)
                _this.globalData.StatusBar = e.statusBarHeight;
                let custom = wx.getMenuButtonBoundingClientRect();
                console.log(custom)
                _this.globalData.Custom = custom;
                _this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
                // console.log(this.globalData)
            }
        })
    },

    /**
     * 设置当前年月日
     */
    setYMD: function() {
        var date = new Date(Date.parse(new Date()));
        //获取年份  
        this.year = date.getFullYear();
        //获取月份  
        this.month = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        //获取当日日期 
        this.day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    },
    /**
     * 创建access_token
     */
    createAccessToken: function() {
        var access_token = null;
        let api_key = 'l2V|gfZp{8`;jzR~6Y1_FWlzdf';
        const md5_Obj = require('./utils/hex_md5.js');
        this.access_token = md5_Obj.hexMD5('MamiTianshi' + this.year + this.month + this.day + api_key);
        console.log(this.access_token)
    },
    /**
     * 设置api地址
     */
    setApiRoot: function() {
        // this.api_root = this.siteInfo.siteroot + 'index.php?s=/api/';
        this.api_root = this.siteInfo.siteroot + 'api.php/';
        this.upload_root = this.siteInfo.uploadroot + 'api.php/';
        this.path_root = this.siteInfo.uploadroot;

    },
    /**
     * post提交
     */
    _post_form: function(url, data, success, fail, complete) {
        wx.showNavigationBarLoading();
        let App = this;
        data.wxapp_id = App.siteInfo.uniacid;

        data.user_token = App.getGlobalData('user_token'),
        wx.request({
            url: App.api_root + url,
            header: {
                'content-type': 'application/x-www-form-urlencoded',
                'accesstoken': App.access_token,
            },
            method: 'POST',
            data: data,
            success: function(res) {
                if (res.statusCode !== 200 || typeof res.data !== 'object') {
                    App.showError('网络请求出错');
                    return false;
                }
                if (res.data.code === -1) {
                    // 登录态失效, 重新登录
                    App.doLogin(function() {
                        App._post_form(url, data, success, fail);
                    });
                    return false;
                } else if (res.data.code === 0) {
                    App.showError(res.data.msg, function() {
                        fail && fail(res);
                    });
                    return false;
                }
                success && success(res.data);
            },
            fail: function(res) {
                // console.log(res);
                App.showError(res.errMsg, function() {
                    fail && fail(res);
                });
            },
            complete: function(res) {
                wx.hideLoading();
                wx.hideNavigationBarLoading();
                complete && complete(res);
            }
        });
    },

    /**
     * 执行用户登录
     */
    doLogin: function() {
        // 保存当前页面
        let pages = getCurrentPages();
        if (pages.length) {
            let currentPage = pages[pages.length - 1];
            "pages/login/login" != currentPage.route &&
                wx.setStorageSync("currentPage", currentPage);
        }
        // 跳转授权页面
        wx.navigateTo({
            url: "/pages/login/login"
        });
    },
    /**
     * 判断是否登录
     */
    isLogin: function() {
        if (wx.getStorageSync('user_token') === '' || wx.getStorageSync('user_token') === null) {
            return false;
        } else {
            return true;
        }
    },
    /**
     * 显示失败提示框
     */
    showError: function(msg, callback) {
        wx.showModal({
            title: '友情提示',
            content: msg,
            showCancel: false,
            success: function(res) {
                // callback && (setTimeout(function() {
                //   callback();
                // }, 1500));
                callback && callback();
            }
        });
    },
    /**
     * 获取 App.globalData数据
     */
    getGlobalData: function(param) {
        return wx.getStorageSync(param);
    },

})