// pages/showdata/showdata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataDetail:[
      {name:'指甲刀', number:"1"},
      {name:'绳子', number:"2"},
      {name:'扑克', number:"10"}
    ]
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var positionMax = options.positionMax
    var positionMin = options.positionMin
    var idInfo = options.id
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