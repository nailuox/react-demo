import React from 'react'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import echarts from 'echarts/lib/echarts'
class TodayChart extends React.Component{
   constructor(props){
      super(props)
      this.baseOptions = null
      this.chart = null
      this.initBaseOptions()
   }
   render(){
      return(
          <div id="todaycharts" ref="chart"  style={{ width: 720, height:431 }} />
      )
   }
   componentDidMount(){
    //this.initTodayChart()
    this.initChart()
   }
   initBaseOptions(){
    this.baseOptions = {
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
              data:new Array(24).fill(0)
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
              data:new Array(24).fill(0)
          }
      ]
    }
   }
   initChart() {
    this.chart = echarts.init(this.refs.chart)
    //this.setData()
  }
  setData = (flowData = new Array(24).fill(0)) => {
    const options = this.getChartOptions(flowData.flow, flowData.saturation)
    this.chart.setOption(options)
  }

  getChartOptions = (flowData, saturationData) => {
    this.baseOptions.series[0].data = flowData
    this.baseOptions.series[1].data = saturationData
    return this.baseOptions
  }

}
export default TodayChart
