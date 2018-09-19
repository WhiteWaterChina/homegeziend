// pages/livingroom/livingroom.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hiddenstateyangtai: true,
    hiddenstatedianshigui:true,
    hiddenstatetatami:true
  },
/*单击改变阳台的格子的显示和隐藏 */
  changeshowstateyangtai: function(event) {
    var that = this
    that.setData({
      hiddenstateyangtai: (!that.data.hiddenstateyangtai)
    })
  },
  /*单击改变阳台榻榻米的格子的显示和隐藏 */
  changeshowstatetatami: function (event) {
    var that = this
    that.setData({
      hiddenstatetatami: (!that.data.hiddenstatetatami)
    })
  },
  /*单击改变电视柜的格子的显示和隐藏 */
  changeshowstatedianshigui: function (event) {
    var that = this
    that.setData({
      hiddenstatedianshigui: (!that.data.hiddenstatedianshigui)
    })
  },
  /*提交阳台的位置数据给showdata来获取信息 */
  showdatayangtai: function (event) {
    var idInfo = event.target.dataset.id
    var positionMax = "客厅"
    var positionMin = "阳台竖柜"
    wx.navigateTo({
      url: '../showdata/showdata?id=' + idInfo + '&positionMin=' + positionMin + '&positionMax=' + positionMax,
    })
  },
  /*提交阳台的位置数据给showdata来获取信息 */
  showdatatatami: function (event) {
    var idInfo = event.target.dataset.id
    var positionMax = "客厅"
    var positionMin = "榻榻米"
    wx.navigateTo({
      url: '../showdata/showdata?id=' + idInfo + '&positionMin=' + positionMin + '&positionMax=' + positionMax,
    })
  },
  /*提交电视柜的位置信息给showdata来获取信息 */
  showdatadianshigui: function (event) {
    var idInfo = event.target.dataset.id
    var postionMax = "客厅"
    var positionMin = "电视柜" 
    wx.navigateTo({
      url: '../showdata/showdata?id=' + idInfo + '&positionMin=' + positionMin + '&positionMax=' + postionMax,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  }

})