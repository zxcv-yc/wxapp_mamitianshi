// pages/equipment/addEquipment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isLoad: null, //加载动画 null=加载
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
        wx.openBluetoothAdapter({
            success: (result) => {
                console.log(result)
                setTimeout(() => {
                    this.getBluetoothAdapterState()
                }, 1000)
            },
            fail: (e) => {
                wx.showModal({
                    title: '',
                    content: '请开启手机蓝牙后再试',
                    showCancel: true,
                    cancelText: '取消',
                    cancelColor: '#000000',
                    confirmText: '确定',
                    confirmColor: '#3CC51F',
                    success: (result) => {
                        wx.navigateBack({ //点击确定与取消都会执行
                            delta: 1
                        });
                        if (result.confirm) { //确定

                        }
                        console.log(result)
                    },
                    fail: () => {},
                    complete: () => {}
                });
            },
            complete: () => {}
        });
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
    getBluetoothAdapterState: function() {
        var that = this;
        that.toastTitle = '检查蓝牙状态'
        wx.getBluetoothAdapterState({
            success: function(res) {
                that.startBluetoothDevicesDiscovery()
            },
            fail(res) {
                console.log(res)
            }
        })
    },
    startBluetoothDevicesDiscovery: function() {
        var that = this;
        setTimeout(() => {
            wx.startBluetoothDevicesDiscovery({
                success: function(res) {
                    /* 获取蓝牙设备列表 */
                    that.getBluetoothDevices()
                },
                fail(res) {}
            })
        }, 1000)
    },
    getBluetoothDevices: function() {
        var that = this;
        setTimeout(() => {
            wx.getBluetoothDevices({
                services: [],
                allowDuplicatesKey: false,
                interval: 0,
                success: function(res) {
                    console.log(res)
                    return
                    if (res.devices.length > 0) {
                        if (JSON.stringify(res.devices).indexOf(that.deviceName) !== -1) {
                            for (let i = 0; i < res.devices.length; i++) {
                                if (that.deviceName === res.devices[i].name) {
                                    /* 根据指定的蓝牙设备名称匹配到deviceId */
                                    that.deviceId = that.devices[i].deviceId;
                                    setTimeout(() => {
                                        that.connectTO();
                                    }, 2000);
                                };
                            };
                        } else {}
                    } else {}
                },
                fail(res) {
                    console.log(res, '获取蓝牙设备列表失败=====')
                }
            })
        }, 2000)
    },
})