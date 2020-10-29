// pages/posts/posts.js
let postData = require('../../data/post-data')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onshow: false
  },
  onPostTap: function (event) {
    var postId = event.currentTarget.dataset.postId
    // console.log(postId)
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
      // 类似web端的链接传参
    })
  },
  onSwiperTap: function (event) {
    var postId = event.target.dataset.postId
    // navigateTo
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId,
    })
    // console.log(postId)
  },
  computeReading() {
    // 实现静态的阅读量通过和缓存的阅读量增加
    
    var sto_reading = wx.getStorageSync('reading')
    if (sto_reading) {
      for (let i = 0; i <= postData.length - 1; i++) {
        postData[i].reading = Number(this.data.readingCount[i]) + (sto_reading[i] || 0)
      }
    }
    this.setData({
      postData: postData,
    })
    // console.log('sto_reading---', this.data.readingCount)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let readingCount = []
      for (let i = 0; i <= postData.length - 1; i++) {
        readingCount.push(postData[i].reading)
    }
    this.setData({
      readingCount: readingCount,
    })
    this.computeReading()
    
    
    // console.log('firstReading__',this.data.postData[0].reading)

    // 为了方便使用，用setData时传对象进去
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
    this.computeReading()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

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