// logs.ts
// const util = require('../../utils/util.js')
Page({
  data: {
    logs: [],
    activeIndex:0,
    dayList:[],
    List:[],
    sum:[
      {
        title:'今日番茄次数',
        val:'0'
      },
      {
        title:'累计番茄次数',
        val:'0'
      },
      {
        title:'今日专注时长',
        val:'0分钟'
      },
      {
        title:'累计专注时长',
        val:'0分钟'
      }
    ],
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
    ]
  },
  getNowDate:function(){
    const date = new Date();
    let month: string | number = date.getMonth() + 1;
    let strDate: string | number = date.getDate();
   
    if (month <= 9) {
      month = "0" + month;
    }
   
    if (strDate <= 9) {
      strDate = "0" + strDate;
    }
   
    return date.getFullYear() + "-" + month + "-" + strDate;
  },
  onShow() {
    var logs = wx.getStorageSync('statics')
    var day = 0
    var total = logs.length
    var dayTime = 10
    var totalTime = 0 
    var dayList = wx.getStorageSync('statics')
    var today=this.getNowDate()
    dayList.splice(0)
    for(var i=0;i<logs.length;i++){
        if(1) {
          day = day + 1;
          dayTime = dayTime + logs[i].time;
          dayList.push(logs[i]);
        }
        totalTime = totalTime + logs[i].time;
        this.setData({
          dayList:dayList
        })
    }
    this.setData({
      'sum[0].val':day,
      'sum[1].val':total,
      'sum[2].val':dayTime + '分钟',
      'sum[3].val':totalTime + '分钟'
    })
  },
  changeType: function(e:any){
    var index = e.currentTarget.dataset.index;
    if(index == 0){
      this.setData({
        List:this.data.dayList
      })
    }
    else if(index == 1){
      var logs = wx.getStorageSync('statics')
      this.setData({
        List:logs
      })
    }
    this.setData({
      activeIndex: index
    })
  }
})
