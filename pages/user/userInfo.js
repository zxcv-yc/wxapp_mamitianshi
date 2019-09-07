const App = getApp();

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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getProvince()

        this.getUserInfo()
        let _this = this
        // App._post_form_ice('region/getCity', {
        //     pid: 0
        // }, function (res) {
        //     console.log(res)
        //     _this.setData({
        //         pArr: res.data
        //     })
        // })

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {},

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
        })
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
            zhenIndex: e.detail.value
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
    fff: function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].id === id) {
                return i
            }
        }
    },
    /**
     * 获取省份数据
     */
    getProvince: function (pid) {
        let _this = this
        App._post_form("region/getCity", {
            pid: pid
        }, function (res) {
            console.log(res)
            // return false
            return res.data.province

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
            if (result.data.sheng_shi_qu == null) {
                _this.setData({
                    region: ['请选择']
                })
            }
            var abc = []
            var zeroData = _this.getProvince(0)
            if (result.data.us_sheng === '' || result.data.us_sheng === null || result.data.us_sheng === 0) {
                abc.push(zeroData.province)
                abc.push(zeroData.city)
                abc.push(zeroData.district)
                console.log(abc)
                _this.setData({
                    multiArray: abc
                })
            } else {
                var index_arr
                // var shengIndex = _this.fff(zeroData, result.data.us_sheng) //37
                // var shiIndex = _this.fff(_this.getProvince(result.data.us_sheng), result.data.us_shi) //37
                // var quIndex = _this.fff(_this.getProvince(result.data.us_shi), result.data.us_qu)
                //var shengArr = zeroData.province
                console.log(_this.getProvince(0))
                var shiArr = _this.getProvince(result.data.us_sheng)
                console.log(shiArr)
                return false
                var zhen_index = _this.fff(_this.getProvince(result.data.us_qu), result.data.us_zhen)
                index_arr.push(_this.fff(shengArr, result.data.us_sheng))
                index_arr.push(_this.fff(_this.getProvince(result.data.us_sheng), result.data.us_shi))
                index_arr.push(_this.fff(_this.getProvince(result.data.us_shi), result.data.us_qu))
                _this.setData({
                    indexArr: index_arr,
                    zhenIndex:zhen_index,
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
        values.us_zhen = _this.data.zhenArray[_this.data.zhenIndex].id
        console.log(values)
        if (!_this.validation(values)) {
            App.showError(_this.data.error);
            return false
        }
        App._post_form("user/editUserInfo", values, function (res) {
            console.log(res)
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