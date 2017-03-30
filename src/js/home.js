'use strict';

const home = {
  jEchart: function(){
    var chart = echarts.init($('#J_echarts-line').get(0), 'macarons')
    const option = {
      title: {
        text: '测试echarts'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data:['邮件营销','联盟广告'],
        bottom: 0
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
        type: 'value'
      },
      series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          }
      ]
    }
    chart.setOption(option)
  },
  init: function(opt){
    var me = this
    me.jEchart()
    if ( !!me._init ) {
      return me
    }
    me._init = true
    return me
  }
}

exports = module.exports = home
