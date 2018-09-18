// pages/adddata/adddata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //物品名称输入
  nameInput: function (event) {
    this.setData({
      nameInputValue:event.detail.value
    })
  },
  //物品数量输入
  numInput: function (event) {
    this.setData({
      numInputValue: event.detail.value
  })
  },
  //提交信息
  btnConfirm: function (event) {
    var that = this
    var positionMax = that.data.positionMax
    var positionMin = that.data.positionMin
    var idInfo = that.data.idInfo
    if (typeof(that.data.nameInputValue) == "undefined" || typeof(that.data.numInputValue) == "undefined") {
      wx.showToast({
        title: '名字或者数量未填写！',
        icon:"none",
        mask:true
      })
    }
    else {
      const db = wx.cloud.database('homespace')
      var testtemp = db.collection('homegezi').where({
        positionMax: positionMax,
        positionMin: positionMin,
        id: parseInt(idInfo)
      }).get({
        success: function (res) {
          var dataListTemp = res.data
          var dataList = []
          //判断输入的物品名称是否已经存在
          for (var i=0;i<dataListTemp.length;i++)
          {
            dataList.push(dataListTemp[i].name)
          }
          //重复了的弹出提示
          var ttt = dataList.indexOf(that.data.nameInputValue)
          if (dataList.indexOf(that.data.nameInputValue) != -1 ) {
            wx.showToast({
              title: '物品名字重复了！',
              icon: "none",
              mask: true
            })
          }
          else {
          //添加数据到后台
            db.collection('homegezi').add({
              data: {
                name: that.data.nameInputValue,
                num: parseInt(that.data.numInputValue),
                id: parseInt(idInfo),
                positionMax: positionMax,
                positionMin: positionMin
              },
              success: function (res) {
                wx.navigateBack({
                })
              },
              fail: function (res) {
                console.log(res)
              }
            })
          }
        }
      })


    }


  },
  btnCancel: function (event) {
    wx.navigateBack({
      
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var positionMax = options.positionMax;
    var positionMin = options.positionMin;
    var idInfo = options.id;
    this.setData({
      positionMax: positionMax,
      positionMin:positionMin,
      idInfo:idInfo
    })
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

  }
})