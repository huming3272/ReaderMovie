const untils = require('../../../../untils/untils')
class Movie{
  constructor(url){
    this.url = url
  }
  getMovieDetail(callback) {
    // let url = app.globalData.yushuBase + "subject/" + id
    this.callback = callback
    untils.http(this.url, this.formData.bind(this))
  }
  formData(source) {
    // console.log(result)
    var data = source.data
      var temp = {
        casts: untils.dataToString(data.casts,'casts'),
        castsInfo: untils.dataInfo(data.casts),
        movieId: data.id,
        comments: data.comments_count,
        countries: data.countries[0],
        directors: untils.dataToString(data.directors,'directors'),
        directorsInfo: untils.dataInfo(data.directors),
        genres: untils.dataToString(data.genres,'genres'),
        image: data.images.large||data.images,
        stars: untils.convertStarsToArray(data.rating.average),
        average: data.rating.average,
        title: data.title,
        // reviews: data.reviews_count,
        summary: data.summary,
        year: data.year,
        wish: data.wish_count,
        originalTitle:data.originalTitle,
      }
      // 得到数据对数据修改 
      this.callback(temp)
    }
}
export {Movie}
