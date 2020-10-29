// pages/movies/movies/more-movie/more-movie.js
const untils = require('../../../untils/untils.js') 
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies:[],
    totalCount: 0,
    isLoaded: false,
  },
  // 图片出错时调用的函数
  errorImg(event) {
    // console.log(event)
    var currentImg = event.currentTarget.dataset.currentImg
    // 用写在写在标签上的层级对数组中出错图片的路径修改为默认
    // var name = currentImg[0]
    // currentImg[0]的位置是key所在的，[1]存的是key下数组的索引
    var readyData = this.data.movies
    // console.log(currentImg)
    readyData[currentImg[1]].image = app.globalData.defaultImg
    // name.movies[currentImg[1]].images.large = app.globalData.defaultImg
    this.setData({
      movies: readyData
    })
  },
  formData(result,name,type){
    var movies = []
        // console.log(result)
        for (let i = 0; i <= result.data.subjects.length - 1; i++) {
          if (result.data.subjects[i].title.length > 6) {
            result.data.subjects[i].title = result.data.subjects[i].title.substring(0, 6) + "..."
          }
          var temp = {
            movieId : result.data.subjects[i].id,
            image :  result.data.subjects[i].images.large,
            title : result.data.subjects[i].title,
            stars : untils.convertStarsToArray(result.data.subjects[i].rating.average) ,
            average :  result.data.subjects[i].rating.average
          }
          movies.push(temp)
          // console.log('movies',movies)
          // 得到数据中的电影名称截取前6位加上省略号
          // console.log(collect.subjects[i].title)
        }
        var totalMovies
        if(this.data.isLoaded){
          totalMovies = this.data.movies.concat(movies)
        }else{
          totalMovies = movies
        }
        var readyData  = {
          // 'type':type,
          // 'name':String(name),
          'movies':totalMovies,
        }
        // 得到数据对数据修改 

        this.setData(readyData)
        this.data.totalCount += 20
        this.data.isLoaded = false
        // 提交请求的时候进行自增20的操作
        wx.hideNavigationBarLoading()
        

        // console.log(this.data, "__movies")
  },
  onMoviesTap(event){
    var id = event.currentTarget.dataset.movieId
    wx.navigateTo({
      url: '/pages/movies/movies-detail/movies-detail?id='+id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.setData(options)
    wx.setNavigationBarTitle({
      title: options.type,
    })
    var url = app.globalData.yushuBase + this.data.name
    untils.http(url,this.formData,this.data.name,this.data.type)
    console.log(this.data)
    
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
    var url = app.globalData.yushuBase + this.data.name + '?start=0&count=20'
    this.setData({
      'movies':[],
      'totalCount': 0,
    })

    untils.http(url,this.formData)
    console.log(url)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var url = app.globalData.yushuBase + this.data.name
    this.data.isLoaded = true
    var nextUrl = url + '?start=' +this.data.totalCount + '&count=20'
    wx.showNavigationBarLoading()
    untils.http(nextUrl,this.formData)

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})