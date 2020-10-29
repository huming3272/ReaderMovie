// pages/posts/post-detail/post-detail.js
const postData = require('../../../data/post-data')

var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isPlayingMusic: false,
    // collected: false,
  },
  onColletionTap(option) {
    var postId = this.data.postId
    // var collected = {}
    var that = this
    var sCollected = wx.getStorageSync('collected') || {}
    this.showModal(sCollected, that)
    // console.log('1----',postId)
  },
  showModal(sCollected, that) {
    var postId = that.data.postId
    wx.showModal({
      title: sCollected[postId] ? "取消收藏" : "加入收藏",
      content: "确定就继续，取消则放弃",
      confirmText: sCollected[postId] ? "放弃收藏" : "确认收藏",
      cancelText: "退出窗口",
      cancelColor: 'cancelColor',
      success: function (res) {
        if (res.confirm) {
          if (sCollected) {
            sCollected[postId] = !sCollected[postId]
            // postCollect = sCollected[postId]
            that.setData({
              collected: sCollected[postId]
            })
            console.log('确定')
          } else {
            sCollected[postId] = true
          }
          // console.log(sCollected)
          wx.setStorageSync('collected', sCollected)
          // 设置缓存
          // console.log(this.data)
          // 弹出一个提示收藏
          that.showToast(sCollected, postId)
          // 弹个窗提示一下
        } else if (res.cancel) {
          // console.log('取消')
        }
      }
    })
  },
  showToast(sCollected, postId) {
    setTimeout(() => {
      wx.showToast({
        title: sCollected[postId] ? "收藏成功" : "取消收藏",
        icon: "none",
        duration: 2000
      })
    }, 500);
  },
  showActionSheet() {
    // 展示动作列表
    wx.showActionSheet({
      itemList: ['分享给好友', '分享到朋友圈', '分享到微博'],
      complete: function (res) {
        wx.showModal({
          title: "你点了" ,
          content: "你是否取消" ,
        })
        console.log(res)
      }
    })
  },
  onMusicTap() {
    // wx.playBackgroundAudio({
    //   dataUrl: 'http://114.80.28.16/amobile.music.tc.qq.com/C400002wsODf1Dthgk.m4a?guid=7732622240&vkey=1FFB91646B562897F41486E276050141598DBC04722A6125304ADC6DC8CDE7276A9D546D39F8ECDCE9AD26AF68EF529B0F8F0883EA48773A&uin=98&fromtag=66',
    //   titel:'起风了',
    //   coverImgUrl:'https://y.gtimg.cn/music/photo_new/T002R300x300M000000CVCqK4aEW0M.jpg?max_age=2592000'
    // })
    const getBackgroundAudioManager = wx.getBackgroundAudioManager()
    
    if (this.data.isPlayingMusic) {
      getBackgroundAudioManager.pause()
      // 暂停音乐
      this.setData({
        isPlayingMusic: false
      })
    } else {
      this.playMusic()
      // 配置音乐链接后就会播放
      this.setData({
        isPlayingMusic: true
      })
      console.log('播放了')
    }
  },
  playMusic(){
    var music = this.data.postData.music
    const getBackgroundAudioManager = wx.getBackgroundAudioManager()
    getBackgroundAudioManager.title = music.title
    getBackgroundAudioManager.singer = music.singer
    getBackgroundAudioManager.coverImgUrl = music.coverImgUrl
    getBackgroundAudioManager.src = music.src
    // 配置音乐链接后就会播放
    this.setData({
      isPlayingMusic: true
    })
    console.log('播放了')
  },
  musicMonitor(){
    const that = this
    let getBackgroundAudioManager = wx.getBackgroundAudioManager()
    getBackgroundAudioManager.onPlay(
      function(){
        that.setData({
          isPlayingMusic : true
        })
      }
    )
    getBackgroundAudioManager.onPause(
      function(){
        that.setData({
          isPlayingMusic : false
        })
      }
    )
    getBackgroundAudioManager.onStop(
      function(){
        that.setData({
          isPlayingMusic : false
        })
      }
    )
    getBackgroundAudioManager.onEnded(
      function(){
        that.setData({
          isPlayingMusic : false
        })
        console.log('音乐播完咯')
      }
    )
    // 自然播放停止的事件
  },
    addReading(){
      let sto_reading = wx.getStorageSync('reading')||[]
      if(sto_reading[this.data.postId]){
        sto_reading[this.data.postId]++
      }else{
        sto_reading[this.data.postId]=1
      }
      wx.setStorageSync('reading', sto_reading)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (event) {
    // console.log(event)
    var id = event.id
    var globalData = app.globalData.g_isPlayingMusic
    // 然后得到posts页面中传递的参数postId,在event中
    var collected = wx.getStorageSync('collected')
    this.setData({
      postData: postData[id],
      postId: id
      // 把上一个页面传递过来的id给data对象
    })
    if (collected) {
      this.setData({
        'collected': collected[id]
      })
    }
    this.playMusic()
    this.musicMonitor()
    this.addReading()
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