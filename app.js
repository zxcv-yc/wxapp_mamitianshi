//app.js
App({
  globalData: {
    userInfo: null
  },
  onLaunch: function() {
    let _this = this
    // 获取系统状态栏信息
    wx.getSystemInfo({
      success: function(e){
          console.log(e)
        _this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        console.log(custom)
        _this.globalData.Custom = custom;
        _this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
        // console.log(this.globalData)
      }
    })
    console.log(this.globalData)
  },
 
})