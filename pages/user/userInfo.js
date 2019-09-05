// pages/user/userInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: ['广东省', '广州市', '海珠区'],
        eDate: '2018-12-25',
        bDate: '2018-12-25',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {

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
     * 选择地址
     */
    RegionChange: function(e) {
        this.setData({
            region: e.detail.value
        })
    },
    /**
     * 选择日期(起始日期)
     */
    beginDateChange(e) {
        this.setData({
            bDate: e.detail.value
        })
    },
    /**
     * 选择日期(截止日期)
     */
    endDateChange(e) {
        this.setData({
            eDate: e.detail.value
        })
    },
})