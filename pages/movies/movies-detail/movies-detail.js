// pages/movies/movies-detail/movies-detail.js
const untils = require("../../../untils/untils")
import {Movie} from 'class/Movie.js'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movie:{},
    imgBigger: false,
  },
  // getMovieDetail(id) {
  //   let url = app.globalData.yushuBase + "subject/" + id
  //   untils.http(url, this.formData)
  // },
  // formData(source) {
  //   // console.log(result)
  //   var data = source.data
  //     var temp = {
  //       casts: untils.dataToString(data.casts,'casts'),
  //       castsInfo: untils.dataInfo(data.casts),
  //       movieId: data.id,
  //       comments: data.comments_count,
  //       countries: data.countries[0],
  //       directors: untils.dataToString(data.directors,'directors'),
  //       directorsInfo: untils.dataInfo(data.directors),
  //       genres: untils.dataToString(data.genres,'genres'),
  //       image: data.images.large||data.images,
  //       stars: untils.convertStarsToArray(data.rating.average),
  //       average: data.rating.average,
  //       title: data.title,
  //       // reviews: data.reviews_count,
  //       summary: data.summary,
  //       year: data.year,
  //       wish: data.wish_count,
  //       originalTitle:data.originalTitle,
  //     }
  //     // console.log('movies',movies)
  //     // 得到数据中的电影名称截取前6位加上省略号
  //     // console.log(collect.subjects[i].title)

  //   var readyData ={
  //     'movie': temp,
  //   }
  //   // 得到数据对数据修改 
  //   this.setData(readyData)
  // },
  errorLargeImg(){
    var movie = this.data.movie
    var defaultImg = app.globalData.defaultImg
    movie.image = defaultImg
    this.setData({
      movie:movie
    })
  },
  errorAvatarImg(event){
    var currentImg = event.currentTarget.dataset.currentImg
    var movie = this.data.movie
    var defaultImg = app.globalData.defaultImg
    movie.castsInfo[currentImg].avatars = defaultImg
    this.setData({
      movie:movie
    })
    console.log(event)
  },
  viewMoviePostImg(event){
    // var imgBigger = !this.data.imgBigger
    // this.setData({
    //   imgBigger :imgBigger
    // })
    var src = event.currentTarget.dataset.src
    var wrongSrc = src.substring(0,5)
    console.log(src,'---pre')
    if(wrongSrc!=="https"){
      wx.showToast({
        title: '图片不存在',
        icon: 'loading',
        duration: 2000
      })
    }
    wx.previewImage({
      currentImg: src,
      urls: [src],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    let url = app.globalData.yushuBase + "subject/" + id
    var movie = new Movie(url)
    movie.getMovieDetail(
      (temp)=>{
        this.setData({
          movie:temp
          })
      }
    )
    // console.log(options)
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