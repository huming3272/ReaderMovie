
Page({
  onLoad:function(){
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