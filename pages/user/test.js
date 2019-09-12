 const pro = require('../../utils/promisify')
 var App = getApp();

 Page({

   /**
    * 页面的初始数据
    */
   data: {
     myData: ''
   },
   loadMyData() {
     console.log(this.data.myData)
   },
   /**
    * 生命周期函数--监听页面加载
    */
   onLoad: function (options) {
     var qwe = function (url, data) {
       var postPromise = new Promise((resolve, reject) => {
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
             success: function (e) {
               resolve(e)
             }
           });
       })
       console.log(postPromise)
       return postPromise

     }
     qwe("region/getCity", {
       pid: 1
     }).then(res => {
       console.log(res)
     })

     App._post_form("region/getCity", {
       pid: 0
     }, function (res) {
       console.log(res)
     })
   },

   /**
    * 生命周期函数--监听页面初次渲染完成
    */
   onReady: function () {
     function ij(name, age) {
       this.name = name
       this.age = age
     }
     var oi = new ij("小明",20)
     console.log(oi.name)
   },

   /**
    * 生命周期函数--监听页面显示
    */
   onShow: function () {

   },

   /**
    * 生命周期函数--监听页面隐藏
    */
   onHide: function () {

   },

   /**
    * 生命周期函数--监听页面卸载
    */
   onUnload: function () {

   },

   /**
    * 页面相关事件处理函数--监听用户下拉动作
    */
   onPullDownRefresh: function () {

   },

   /**
    * 页面上拉触底事件的处理函数
    */
   onReachBottom: function () {

   },

   /**
    * 用户点击右上角分享
    */
   onShareAppMessage: function () {

   }
 })