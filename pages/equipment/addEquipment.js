// pages/equipment/addEquipment.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLoad:null,//加载动画 null=加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    wx.openBluetoothAdapter({
      success: (result)=>{
        console.log(result)
        setTimeout(() => {
          this.getBluetoothAdapterState()
      }, 1000)
      },
      fail: (e)=>{
        console.log(e)
      },
      complete: ()=>{}
    });
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
  getBluetoothAdapterState:function() {
    var that = this;
    that.toastTitle = '检查蓝牙状态'
    wx.getBluetoothAdapterState({
        success: function(res) {
           _this.startBluetoothDevicesDiscovery()
        },
        fail(res) {
            console.log(res)
        }
    })
},
startBluetoothDevicesDiscovery:function() {
  var that = this;
  setTimeout(() => {
      wx.startBluetoothDevicesDiscovery({
          success: function(res) {
              /* 获取蓝牙设备列表 */
              that.getBluetoothDevices()
          },
          fail(res) {
          }
      })
  }, 1000)
}
})