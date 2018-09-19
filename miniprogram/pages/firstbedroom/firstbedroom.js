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
  onLoad: function () {
  
  }
})
