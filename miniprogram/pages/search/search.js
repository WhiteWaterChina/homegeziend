// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //图片缩略图到原图显示
  previewImage: function (event) {
    var that = this
    var current = event.target.dataset.src
    var id = event.target.dataset.id
    var fileLocalPathList = [that.data.dataDetail[id]['imageId']]
    wx.previewImage({
      current: current,
      urls: fileLocalPathList
    })
  },
  // 点击名称显示此条目的详细信息
  showdetail: function (event) {
    var that = this
    var idInfo = event.target.dataset.id
    var itemId = that.data.dataDetail[parseInt(idInfo)]["_id"]
    var name = that.data.dataDetail[parseInt(idInfo)]["name"]
    var num = that.data.dataDetail[parseInt(idInfo)]["num"]
    var imageId = that.data.dataDetail[parseInt(idInfo)]["imageId"]
    var positionMax = that.data.dataDetail[parseInt(idInfo)]["positionMax"]
    var positionMin = that.data.dataDetail[parseInt(idInfo)]["positionMin"]
    var geziId = that.data.dataDetail[parseInt(idInfo)]["id"]
    wx.navigateTo({
      url: '../showdetailsearch/showdetailsearch?name=' + name + '&num=' + num + '&positionMax=' + positionMax + '&positionMin=' + positionMin + '&geziId=' + geziId + '&imageId=' + imageId + '&itemId=' + itemId,
    })
  },
  //刷新数据
  reFresh: function (event) {
    var that = this
    var keyName = that.data.searchKey
    const db = wx.cloud.database('homespace')
    if (typeof (keyName) != 'undefined') {
      db.collection('homegezi').get({
        success: function (res) {
          var totalDataList = res.data
          var dataDetailList = []
          //筛选带关键字的物品名称
          for (var i = 0; i < totalDataList.length; i++) {
            if (totalDataList[i]['name'].search(keyName) != -1) {
              dataDetailList.push(totalDataList[i])
            }
          }
          if (dataDetailList.length == 0) {
            that.setData({
              'dataDetail': []
            })
            wx.showToast({
              title: '无此名称物品！',
              icon: "none",
              mask: true
            })
          }
          else {
            that.setData({
              'dataDetail': dataDetailList
            })
          }
        },
        fail: function (event) {
          console.log(event.errMsg)
        },
      })
    }
  },
  //本页面搜索
  search: function (event) {
    this.reFresh()
  },
  inputkey: function(event) {
    var that = this
    that.setData({
      searchKey: event.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var searchkey = options.searchkey
    if (searchkey != 'undefined') {
      if (searchkey.length != 0) {
        that.setData({
          searchKey: searchkey
        })
      }
    }
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
    this.reFresh()
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
    this.reFresh()
    wx.stopPullDownRefresh()
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