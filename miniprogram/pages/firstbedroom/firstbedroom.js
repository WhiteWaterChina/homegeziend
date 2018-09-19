//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hiddenstatemenkougui:true,
    hiddenstatezhugui:true
  },
  /*单击改变主卧的主柜的显示和隐藏 */
  changeshowstatezhugui: function (event) {
    var that = this
    that.setData({
      hiddenstatezhugui: (!that.data.hiddenstatezhugui)
    })
  },
  /*单击改变主卧的门口柜子的显示和隐藏 */
  changeshowstatemenkougui: function (event) {
    var that = this
    that.setData({
      hiddenstatemenkougui: (!that.data.hiddenstatemenkougui)
    })
  },
  /*提交门口柜的位置数据给showdata来获取信息 */
  showdatamenkougui: function (event) {
    var idInfo = event.target.dataset.id
    var positionMax = "主卧"
    var positionMin = "门口柜"
    wx.navigateTo({
      url: '../showdata/showdata?id=' + idInfo + '&positionMin=' + positionMin + '&positionMax=' + positionMax,
    })
  },
  /*提交主柜的位置信息给showdata来获取信息 */
  showdatazhugui: function (event) {
    var idInfo = event.target.dataset.id
    var postionMax = "主卧"
    var positionMin = "主柜"
    wx.navigateTo({
      url: '../showdata/showdata?id=' + idInfo + '&positionMin=' + positionMin + '&positionMax=' + postionMax,
    })
  },
  onLoad: function () {
  
  },

})
