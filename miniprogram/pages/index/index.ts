// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const util = require('../../utils/util.js')

Page({
  data: {
    clockShow:false,
    rate:0,
    clockHeight:0,
    time: 5,
    timer:0,
    mTime:300000,
    timeStr:"05:00",
    cateArr:[
      {
        icon:"work",
        text:"工作"
      },
      {
        icon:"study",
        text:"学习"
      },
      {
        icon:"think",
        text:"思考"
      },
      {
        icon:"write",
        text:"写作"
      },
      {
        icon:"sport",
        text:"运动"
      },
      {
        icon:"read",
        text:"阅读"
      }
    ],
    cateActive:'0',
    okShow:false,
    pauseShow:true,
    continueCancleShow:false
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs',
    })
  },
  onLoad() {
    var res = wx.getSystemInfoSync()
    var rate = 750 / res.windowWidth
    this.setData({
      rate: rate,
      clockHeight:rate*res.windowHeight
    })
  },
  slideChange: function (e:any) {
    this.setData({
      time:e.detail.value
    })
  },
  clickCate: function (e:any) {
    this.setData({
      cateActive:e.currentTarget.dataset.index
    })
  },
  start: function(){
    this.setData({
      clockShow:true,
      mTime:this.data.time*60*1000,
      timeStr:this.data.time >= 10 ?this.data.time + ':00' : '0'+this.data.time + ":00"
    })
    this.drawBg();
    this.drawActive();
},
  drawBg:function () {
    var _this = this;
    var lineWidth = 6 / _this.data.rate; // px
    var ctx =wx.createCanvasContext('progress_bg');
    ctx.setLineWidth(lineWidth);
    ctx.setStrokeStyle('#000000');
    ctx.setLineCap('round');
    ctx.beginPath();
    var res = wx.getSystemInfoSync()
    var rate = 750 / res.windowWidth
    ctx.arc(400/rate/2,400/rate/2,400/rate/2- 2* lineWidth,0,2*Math.PI,false);
    ctx.stroke();
    ctx.draw();
  },
  drawActive: function () {
    var _this = this;
    var timer = setInterval(function (){
      var angle = 1.5 + 2*((_this.data.time*60*1000) - _this.data.mTime)/(_this.data.time*60*1000);
      var currentTime = _this.data.mTime - 100
      _this.setData({
          mTime: currentTime
      });
      if(angle < 3.5) {
        if(currentTime % 1000 == 0) {
          var time1 = currentTime / 1000; // s
          var time2 = parseInt(time1 / 60) ;// m
          var timeStr3 = (time1 - time2 * 60) >= 10 ? (time1 - time2 * 60) : '0' + (time1 - time2 * 60);
          var timeStr = time2 >= 10 ? time2:'0'+time2;
          _this.setData({
            timeStr:timeStr+':'+timeStr3
          })        }
        var lineWidth = 6 / _this.data.rate; // px
        var ctx = wx.createCanvasContext('progress_active');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#ffffff');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
        ctx.stroke();
        ctx.draw();
      } else {
        //记录数据
        var statics = wx.getStorageSync('statics') || [];
        statics.unshift({
          date: util.formatTime(new Date),
          cate:_this.data.cateActive,
          time:_this.data.time
        })
        wx.setStorageSync('statics',statics);
        //初始化
        _this.setData({
          timeStr:'00:00',
          okShow:true,
          pauseShow:false,
          continueCancleShow:false
        })
        clearInterval(timer);
      }
    },100);
    _this.setData({
      timer:timer
    })
  },
  pause : function(){
    clearInterval(this.data.timer);
    this.setData({
      pauseShow:false,
      continueCancleShow:true,
      okShow:false
    })
  },
  continue : function(){
    this.drawActive();
    this.setData({
      pauseShow:true,
      continueCancleShow:false,
      okShow:false
    })
  },
  cancle : function(){
    this.setData({
      pauseShow:true,
      continueCancleShow:false,
      okShow:false,
      clockShow:false
    })
  },
  ok :function(){
    this.setData({
      pauseShow:false,
      continueCancleShow:false,
      okShow:true,
      clockShow:false
    })
  }
})
