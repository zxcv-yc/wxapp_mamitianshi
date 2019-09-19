// pages/appointment/beginAppointment.js
var WxParse = require('../../wxParse/wxParse.js');
let App = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.getBabyList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  },
  /**
   * 获取宝宝列表
   */
  getBabyList: function () {
    let _this = this
    App._post_form("baby/getBabyList", {}, res => {
      console.log(res)
      var resData = JSON.parse(App.decrypt(res.data))
      console.log(resData)
      if (resData[0] == undefined) {
        console.log("if here")
        _this.setData({
          babyList: null,
          showLoad: false
        })
      } else {
        _this.setData({
          babyList: resData,
          showLoad: false
        })
      }

    })
  },
  /**
   * 选择baby
   */
  chooseBaby: function (e) {
    let _this  =this
    _this.setData({
      index: e.detail.value
    })
    var _data = App.encrypt(JSON.stringify({baby_id:_this.data.babyList[e.detail.value].id}))

    App._post_form('vaccine/getWeekVaccineInfo',{week:25},res=>{
      console.log(res)
      var resData =res.data
      _this.setData({
        vacList:resData
      })
    // App._post_form('baby/getBabyVaccineInfo',{data:_data},res=>{
    //   console.log(res)
    //   var resData=JSON.parse(App.decrypt(res.data))
    //   console.log(resData)
    //   _this.setData({
    //     vacList:resData
    //   })
      for (var i = 0; i < resData.length; i++) {
        console.log(i)
        WxParse.wxParse('vacText' + i, 'html', resData[i].vaccine_text, _this);
        if (i === resData.length - 1) {
          WxParse.wxParseTemArray("vacTextArr", 'vacText', resData.length, _this)
        }
      }
    })

  },
  /**
   * 点击显示(隐藏)疫苗简介
   */
  showVacModal:function(){
    this.setData({
      show:1
    })
  },
  hideModal:function(){
    this.setData({
      show:false
    })
  }
})