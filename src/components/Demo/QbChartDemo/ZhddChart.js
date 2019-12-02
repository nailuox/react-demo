import React from 'react'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import echarts from 'echarts/lib/echarts'

class ZhddChart extends React.Component{
  constructor(props){
    super(props)
    //this.baseOptions = null
    //this.chart = null
    //this.initBaseOptions()
 }
 render(){
    return(
        <div id="zhddchart" ref="chart"  style={{ width: 400, height:260,backgroundColor:'#0c2233' }} />
    )
 }
 componentDidMount(){
  this.initChart()
 }

 initChart() {
  //this.chart = echarts.init(this.refs.chart)
  //this.setData()
  const myChart=echarts.init(document.getElementById('zhddchart'))
  myChart.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
    yAxis: {
        type: 'value',
        axisLabel:{
          show:false,
          margin:-10,
        }

      },
    series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        areaStyle: {}
     }]
  })

}

}
export default ZhddChart
