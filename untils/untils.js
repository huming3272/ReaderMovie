function convertStarsToArray(average) {
  if (average > 10 || average < 0) {
    return '数据不符合'
  }
  var starArray = [0, 0, 0, 0, 0];
  var formStar = Math.floor(average)
  if (formStar >= 1 && formStar % 2 === 1) {
    formStar = formStar - 1
  }
  formStar = formStar / 2
  for (let i = 0; i < formStar; i++) {
    starArray[i] = 1
  }
  return starArray
}

function http(url, callback, name, type) {
  wx.request({
    url: url,
    method: "GET",
    header: {
      "Content-Type": ""
    },
    success: (result) => {
      callback(result, name, type)
    },
    fail: (res) => {
      
    },
  })
}

function errorImg(event, that) {
  // console.log(event)
  var app = getApp()
  var currentImg = event.currentTarget.dataset.currentImg
  // 用写在写在标签上的层级对数组中出错图片的路径修改为默认
  var name = currentImg[0]
  var readyData
  // var readyData = that.data[name]||that.data.movies
  if (currentImg[0]!=undefined && currentImg[1]!=undefined) {
    console.log('if--',name)
    // currentImg[0]的位置是key所在的，[1]存的是key下数组的索引
    // console.log(readyData)
    readyData = that.data[name]
    readyData.movies[currentImg[1]].image = app.globalData.defaultImg
    // name.movies[currentImg[1]].images.large = app.globalData.defaultImg
    that.setData({
      [name]: readyData
    })
    
  }else if(currentImg[0]===undefined){
    console.log('else--',that.data.movies)
    readyData = that.data.movies
    // console.log(currentImg)
    readyData[currentImg[1]].image = app.globalData.defaultImg
    // name.movies[currentImg[1]].images.large = app.globalData.defaultImg
    that.setData({
      'movies': readyData
    })
  }else if(currentImg[0]===undefined && currentImg[1]===undefined){
    console.log('movie Detail')
  }


  
}
function dataToString(data,type){
  var dataString = ""
  var sign
  if(type === 'countries'){
    sign = '   '
  }else if(type === 'directors'){
    sign = ' , '
  }else if (type === 'genres'){
    sign = ' 、 '
  }else if (type === 'casts'){
    sign = ' / '
  }
  for(let i in data){
    // 判断数组下一级类型是否为对象
    if(Object.prototype.toString.call(data[0]) === "[object Object]"){
      dataString = dataString + data[i].name + sign
    }else{
      dataString = dataString + data[i] + sign
      // console.log('对象')
    }
  }
  return dataString.substring(0,dataString.length-3)
}

function dataInfo(data){ 
  let dataInfo = []
  for(let i in data){
    var untilData = {}
    if(data[i].avatars.large === 'null'){
      untilData.avatars = null
    }else{
      untilData.avatars = data[i].avatars.large
    }
    untilData.name = data[i].name
    dataInfo.push(untilData)
  }
  return dataInfo
}


module.exports = {
  convertStarsToArray: convertStarsToArray,
  http: http,
  errorImg: errorImg,
  dataToString:dataToString,
  dataInfo:dataInfo
}