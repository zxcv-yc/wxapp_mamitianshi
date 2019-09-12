// pages/baby/chooseInjectposition.js
var App = getApp();
var WX_RAS = require('../../utils/rsa_public.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id_name: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.geteInjectpositionList()
    // console.log(JSEncrypt)

    this.getEncryptKey()





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
   * 提交
   */
  submitData: function (e) {
    if (!this.data.id_name) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        content: '请您选择接种点',
        confirmText: '确定',
        confirmColor: '#3CC51F',
      });

    } else {
      wx.setStorage({
        key: 'inj_id_name',
        data: this.data.id_name,
        success: (result) => {
          wx.navigateBack({
            delta: 1
          });
        },
      });
    }



  },
  /**
   * 单选框改变监听
   */
  radioFill: function (e) {
    var value = e.detail.value
    value.split(',')
    this.setData({
      id_name: value.split(",")
    })
    // var privateKey = '-----BEGIN RSA PRIVATE KEY-----MIICXgIBAAKBgQCoChRDJ6e7BTE5yYBIS + NGYBpDs7ftEematqhvMmOFcJng7qjJk + yJ1j7DCqbCD2f / BI6gTfGXASiYuO6kklZu8Pkw4HAUkaaGyhaC8Z + TMg79PPRz5hziEdFXPTdXvXudiXbI2Wi6D90ZaSwN6ZHs7Mtc5VgGK3jxS35iLm+ oAQIDAQABAoGBAI + nHi9SxUdSZwS5yBsGFSNioNFj4Eag243RvShicUXwPvxVyqGY / cvQBhODFZAsz4Dpimxsda3b5bK51fmGyK / nXraHRunWcG7cDDB0EnRpGh4LvMI5Tny + kV0v07N0kkYF+ Lig88IjyBXMAY8m97QK / Huf6MsDFo7B6maSvlmBAkEA35GXk6achryGAoUyyLSro7bI9A9 + wXWFdXoqu1 / X1sZ8taGy7saB + XEA6EQ + XHRp7rZkQ5StoBL +reDGvLJLWQJBAMBqW / F + qg1VpmV / EfYTSS0 + jliw / Ik4kKHLuD / bYK61FG80JIoxLbelB / 1ZVZ8WR0cUKgrmoo8HOggjocNTNOkCQQCYibK86CHGAF0C3TSgIj01r2H+u4 / FmVScqeT8AVG31aeDGbeHGOPXeJWg4 + cUl80rNUDFp2yrWipwInwWhSPJAkAf+ 02u9Ru0vbC7nARTP19hWs10Jm7DLBi2G9NTIdaPE2ADH8qXAZeUt6R9UrTtjVlpkgtu5mjMlynpImsHuTPJAkEAoU10QspqfxL4F44KdHjHY1btc8wb4soaLy / eAY8PLE + jpNh8jsqA8v1EqLQbYz50D / BpkJsT5W + wydTvtEE3sA ==-----END RSA PRIVATE KEY-----'
    // var publicKey = '-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoChRDJ6e7BTE5yYBIS + NGYBpDs7ftEematqhvMmOFcJng7qjJk + yJ1j7DCqbCD2f / BI6gTfGXASiYuO6kklZu8Pkw4HAUkaaGyhaC8Z+ TMg79PPRz5hziEdFXPTdXvXudiXbI2Wi6D90ZaSwN6ZHs7Mtc5VgGK3jxS35iLm+ oAQIDAQAB-----END PUBLIC KEY-----'
    var qwer = '-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxJQscoQ0wizwWsvO4IIokysRnAYjpUusF/CN/CbY/kF+xe47LN8ueiYnWFX8I6egwr7jTtTo35Z4xY+jeTIT/ZWgLd+nOR+eQKtYKEFa5JtPDW0lZT7MLsGw85Xj4Mqgh/nN5VX5f6FBhVqIhhWmVIp9+1vuE7Jq98vSU2Yskk3nk8jSGQ5pzXv1zylSgJd8zyO7qxo6DEY+uAT1aE5oxm8MmVkabKhnK2P8DBI3Kf8cm2HxmoWx4ahDBzGx6BkO0l9orq5agEdgMZw29W8cE1ykq6j/p5HoVFLDmRw+gooNCe7c1B/poYGIxX/SteWT6fvGUldJeDyKqDRmnigCzAgMBAAECggEABLbHpOtkPnZ2EuSQN8Yl5vS+ZT9VNWBPgMlE6IyJnQdqhH6VPjMt5/ohAOFxj/spgqIqePfJpNMncokGGWRP5bv9GNEIF8UyFFQPfhURObwexoQXX5kPWrBHMReqMHCoqL7ss73irwqvmOeFSP8T4DQbqnRuHQtu0r80YwGnAkIfFrZjPCI24jT9yUSnm8j4nb0BiQ1/VVSgfl0N7WVF+rmfblxpI2eyM4Lse1jo6tM7JrcpNDRiV1+0IzYDt/TMYKBhpqzQ2XonGFkD1vF9AAWuFK2066HqQ93ELD4B15aMy9tGfaWkZQTBzuM9PROPqCsHcR337lmHl78F4WPIgQKBgQDWlbYBoztHngCQ9vA8/QfGZlJryGVEVQsyLbikuF9lSJnGD5l6UBGPabnlSxw3rEdAVybfw0ZLP33nyShPWgaSeW2NrCJ+Gc+jvD8GHDezol/jkuaBJ9jf9Q4r30OgSBYSaMK635fpu9psF7YSjQ0aNuoypluzEt7C6rPB36ejHwKBgQDTVXomxgyT8ihoC8J6Nv7rMaDk4xvy3Zcf/3gc+CIYuhf76rlZPOGzAmybJYBe9twNkkpIxJc7rg2zHLqVM+LfaEPMov1sJrLasshLvuQVgvQHAlIweDwOtSiRpmZbvE67pzd3gEfWvfgKs+6P4OSNJwDW+4ZMdT/xLMNhHV1j7QKBgGda6LVVN+JA2ij4p7HYdfw7oItFlHEbPS9IEl1UaK5SD670KIpfMnYPCHjGeqreEduNnq28Uok/5ZbUrtO5mtzGG9xXAq4WJIrKythYkwO0u9bTFK800CLe15qOCPaUgf0P9Gsp8vOjhYr2yL2arqrntFn9AsH33s+nWDmTTh0lAoGAVHNK7eWkrxZM2U8htw71DW12myC6UXIFay7+g60QiwsKfIvO538xvgQQ/GqfAtPpGa9E6hFNUfb62IF5ehgS6C3VMhhL5wUL4eMhsUsmAAall4tw5peVgFcaUCHLs4rrd4eZ3bIwgvrE/RnsEijPjCxy5HX8s98C31CA/vTqFf0CgYAYKwwVBwPqui+vYvNtYvjI5wFspJyB9bxh8CckIHfDVL/7Xl9oM9ex1vlKcaL/zCLlUqsX64EM4G6o61+3d2Zvb4yEZjHvfUokhBBXFp6ceezoUFfpJ0dhu4TLBZkhr7JKkF8whP5M+LY4gVyapXRHKtjsRIcdwCuDJjwVMGeImQ==-----END PRIVATE KEY-----'
    var pub_key = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsSULHKENMIs8FrLzuCCKJMrEZwGI6VLrBfwjfwm2P5BfsXuOyzfLnomJ1hV / COnoMK + 407U6N + WeMWPo3kyE / 2VoC3fpzkfnkCrWChBWuSbTw1tJWU + zC7BsPOV4 + DKoIf5zeVV + X + hQYVaiIYVplSKfftb7hOyavfL0lNmLJJN55PI0hkOac179c8pUoCXfM8ju6saOgxGPrgE9WhOaMZvDJlZGmyoZytj / AwSNyn / HJth8ZqFseGoQwcxsegZDtJfaK6uWoBHYDGcNvVvHBNcpKuo / 6eR6FRSw5kcPoKKDQnu3NQf6aGBiMV / 0rXlk + n7xlJXSXg8iqg0Zp4oAswIDAQAB-----END PUBLIC KEY-----'
    var pri_key = '-----BEGINPRIVATEKEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCxJQscoQ0wizwWsvO4IIokysRnAYjpUusF/CN/CbY/kF+xe47LN8ueiYnWFX8I6egwr7jTtTo35Z4xY+jeTIT/ZWgLd+nOR+eQKtYKEFa5JtPDW0lZT7MLsGw85Xj4Mqgh/nN5VX5f6FBhVqIhhWmVIp9+1vuE7Jq98vSU2Yskk3nk8jSGQ5pzXv1zylSgJd8zyO7qxo6DEY+uAT1aE5oxm8MmVkabKhnK2P8DBI3Kf8cm2HxmoWx4ahDBzGx6BkO0l9orq5agEdgMZw29W8cE1ykq6j/p5HoVFLDmRw+gooNCe7c1B/poYGIxX/SteWT6fvGUldJeDyKqDRmnigCzAgMBAAECggEABLbHpOtkPnZ2EuSQN8Yl5vS+ZT9VNWBPgMlE6IyJnQdqhH6VPjMt5/ohAOFxj/spgqIqePfJpNMncokGGWRP5bv9GNEIF8UyFFQPfhURObwexoQXX5kPWrBHMReqMHCoqL7ss73irwqvmOeFSP8T4DQbqnRuHQtu0r80YwGnAkIfFrZjPCI24jT9yUSnm8j4nb0BiQ1/VVSgfl0N7WVF+rmfblxpI2eyM4Lse1jo6tM7JrcpNDRiV1+0IzYDt/TMYKBhpqzQ2XonGFkD1vF9AAWuFK2066HqQ93ELD4B15aMy9tGfaWkZQTBzuM9PROPqCsHcR337lmHl78F4WPIgQKBgQDWlbYBoztHngCQ9vA8/QfGZlJryGVEVQsyLbikuF9lSJnGD5l6UBGPabnlSxw3rEdAVybfw0ZLP33nyShPWgaSeW2NrCJ+Gc+jvD8GHDezol/jkuaBJ9jf9Q4r30OgSBYSaMK635fpu9psF7YSjQ0aNuoypluzEt7C6rPB36ejHwKBgQDTVXomxgyT8ihoC8J6Nv7rMaDk4xvy3Zcf/3gc+CIYuhf76rlZPOGzAmybJYBe9twNkkpIxJc7rg2zHLqVM+LfaEPMov1sJrLasshLvuQVgvQHAlIweDwOtSiRpmZbvE67pzd3gEfWvfgKs+6P4OSNJwDW+4ZMdT/xLMNhHV1j7QKBgGda6LVVN+JA2ij4p7HYdfw7oItFlHEbPS9IEl1UaK5SD670KIpfMnYPCHjGeqreEduNnq28Uok/5ZbUrtO5mtzGG9xXAq4WJIrKythYkwO0u9bTFK800CLe15qOCPaUgf0P9Gsp8vOjhYr2yL2arqrntFn9AsH33s+nWDmTTh0lAoGAVHNK7eWkrxZM2U8htw71DW12myC6UXIFay7+g60QiwsKfIvO538xvgQQ/GqfAtPpGa9E6hFNUfb62IF5ehgS6C3VMhhL5wUL4eMhsUsmAAall4tw5peVgFcaUCHLs4rrd4eZ3bIwgvrE/RnsEijPjCxy5HX8s98C31CA/vTqFf0CgYAYKwwVBwPqui+vYvNtYvjI5wFspJyB9bxh8CckIHfDVL/7Xl9oM9ex1vlKcaL/zCLlUqsX64EM4G6o61+3d2Zvb4yEZjHvfUokhBBXFp6ceezoUFfpJ0dhu4TLBZkhr7JKkF8whP5M+LY4gVyapXRHKtjsRIcdwCuDJjwVMGeImQ==-----ENDPRIVATEKEY-----'
    // console.log(WX_RAS.jiami("中文，ABC,123",pub_key))
    // console.log(WX_RAS.jiemi("F+7U4Xh6M294OA0wfxgveCVhwoKQmSDU89SXCfCrtF9mq87wogACGG2TKUjoxIpULAy2u4xUjKD6wlYPgS2zMK+nkB5pMp/x4ISAhlGnupxWXs7Mx6vrsyCWywfy4qjXEYpsmQQPkme7S7vgH6TUcliKBx6ZQsXWVn9tOQTixP+6xU/11MeNAOhKGvMhYzWbM8RdobTzkcHvi24hqVmrHv3BMrxy/mArtVCOXumL8CrfmDSefDxmTKT2eSi3DR9XhHaDmo+JT54x/lnkzgJgnEzdpjTqKHgCaTAaX373ai6q5+o4JgsJeK8yqVYMtTHvTrjI8UBn1z6KSL8zPuUTXQ==", qwer))

    console.log(this.data.rsa_pub)
    console.log(this.data.aes_key)
    // console.log(WX_RAS.jiemi(this.data.aes_key, this.data.rsa_pub))
    console.log(WX_RAS.getDetryptPwd(this.data.aes_key, this.data.rsa_pub))

  },
  // RvltOtv0eMwwO8risWSNKgVWKc/E7evEMCF/WzQ3OHL+fsRp4EhpSf2yuaFLBAu6jueChP/JGV2kuBNd+UEz9M6eAnzzDWim5bTQ6gpP5Stt8R9w+/UPgChTil1E8xQHc3pYkbuVmNdKhKYb033Esi5cj9KfYy4pI6wPf6ooxV8=
  /**
   * 获取相应街道下的接种点列表
   */
  geteInjectpositionList: function () {
    let _this = this
    App._post_form("user/getUserInfo", {}, result => {
      console.log(result)
      App._post_form_ice("injectposition/positionList", {
        town: result.data.us_zhen
      }, res => {
        console.log(res)
        _this.setData({
          list: res.data
        })
      })
    })
  },

  getEncryptKey: function () {
    let _this = this
    App._post_form("common/encryptKey", {}, res => {
      console.log(res)
      _this.setData({
        rsa_pub: res.data.rsa_pub,
        aes_key: res.data.aes_key
      })
    })
  },

})