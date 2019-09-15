// pages/baby/chooseInjectposition.js
var App = getApp();
var WX_RAS = require('../../utils/rsa_public.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id_name: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.geteInjectpositionList()
            // console.log(JSEncrypt)

        // this.getEncryptKey()


        var pub_key = `-----BEGIN PUBLIC KEY-----
            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDpoODVtnSztGyb//p+g/Ob36jb
            3jzWzS2qovOjpY/rrTjwlVcQpB2m1nZDQNpTFsG8ZBl7uPw3M81lr7NRRn6tY7Om
            8tbOOsRgY6u0xwbgdRStFFvwPzZ1HehiQ6WB8za8cucCyvuqmBRp7HOjO4Aa9t0r
            IvZ/hoWMeSvjnAVbMwIDAQAB
            -----END PUBLIC KEY-----`
        console.log(WX_RAS.jiemi('fcp8gAL36Cxby/IFyEWOHbyk/9wRnBPvNoCnOdwyU3wenk1hj6rsn/S6XVIQNWSrhhPa1xjDC4n99ZYEsiJysNtGcM8dyCyDSe3WBXXg03SavsE4Q+oP9kSW+klAn1LXznAaMLd0cJhn6pZYr0x2gMDeaiSelWwrB6fETIgSl2Y=', pub_key))



    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    },
    /**
     * 提交
     */
    submitData: function(e) {
        if (!this.data.id_name) {
            wx.showModal({
                title: '提示',
                showCancel: false,
                content: '请您选择接种点',
                confirmText: '确定',
                confirmColor: '#3CC51F',
            });

        } else {
            wx.setStorage({
                key: 'inj_id_name',
                data: this.data.id_name,
                success: (result) => {
                    wx.navigateBack({
                        delta: 1
                    });
                },
            });
        }



    },
    /**
     * 单选框改变监听
     */
    radioFill: function(e) {
        var value = e.detail.value
        value.split(',')
        this.setData({
                id_name: value.split(",")
            })
            // var privateKey = '-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQCoChRDJ6e7BTE5yYBIS + NGYBpDs7ftEematqhvMmOFcJng7qjJk + yJ1j7DCqbCD2f / BI6gTfGXASiYuO6kklZu8Pkw4HAUkaaGyhaC8Z + TMg79PPRz5hziEdFXPTdXvXudiXbI2Wi6D90ZaSwN6ZHs7Mtc5VgGK3jxS35iLm+ oAQIDAQABAoGBAI + nHi9SxUdSZwS5yBsGFSNioNFj4Eag243RvShicUXwPvxVyqGY / cvQBhODFZAsz4Dpimxsda3b5bK51fmGyK / nXraHRunWcG7cDDB0EnRpGh4LvMI5Tny + kV0v07N0kkYF+ Lig88IjyBXMAY8m97QK / Huf6MsDFo7B6maSvlmBAkEA35GXk6achryGAoUyyLSro7bI9A9 + wXWFdXoqu1 / X1sZ8taGy7saB + XEA6EQ + XHRp7rZkQ5StoBL +reDGvLJLWQJBAMBqW / F + qg1VpmV / EfYTSS0 + jliw / Ik4kKHLuD / bYK61FG80JIoxLbelB / 1ZVZ8WR0cUKgrmoo8HOggjocNTNOkCQQCYibK86CHGAF0C3TSgIj01r2H+u4 / FmVScqeT8AVG31aeDGbeHGOPXeJWg4 + cUl80rNUDFp2yrWipwInwWhSPJAkAf+ 02u9Ru0vbC7nARTP19hWs10Jm7DLBi2G9NTIdaPE2ADH8qXAZeUt6R9UrTtjVlpkgtu5mjMlynpImsHuTPJAkEAoU10QspqfxL4F44KdHjHY1btc8wb4soaLy / eAY8PLE + jpNh8jsqA8v1EqLQbYz50D / BpkJsT5W + wydTvtEE3sA ==-----END RSA PRIVATE KEY-----'
            // var publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoChRDJ6e7BTE5yYBIS + NGYBpDs7ftEematqhvMmOFcJng7qjJk + yJ1j7DCqbCD2f / BI6gTfGXASiYuO6kklZu8Pkw4HAUkaaGyhaC8Z+ TMg79PPRz5hziEdFXPTdXvXudiXbI2Wi6D90ZaSwN6ZHs7Mtc5VgGK3jxS35iLm+ oAQIDAQAB-----END PUBLIC KEY-----'
            // console.log(WX_RAS.jiami("中文，ABC,123",pub_key))
        console.log(this.data.rsa_pub)
        console.log(this.data.aes_key)
            // console.log(WX_RAS.jiemi(this.data.aes_key, this.data.rsa_pub))
        console.log(WX_RAS.getDetryptPwd(this.data.aes_key, this.data.rsa_pub))

    },
    // RvltOtv0eMwwO8risWSNKgVWKc/E7evEMCF/WzQ3OHL+fsRp4EhpSf2yuaFLBAu6jueChP/JGV2kuBNd+UEz9M6eAnzzDWim5bTQ6gpP5Stt8R9w+/UPgChTil1E8xQHc3pYkbuVmNdKhKYb033Esi5cj9KfYy4pI6wPf6ooxV8=
    /**
     * 获取相应街道下的接种点列表
     */
    geteInjectpositionList: function() {
        let _this = this
        App._post_form("user/getUserInfo", {}, result => {
            console.log(result)
            App._post_form_ice("injectposition/positionList", {
                town: result.data.us_zhen
            }, res => {
                console.log(res)
                _this.setData({
                    list: res.data
                })
            })
        })
    },

    getEncryptKey: function() {
        let _this = this
        App._post_form("common/encryptKey", {}, res => {
            console.log(res)
            _this.setData({
                rsa_pub: res.data.rsa_pub,
                aes_key: res.data.aes_key
            })
        })
    },

})