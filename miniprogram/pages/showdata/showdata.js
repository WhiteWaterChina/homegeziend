// pages/showdata/showdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //刷新页面
  refreshPage: function () {
    var that = this
    that.onShow()
  },
  //增加条目
  additem: function (event) {
    var that = this
    var positionMax = that.data.positionMax
    var positionMin = that.data.positionMin
    var idInfo = that.data.idInfo
    wx.navigateTo({
      url: '../adddata/adddata?positionMax='+positionMax+'&positionMin='+positionMin+'&id='+idInfo,
    })
  },
  //删除条目
  reduceItem: function (event) {
    var that = this
    var idInfo = event.target.dataset.id
    var positionMax = that.data.positionMax
    var positionMin = that.data.positionMin
    var delItemId = that.data.dataDetail[parseInt(idInfo)]["_id"]
    console.log(delItemId)
    const db = wx.cloud.database('homespace')
    db.collection('homegezi').doc(delItemId).remove({
      success: console.log,
      fail: console.error
    })
  },
  // 点击名称显示此条目的详细信息
  showdetail: function (event) {
    var that = this
    var idInfo = event.target.dataset.id
    var name = that.data.dataDetail[parseInt(idInfo)]["name"]
    var num = that.data.dataDetail[parseInt(idInfo)]["num"]
    var positionMax = that.data.dataDetail[parseInt(idInfo)]["positionMax"]
    var positionMin = that.data.dataDetail[parseInt(idInfo)]["positionMin"]
    var geziId = that.data.dataDetail[parseInt(idInfo)]["id"]

    wx.navigateTo({
      url: '../showdetail/showdetail?name='+name+'&num='+num+'&positionMax='positionMax+'&positionMin='positionMin+'&geziID='+geziId,
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var positionMax = options.positionMax
    var positionMin = options.positionMin
    var idInfo = options.id
    var that = this
    this.setData({
      'positionMax': positionMax,
      'positionMin': positionMin,
      'idInfo': idInfo
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
    var that = this
    var positionMax = that.data.positionMax
    var positionMin = that.data.positionMin
    var idInfo = that.data.idInfo
    const db = wx.cloud.database('homespace')
    db.collection('homegezi').where({
      positionMax: positionMax,
      positionMin: positionMin,
      id: parseInt(idInfo)
    }).get({
      success: function (res) {
        console.log(res)
        // res.data 是包含以上定义的两条记录的数组
        that.setData({
          'dataDetail': res.data
        })
      }
    })
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
    var that = this
    var positionMax = that.data.positionMax
    var positionMin = that.data.positionMin
    var idInfo = that.data.idInfo
    const db = wx.cloud.database('homespace')
    db.collection('homegezi').where({
      positionMax: positionMax,
      positionMin: positionMin,
      id: parseInt(idInfo)
    }).get({
      success: function (res) {
        that.setData({
          'dataDetail': res.data
        })
      }
    })
    this.setData({
      'positionMax': positionMax,
      'positionMin': positionMin,
      'idInfo': idInfo
    })
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