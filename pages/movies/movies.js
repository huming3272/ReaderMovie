// pages/posts/movies/movies.js
const untils = require('../../untils/untils.js')
var app = getApp()
Page({


  /**
   * 页面的初始数据
   */
  data: {
    xHide: false,
    searchShow: false,
    inputValue: "",
    notFound:false,
  },
  // 图片出错时调用的函数
  // errorImg(event) {
  //   // console.log(event)
  //   var currentImg = event.currentTarget.dataset.currentImg
  //   // 用写在写在标签上的层级对数组中出错图片的路径修改为默认
  //   var name = currentImg[0]
  //   // currentImg[0]的位置是key所在的，[1]存的是key下数组的索引
  //   var readyData = this.data[name]
  //   // console.log(readyData)
  //   readyData.movies[currentImg[1]].image = app.globalData.defaultImg
  //   // name.movies[currentImg[1]].images.large = app.globalData.defaultImg
  //   this.setData({
  //     [name]: readyData
  //   })
  // },
  errorImg(event){
    untils.errorImg(event,this)
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
        // 判断有无数据
        var readyData = {}
        readyData[name]={
          'type':type,
          'name':String(name),
          'movies':movies,
        }
        // 得到数据对数据修改 

        this.setData(readyData)
        if(name === 'searchData'){
          if(this.data.searchData.movies.length === 0){
            this.setData({
              notFound: true
            })
            console.log(this.data.searchData)
          }
        }
        // console.log(this.data, "__movies")
  },
  onMoreTap(option){
    var type = option.currentTarget.dataset.type
    var name = option.currentTarget.dataset.name
    wx.navigateTo({
      url: '/pages/movies/more-movie/more-movie?type='+ type + '&name='+name,
    })
    // console.log(option.currentTarget.dataset,'页面movie')
  },
  getMovieListData(url, name, type) {
    wx.request({
      url: url,
      method: "GET",
      header: {
        "Content-Type": ""
      },
      success: (result) => {
        this.formData(result,name,type)
      },
      fail: (res) => {},
    })
  },
  onBindinput(event){
    this.setData({
      inputValue: event.detail.value
    })
  },
  onBindFocus(){
    console.log('聚焦了')
    this.setData({
      xHide:true,
      searchShow: true,
    })
  },
  onBindBlur(){
    console.log('失焦了')
    this.setData({
      xHide:false,
      searchShow: false,
      inputValue: "",
      searchData:{},
      notFound: false
    })
  },
  searchMovies(event){
    var url = app.globalData.yushuBase + "search?q=" + this.data.inputValue
    untils.http(url,this.formData,'searchData','电影搜索')
    
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
    var in_theaters = app.globalData.yushuBase + 'in_theaters' + "?start=0&count=3"
    var coming_soon = app.globalData.yushuBase + 'coming_soon' + "?start=0&count=3"
    var top250 = app.globalData.yushuBase + 'top250' + "?start=0&count=3"
    this.getMovieListData(in_theaters, 'in_theaters', '正在热映')
    this.getMovieListData(coming_soon, 'coming_soon', '即将到来')
    this.getMovieListData(top250, 'top250', '热门电影')
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