
Page({
  navigateTo(){
    // wx.showModal({
    //   title: '这是一个模态窗口',
    //   content:"欢迎来到微信小程序，是否进入文章",
    //   cancelColor: 'cancelColor',
    //   success:function(res){
    //     if(res.confirm){
    //       wx.switchTab({
    //         url: '../posts/posts',
    //       // 这个是跳转过去留下记录，所以可以返回
    //       })
    //       console.log('进入下一页')
    //     }else if(res.cancel){
    //       console.log('取消')
    //     }
    //   }
    // })
  },
  getUserInfo(){
    var that = this
    wx.login({
      success:function(res){
          //用户拒绝授权时短时间无法重新授权，开发工具可以用清除缓存数据的方法清理
        wx.getUserInfo({
          //默认为true
          withCredentials:true,
          //要求登录态尚未过期
          success:function(res){
              //成功时用这个
            console.log(res,'---success')
            that.setData({
              userInfo: res.userInfo
            })
          },
          complete:function(res){
              //失败时或结束就用这个
            // console.log(res,'---complete')
          }
        })
      }
    })
  },
  onLoad:function(){
    this.getUserInfo()
    
  },
  onTap:function(){
    wx.switchTab({
      url: '../posts/posts',
    // 这个是跳转过去留下记录，所以可以返回
    })
    // wx.redirectTo({
    //   url:'../posts/posts',
    // }
    // // 这个是清理了现在页面，然后跳转过去，所以无法返回
    // )
    // console.log('跳转过去')
  },
  onHide(){
    // console.log('隐藏了')
  },
  onUnload(){
    // console.log('卸载了')
  }
})