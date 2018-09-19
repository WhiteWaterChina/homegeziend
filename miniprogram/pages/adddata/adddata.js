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
  //上传物品的图片
  uploadimage: function (event) {
    var that = this
    var positionMax = that.data.positionMax
    var positionMin = that.data.positionMin
    var idInfo = that.data.idInfo
    if (typeof (that.data.nameInputValue) == 'undefined' || typeof (that.data.numInputValue) == 'undefined' ) {
      wx.showToast({
      icon: 'none',
      title: '请先输入物品名称和数量！',
      })
    }
    else if (that.data.nameInputValue.length == 0 || that.data.numInputValue.length == 0) {
      wx.showToast({
        icon: 'none',
        title: '请先输入物品名称和数量！',
      })
    }
    else {
      //选择图片
      wx.chooseImage({
        count: 1,
        sizeType: ['original','compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          const filePath = res.tempFilePaths[0]
          console.log(filePath)
          that.setData({
            imagePathLocal: filePath
          })
        },
        fail: e => {
          console.error(e)
        }
      })
    }
  },
  //图片缩略图到原图显示
  previewImage: function (event) {
    var that = this
    var fileLocalPathList = [that.data.imagePathLocal]
    var current = event.target.dataset.src;
    wx.previewImage({
      current: current, 
      urls: fileLocalPathList 
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
      if (typeof (that.data.imagePathLocal) == "undefined") {
        wx.showToast({
          title: '图片未选择！',
          icon: "none",
          mask: true
        })
      }
      else {
        if (that.data.imagePathLocal.length == 0) {
          wx.showToast({
            title: '图片未选择！',
            icon: "none",
            mask: true
          })
        }
        // 上传图片
        var name = that.data.nameInputValue
        var num = that.data.numInputValue
        var filePath = that.data.imagePathLocal
        const cloudPath = 'images/images' + positionMax + '-' + positionMin + '-' + idInfo + '-' + name + '-' + num + filePath.match(/\.[^.]+?$/)[0]
        //弹窗提示上传中
        wx.showLoading({
          title: '上传中',
        })
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log('[上传文件] 成功：', res)
            var imageId = res.fileID
            //将数据上传至atabase
            const db = wx.cloud.database('homespace')
            //判断输入的物品名称是否已经存在
            var testtemp = db.collection('homegezi').where({
              positionMax: positionMax,
              positionMin: positionMin,
              id: parseInt(idInfo)
            }).get({
              success: function (res) {
                var dataListTemp = res.data
                var dataList = []
                for (var i = 0; i < dataListTemp.length; i++) {
                  dataList.push(dataListTemp[i].name)
                }
                //重复了的弹出提示
                // var ttt = dataList.indexOf(that.data.nameInputValue)
                if (dataList.indexOf(that.data.nameInputValue) != -1) {
                  wx.hideLoading()
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
                      positionMin: positionMin,
                      imageId: imageId
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
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            wx.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            wx.hideLoading()
          }
        })
      } 
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