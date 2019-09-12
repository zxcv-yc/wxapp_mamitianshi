const App = getApp();
const $ = require('../../utils/promisify')


Page({

    /**
     * 页面的初始数据
     */
    data: {
        region: ['广东省', '广州市', '海珠区'],
        eDate: '2018-12-25',
        bDate: '2018-12-25',
        indexArr: [0, 0, 0],
        multiArray: [],

        aa: [{
            "id": 1101,
            "name": '北京市'
        }],
        pIndex: 0,
        usSheng: null, //需要向后台发送的省市区ID
        usShi: null,
        usQu: null,
        zhenArray: [{
            "name": "请先选择省市区"
        }],
        zhenIndex: 0, //乡镇选择器的索引

        showLoad: 1,

        ssq: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getUserInfo()
        let _this = this
        // this.getProvince()
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
     * picker监听列改变
     */
    MultiColumnChange: function (e) {
        let _this = this
        if (e.detail.column === 0) { //如果改变的是省份
            var _pid = _this.data.multiArray[0][e.detail.value].id
            _this.data.pIndex = e.detail.value
            console.log(_this.data.pIndex)
            App._post_form("region/getCity", {
                pid: _pid
            }, function (res) {
                var zxc = _this.data.multiArray
                zxc[1] = res.data.city
                zxc[2] = res.data.district
                _this.setData({
                    multiArray: zxc,
                })

            })
            _this.setData({
                indexArr: [_this.data.pIndex, 0, 0]
            })
            console.log(_this.data.indexArr)
        }
        if (e.detail.column === 1) { //如果改变的是市
            var _pid = _this.data.multiArray[1][e.detail.value].id
            App._post_form("region/getCity", {
                pid: _pid
            }, function (res) {
                // return false;
                var zxc = _this.data.multiArray
                zxc[2] = res.data
                _this.setData({
                    multiArray: zxc,
                })
            })
            _this.setData({
                indexArr: [_this.data.pIndex, e.detail.value, 0]
            })
            console.log(_this.data.pIndex)

        }

        console.log(e)

    },
    /**
     * 遍历二维数组，提取元素成为一维数组
     */
    splitGame: function (arr, key) {
        var data = [];
        arr.map(function (value, index) {
            data.push(value[key]);
        });
        return data;
    },

    /**
     * 选择地址(点击确定触发)
     */
    MultiChange: function (e) {
        let _this = this
        console.log(e)
        this.setData({
            indexArr: e.detail.value,
            usSheng: this.data.multiArray[0][e.detail.value[0]].id,
            usShi: this.data.multiArray[1][e.detail.value[1]].id,
            usQu: this.data.multiArray[2][e.detail.value[2]].id,
            ssqIndex: e.detail.value
        })
        console.log(_this.data.indexArr)
        App._post_form("region/getCity", {
            pid: this.data.usQu
        }, function (res) {
            _this.setData({
                zhenArray: res.data
            })
        })

    },
    /**
     * 选择乡镇/街道
     */
    zhenChange: function (e) {
        console.log(e)
        this.setData({
            zhenIndex: e.detail.value,
            us_zhen: this.data.zhenArray[e.detail.value].id
        })
        console.log(this.data.us_zhen)
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
    /**
     * 获取省份数据
     */
    getProvince: function () {
        let _this = this
        App._post_form("region/getCity", {
            pid: 0
        }, function (res) {
            console.log(res)
            var abc = []
            abc.push(res.data.province)
            abc.push(res.data.city)
            abc.push(res.data.district)
            console.log(abc)
            _this.setData({
                multiArray: abc,
                showLoad: false
            })
        })
    },
    /**
     * 获取用户详情
     */
    getUserInfo: function () {
        let _this = this
        App._post_form('user/getUserInfo', {
            access_token: App.access_token,
            user_token: App.getGlobalData('user_token')
        }, function (result) {
            console.log(result)
            var ssqIndex = result.data.ssq_index.split(",").map(Number)
            var zhen_index = ssqIndex[3]
            ssqIndex.splice(-1, 1)


            _this.setData({
                us_name: result.data.us_name,
                sex_checked: result.data.us_sex === 1 ? true : false,
                us_age: result.data.us_age,
                mobile: result.data.mobile,
                id_card: result.data.id_card,
                bDate: result.data.id_card_begintime,
                eDate: result.data.id_card_endtime,
                sheng_shi_qu: result.data.sheng_shi_qu,
                address_detail: result.data.address_detail,
                indexArr: ssqIndex,
                zhenIndex: zhen_index,
                usSheng: result.data.us_sheng,
                usShi: result.data.us_shi,
                usQu: result.data.us_qu,
                usZhen: result.data.us_zhen,
            })

            if (result.data.id_card_begintime == null) {
                _this.setData({
                    bDate: '请选择'
                })
            }
            if (result.data.id_card_endtime == null) {
                _this.setData({
                    eDate: '请选择'
                })
            }
            if (result.data.us_sheng === '' || result.data.us_sheng === 0) {
                _this.getProvince()
            } else {
                var ssq = []
                App._post_form("region/getCity", {
                    pid: 0
                }, function (res) {
                    ssq.push(res.data.province)
                    App._post_form("region/getCity", {
                        pid: result.data.us_sheng
                    }, function (res) {
                        ssq.push(res.data.city)

                        App._post_form("region/getCity", {
                            pid: result.data.us_shi
                        }, function (res) {

                            ssq.push(res.data)
                            _this.setData({
                                multiArray: ssq,
                                // indexArr:ssqIndex.splice(-1,1)
                            })
                            App._post_form("region/getCity", {
                                pid: result.data.us_qu
                            }, function (res) {

                                _this.setData({
                                    zhenArray: res.data,
                                    showLoad: false
                                })

                            })
                        })
                    })
                })
            }
        })
    },

    /**
     * 提交数据到后台
     */
    submitDate: function (e) {
        let _this = this
        console.log(e.detail.value)
        var values = e.detail.value
        values.us_age = parseInt(values.us_age)
        values.us_sex ? values.us_sex = 1 : values.us_sex = 2
        values.us_sheng = _this.data.usSheng
        values.us_shi = _this.data.usShi
        values.us_qu = _this.data.usQu
        values.sheng_shi_qu = _this.data.multiArray[0][_this.data.indexArr[0]].name + '/' + _this.data.multiArray[1][_this.data.indexArr[1]].name + '/' + _this.data.multiArray[2][_this.data.indexArr[2]].name + '/' + _this.data.zhenArray[_this.data.zhenIndex].name
        console.log(_this.data.multiArray)
        console.log(_this.data.indexArr)
        values.us_zhen = _this.data.zhenArray[_this.data.zhenIndex].id


        if (!_this.validation(values)) {
            App.showError(_this.data.error);
            return false
        }
        // _this.data.ssqIndex.push(parseInt(_this.data.zhenIndex))
        values.ssq_index.push(parseInt(_this.data.zhenIndex))

        console.log(values)
        // return false
        App._post_form("user/editUserInfo", values, function (res) {
            if (res.code === 200) {
                wx.showToast({
                    title: '保存成功',
                    icon: 'success',
                    duration: 1500,
                    mask: false,
                });
                // wx.navigateBack({
                //     delta: 1
                // });

            }
        })
    },

    /**
     * 表单验证
     */
    validation: function (v) {
        if (v.us_name === '' || v.us_name.length < 2) {
            this.data.error = '请输入您的真实姓名';
            return false;
        }
        let reg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/;
        if (!reg.test(v.mobile)) {
            this.data.error = '手机号不符合要求';
            return false;
        }
        let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
        if (!idcardReg.test(v.id_card)) {
            this.data.error = '身份证号不合规范'
            return false;
        }
        if (v.address_detail === '') {
            this.data.error = '详细地址不能为空';
            return false;
        }
        if (v.us_sheng === '' || v.us_sheng === null || v.us_shi === '' || v.us_shi === null || v.us_qu === '' || v.us_qu === null) {
            this.data.error = '请选择所在地区';
            return false;
        }
        if (v.us_age === '' || v.us_age === NaN) {
            this.data.error = '年龄不能为空';
            return false;
        }
        if (v.id_card_begintime >= v.id_card_endtime) {
            this.data.error = '身份证有效期开始日期不可大于或等于结束日期';
            return false;
        }
        return true;
    },
})