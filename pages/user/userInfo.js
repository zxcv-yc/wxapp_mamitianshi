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
        multiIndex: [0, 0, 0],
        p_Arr: [],
        multiArray: [
            ['无脊柱动物', '脊柱动物'],
            ['扁性动物', '线形动物', '环节动物', '软体动物', '节肢动物'],
            ['猪肉绦虫', '吸血虫']
        ],
        pObjArr: [{
            "id": 11,
            "name": "北京市"
        }, {
            "id": 12,
            "name": "天津市"
        }, {
            "id": 13,
            "name": "河北省"
        }, {
            "id": 14,
            "name": "山西省"
        }, {
            "id": 15,
            "name": "内蒙古自治区"
        }, {
            "id": 21,
            "name": "辽宁省"
        }, {
            "id": 22,
            "name": "吉林省"
        }, {
            "id": 23,
            "name": "黑龙江省"
        }, {
            "id": 31,
            "name": "上海市"
        }, {
            "id": 32,
            "name": "江苏省"
        }, {
            "id": 33,
            "name": "浙江省"
        }, {
            "id": 34,
            "name": "安徽省"
        }, {
            "id": 35,
            "name": "福建省"
        }, {
            "id": 36,
            "name": "江西省"
        }, {
            "id": 37,
            "name": "山东省"
        }, {
            "id": 41,
            "name": "河南省"
        }, {
            "id": 42,
            "name": "湖北省"
        }, {
            "id": 43,
            "name": "湖南省"
        }, {
            "id": 44,
            "name": "广东省"
        }, {
            "id": 45,
            "name": "广西壮族自治区"
        }, {
            "id": 46,
            "name": "海南省"
        }, {
            "id": 50,
            "name": "重庆市"
        }, {
            "id": 51,
            "name": "四川省"
        }, {
            "id": 52,
            "name": "贵州省"
        }, {
            "id": 53,
            "name": "云南省"
        }, {
            "id": 54,
            "name": "西藏自治区"
        }, {
            "id": 61,
            "name": "陕西省"
        }, {
            "id": 62,
            "name": "甘肃省"
        }, {
            "id": 63,
            "name": "青海省"
        }, {
            "id": 64,
            "name": "宁夏回族自治区"
        }, {
            "id": 65,
            "name": "新疆维吾尔自治区"
        }, {
            "id": 71,
            "name": "台湾省"
        }, {
            "id": 81,
            "name": "香港特别行政区"
        }, {
            "id": 82,
            "name": "澳门特别行政区"
        }],
        aa: ["请选择省份"],
        bb: ["请选择省份"],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var abc = []

        this.setData({
            p_arr: this.splitGame(this.data.pArr, "name"),

        })
        abc.push(this.data.p_arr)
        abc.push(this.data.aa)
        abc.push(this.data.bb)
        this.setData({
            p_Arr: abc
        })
        console.log(this.data.p_Arr)
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
            var _pid = _this.data.pObjArr[e.detail.value].id
            console.log(pid)
        }
        var poi = [{
            "id": 61,
            "name": "陕西省"
        }, {
            "id": 62,
            "name": "甘肃省"
        }, {
            "id": 63,
            "name": "青海省"
        }, {
            "id": 64,
            "name": "宁夏回族自治区"
        }, {
            "id": 65,
            "name": "新疆维吾尔自治区"
        }, {
            "id": 71,
            "name": "台湾省"
        }, {
            "id": 81,
            "name": "香港特别行政区"
        }, {
            "id": 82,
            "name": "澳门特别行政区"
        }]
        console.log(e)
        var zxc = this.data.p_Arr
        var asd = this.splitGame(poi, 'name')
        zxc[1] = asd
        console.log(asd)
        this.setData({
            p_Arr: zxc
        })
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
     * 选择地址
     */
    RegionChange: function (e) {
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
        })
    },
    /**
     * 提交数据到后台
     */
    submitDate: function (e) {
        console.log(this.data.pArr)

        return false;
        var values = e.detail.value
        values.us_age = parseInt(values.us_age)
        values.us_sex ? values.us_sex = 1 : values.us_sex = 2
        console.log(values)
        if (!_this.validation(values)) {
            App.showError(_this.data.error);
            return false
        }
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