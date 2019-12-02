import React from 'react'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import echarts from 'echarts/lib/echarts'
class CompareChart extends React.Component{
    constructor(props){
      super(props)
      this.baseOptions = null
      this.chart = null
      this.initBaseOptions()//first
    }
   render(){
      return(
        <div id="comparechart" ref="chart" style={{ width: 999, height: 431}} />
      )
   }

   componentDidMount(){
    this.initChart()//second
   }

   initBaseOptions(){
    this.baseOptions = {
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
              data:new Array(4).fill(0)
          },
          {
              name: '早高峰',
              type: 'bar',
              itemStyle:{ color:'#6cb8ff'},
              //data: [100, 25, 13, 14]
              data:new Array(4).fill(0)
          },
          {
              name: '晚高峰',
              type: 'bar',
              itemStyle:{ color:'#1a90ff'},
              //data: [130, 30, 9, 10]
              data:new Array(4).fill(0)
          },
          {
              name: '全天',
              type: 'bar',
              itemStyle:{ color:'#add7ff'},
              xAxisIndex: 1,
              yAxisIndex: 1,
              //data: [200, 50, 10, 12]
              data:new Array(4).fill(0)
          },
          {
              name: '早高峰',
              type: 'bar',
              itemStyle:{ color:'#6cb8ff'},
              xAxisIndex: 1,
              yAxisIndex: 1,
              //data: [100, 25, 13, 14]
              data:new Array(4).fill(0)
          },
          {
              name: '晚高峰',
              type: 'bar',
              itemStyle:{ color:'#1a90ff'},
              xAxisIndex: 1,
              yAxisIndex: 1,
              //data: [130, 30, 9, 10]
              data:new Array(4).fill(0)
          }
        ]
    }
   }
   initChart() {
    this.chart = echarts.init(this.refs.chart)
    //this.setData() //重复setData,可能报错(****)
  }
  //third
  setData = (sdata = new Array(4).fill(0)) => {
    const options = this.getChartOptions(sdata.flow, sdata.load)
    //const flow=sdata.flow
    //console.log(flow)
    //console.log(Object.keys(flow))
    //console.log(flow.morningPeek)
    //console.log(flow.morningPeek.lastMonth)
    this.chart.setOption(options)
  }
  convertObject2Array = (obj, length, defaultValue) => Object.keys(obj).reduce((arr, key) => {
    arr[Number(key)] = obj[key]
    return arr
  }, new Array(length || 0).fill(defaultValue || 0))

  getChartOptions = (flow,load) => {
    if(typeof(flow)=='undefined' || typeof(load)=='undefined'){
      this.baseOptions.series[0].data = new Array(4).fill(0)
      this.baseOptions.series[1].data = new Array(4).fill(0)
      this.baseOptions.series[2].data = new Array(4).fill(0)
      this.baseOptions.series[3].data = new Array(4).fill(0)
      this.baseOptions.series[4].data = new Array(4).fill(0)
      this.baseOptions.series[5].data = new Array(4).fill(0)
    }else{
      this.baseOptions.series[0].data = [flow.hole.lastMonth,flow.hole.lastWeek,flow.hole.yesterday,flow.hole.today]
      this.baseOptions.series[1].data = [flow.morningPeek.lastMonth,flow.morningPeek.lastWeek,flow.morningPeek.yesterday,flow.morningPeek.today]
      this.baseOptions.series[2].data = [flow.eveningPeek.lastMonth,flow.eveningPeek.lastWeek,flow.eveningPeek.yesterday,flow.eveningPeek.today]
      this.baseOptions.series[3].data = [load.hole.lastMonth,load.hole.lastWeek,load.hole.yesterday,load.hole.today]
      this.baseOptions.series[4].data = [load.morningPeek.lastMonth,load.morningPeek.lastWeek,load.morningPeek.yesterday,load.morningPeek.today]
      this.baseOptions.series[5].data = [load.eveningPeek.lastMonth,load.eveningPeek.lastWeek,load.eveningPeek.yesterday,load.eveningPeek.today]
    }
    return this.baseOptions
  }


}
export default CompareChart
