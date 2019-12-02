import React from 'react'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import echarts from 'echarts/lib/echarts'
import {todaydata,comparedata} from './data.js'
class index extends React.Component{
   render(){
      return(
         <div>
          <div id="todaychart" style={{ width: 720, height:431,float:'left'  }} />
          <div id="comparechart" style={{ width: 999, height: 431,float:'left'}} />
          </div>
      )
   }
   componentDidMount(){
    this.initTodayChart()
    this.initComparechart()
   }
   initTodayChart=()=>{
    const myChart=echarts.init(document.getElementById('todaychart'))
    //const datas=todaydata;
    //console.log(datas)
    myChart.setOption({
      backgroundColor:'#091a24',
      title:{
        text:'当日状态分布图',
        textStyle:{
          fontFamily: "MicrosoftYaHei",
          fontSize: 15,
          lineHeight: 46,
          color: "#ffffff"
        },
        left:'left',
        top:'top'
        //x:'left',
        //y:'top'
      },
      tooltip: {},
      toolbox: {},
      legend: {
        data:['流量','最大饱和度'],
        x:'right',
        //icon: 'arrow',
        itemWidth:18,
        itemHeight:12,
        textStyle:{
          fontFamily: "MicrosoftYaHei",
          fontSize: 12,
          fontWeight: "bold",
          color: "#dff6ff"
          }
        },

        xAxis: [
          {
              type: 'category',
              data: ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'],
              //data:allhours,
              axisLabel: {
                show: true,
                fontFamily: "MicrosoftYaHei",
                fontSize: 12,
                color: "#dff6ff"
            }
          }
      ],
      yAxis: [
          {
              type: 'value',
              //min: 0,
              //max: 110,
              //interval: 10,
              axisLabel: {
                show: true,
                fontFamily: "MicrosoftYaHei",
                fontSize: 12,
                color: "#dff6ff"
            },
            splitLine: {
              show: true,
              lineStyle:{
                 color: ['#112432'],
                 width: 1,
                 type: 'solid'
            }
      　　}
          }
      ],
      series: [
          {
              name:'流量',
              type:'bar',
              itemStyle:{
                color:'#7db3e1',
                },
              data:todaydata[0].flow
          },
          {
              name:'最大饱和度',
              type:'line',
              itemStyle:{
                color:'#557fad'
                },
              lineStyle:{
                  color:'#557fad'
                },
              areaStyle: {
                normal: {
                  color: '#112738'
                  }
              },
              //symbol: 'none',  //取消折点圆圈
              //smooth: true , //折线平滑
              data:todaydata[0].saturation
          }
      ]
    })
    myChart.resize()
  }

  initComparechart=()=>{
    const myChart=echarts.init(document.getElementById('comparechart'))
    console.log(comparedata[0])
    //console.log(comparedata[0].flow.hole)
    //console.log(comparedata[0].flow.hole.today)
    const flow=comparedata[0].flow
    const load=comparedata[0].load
    myChart.setOption({
      backgroundColor:'#091a24',
      title: {
          text: '流量/负荷对比图',
          textStyle:{
            fontFamily: "MicrosoftYaHei",
            fontSize: 15,
            fontWeight: "bold",
            color: "#ffffff"
          },
          left:'left',
          top:'top'
          },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              animation: false
            }
          },
      legend: {
          data:['全天','早高峰','晚高峰'],
          x: 'right',
          itemWidth:18,
          itemHeight:12,
          textStyle:{
            fontFamily: "MicrosoftYaHei",
            fontSize: 12,
            fontWeight: "bold",
            color: "#dff6ff"
            }
          },

      grid: [
          {right: '55%'},
          {left: '55%'}
          ],
      xAxis : [
          {
              name:'流量',
              nameTextStyle:{
                fontFamily: "MicrosoftYaHei",
                fontSize: 12,
                color: "#dff6ff"
              },
              type: 'value',
              inverse: true, //反向坐标轴
              axisLabel: {
                show: true,
                fontFamily: "MicrosoftYaHei",
                fontSize: 12,
                color: "#dff6ff"
            },
              splitLine: {
                show: true,
                lineStyle:{
                  color: ['#112432'],
                  width: 1,
                  type: 'solid'
              }
        　　}
          },
          {
              name:'负荷',
              nameTextStyle:{
                fontFamily: "MicrosoftYaHei",
                fontSize: 12,
                lineHeight: 25,
                color: "#dff6ff"
              },
              type: 'value',
              gridIndex: 1,//grid 的索引
              axisLabel: {
                show: true,
                fontFamily: "MicrosoftYaHei",
                fontSize: 12,
                color: "#dff6ff"
            },
              splitLine: {
                show: true,
                lineStyle:{
                  color: ['#112432'],
                  width: 1,
                  type: 'solid'
              }
        　　}
          }
        ],
      yAxis : [
          {
              data: ['上月','上周','昨天','今天'],
              position:'right',
              axisLabel:{show:false} //是否显示刻度标签
          },
          {
              data: ['上月','上周','昨天','今天'],
              gridIndex: 1,
              axisLabel:{
                show: true,
                margin:20,
                fontFamily: "MicrosoftYaHei",
                fontSize: 12,
                //lineHeight: 20, //25显示不全
                color: "#dff6ff"
              }
          }
        ],
      series : [
          {
              name: '全天',
              type: 'bar',
              itemStyle:{ color:'#add7ff'},
              //data: [200, 50, 10, 12]
              data:[flow.hole.lastMonth,flow.hole.lastWeek,flow.hole.yesterday,flow.hole.today]
          },
          {
              name: '早高峰',
              type: 'bar',
              itemStyle:{ color:'#6cb8ff'},
              //data: [100, 25, 13, 14]
              data:[flow.morningPeek.lastMonth,flow.morningPeek.lastWeek,flow.morningPeek.yesterday,flow.morningPeek.today]
          },
          {
              name: '晚高峰',
              type: 'bar',
              itemStyle:{ color:'#1a90ff'},
              //data: [130, 30, 9, 10]
              data:[flow.eveningPeek.lastMonth,flow.eveningPeek.lastWeek,flow.eveningPeek.yesterday,flow.eveningPeek.today]
          },
          {
              name: '全天',
              type: 'bar',
              itemStyle:{ color:'#add7ff'},
              xAxisIndex: 1,
              yAxisIndex: 1,
              //data: [200, 50, 10, 12]
              data:[load.hole.lastMonth,load.hole.lastWeek,load.hole.yesterday,load.hole.today]
          },
          {
              name: '早高峰',
              type: 'bar',
              itemStyle:{ color:'#6cb8ff'},
              xAxisIndex: 1,
              yAxisIndex: 1,
              //data: [100, 25, 13, 14]
              data:[load.morningPeek.lastMonth,load.morningPeek.lastWeek,load.morningPeek.yesterday,load.morningPeek.today]
          },
          {
              name: '晚高峰',
              type: 'bar',
              itemStyle:{ color:'#1a90ff'},
              xAxisIndex: 1,
              yAxisIndex: 1,
              //data: [130, 30, 9, 10]
              data:[load.eveningPeek.lastMonth,load.eveningPeek.lastWeek,load.eveningPeek.yesterday,load.eveningPeek.today]
          }
        ]
      })
      myChart.resize()
  }

}
export default index
