// pages/showdetail/showdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  //删除此条目
  delitem: function (event) {
    var that = this
    wx.showModal({
      title: '确认',
      content: '确定删除此条目？',
      success: function (res) {
        if (res.confirm) {
          var itemId = that.data.itemId
          var imageId = that.data.imageId
          //删除数据库的数据
          const db = wx.cloud.database('homespace')
          db.collection('homegezi').doc(itemId).remove({
            success: function (res) {
              //删除对应的图片
              wx.cloud.deleteFile({
                fileList: [imageId],
                success: function (event) {
                  wx.showToast({
                    title: '删除成功！',
                    icon: "success",
                    mask: true
                  })
                  wx.navigateBack({
                    
                  })
                },
                fail: function (event) {
                },
              })
            },
            fail: console.error
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })  
  },
  //物品图片缩略图到原图显示
  previewImage: function (event) {
    var that = this
    var current = event.target.dataset.src
    var fileLocalPathList = [that.data.imageId]
    wx.previewImage({
      current: current,
      urls: fileLocalPathList
    })
  },
  //物品位置图片缩略图到原图显示
  previewImageLocal: function (event) {
    var that = this
    var current = event.target.dataset.src
    var fileLocalPathList = [that.data.imagelocal]
    wx.previewImage({
      current: current,
      urls: fileLocalPathList
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var name = options.name
    var num = options.num
    var imageId = options.imageId
    var positionMax = options.positionMax
    var positionMin = options.positionMin
    var idInfo = options.geziId
    var itemId = options.itemId
    var imagelocal = '/images/' + positionMax + '-' + positionMin + '.png'
    that.setData({
      'nameValue': name,
      'numValue':num,
      'imageId':imageId,
      'positionMax':positionMax,
      'positionMin':positionMin,
      'idInfo':idInfo,
      'itemId': itemId,
      'imagelocal': imagelocal
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