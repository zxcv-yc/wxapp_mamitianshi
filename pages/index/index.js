// pages/index/index.js
var App = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    for_index: 0,
    TabCur: 0,
    scrollLeft: 0,
    cardCur: 0,
    DotStyle: 1, //轮播限高
    swiperList: [{
      id: 0,
      type: 'image',
      url: '../../images/banner.png'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
    }],
    defaultBaby:null,//默认的baby
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(App.year + '-' + App.month + '-' + App.day);
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
   * Tab
   */
  tabSelect(e) {
    console.log(e)
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      for_index: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  /**
   * 获取宝宝列表
   */
  getBabyList: function () {
    let _this = this
    App._post_form("baby/getBabyList", {}, res => {
      var resData = JSON.parse(App.decrypt(res.data))
      _this.setData({
        defaultBaby: _this.findTheDefault(resData)
      })
      console.log(_this.data.defaultBaby)
    })
  },
  /**
   * 遍历宝宝列表取出默认宝宝信息
   */
  findTheDefault: function (data) {
    for (var i = 0; i < data.length; i++) {
      if(data[i].is_default){
        return data[i]
        break
      }
    }
  },

})