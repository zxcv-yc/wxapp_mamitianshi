var App = getApp();

function ajax(url,data) {
    return new Promise(function (resolve, reject) {
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
                success:function(e){
                  console.log(e)
                }
            });
            
    })
}
const requestPromise = myUrl => {
    // 返回一个Promise实例对象
    return new Promise((resolve, reject) => {
      wx.request({
        url: myUrl,
        success: res => resolve(res)
      })
    })
  }
module.exports = {
    ajax,
    requestPromise
}