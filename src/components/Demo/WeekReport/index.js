import React from 'react'
import echarts from 'echarts/lib/echarts'
import { Table, Row, Col } from 'antd'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'

import styles from './index.module.less'
import tableStyles from '@styles/Table/index.module.less'

const { Column } = Table

class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [
        {
          timeSolt: '全天',
          zqxCons: '9832',
          tfxCons: '954',
          tfxEvent: '92500'
        },
        {
          timeSolt: '早高峰',
          zqxCons: '9832',
          tfxCons: '954',
          tfxEvent: '92500'
        },
        {
          timeSolt: '晚高峰',
          zqxCons: '9832',
          tfxCons: '954',
          tfxEvent: '92500'
        }
      ],
      chartData: [
        { name: '绿灯跟进导致路口塞死', data: 140 },
        { name: '绿致路口塞死', data: 123 },
        { name: '绿灯致路口塞死', data: 232 },
        { name: '绿灯跟路口塞死', data: 176 },
        { name: '绿灯跟进口塞死', data: 185 },
        { name: '绿灯跟进口塞死', data: 146 },
        { name: '绿灯跟进导口塞死', data: 157 },
        { name: '绿灯口塞死', data: 180 },
        { name: '绿灯跟口塞死', data: 179 },
        { name: '绿灯跟进导致路口塞死', data: 140 },
        { name: '绿致路口塞死', data: 123 },
        { name: '绿灯致路口塞死', data: 232 },
        { name: '绿灯跟路口塞死', data: 176 },
        { name: '绿灯跟进口塞死', data: 185 },
        { name: '绿灯跟进口塞死', data: 146 },
        { name: '绿灯跟进导口塞死', data: 157 },
        { name: '绿灯口塞死', data: 180 },
        { name: '绿灯跟口塞死', data: 179 }
      ],
      infoData: {
        quConsEvent: 3223,
        zqxCons: 2211,
        tfxEvent: 2222223,
        ydInTfxEvent: 166,
        dlEvent: 57
      },
      interSectionData: {
        total: 600,
        list: [
          { name: '沙河口', data: 100 },
          { name: '沙河口', data: 100 },
          { name: '沙河口', data: 100 },
          { name: '沙河口', data: 100 },
          { name: '沙河口', data: 100 }
        ]
      }
    }
  }

  render() {
    const { tableData, infoData } = this.state
    return (
      <div className={styles.maxDiv}>
        <div className={styles.info}>
          大连市本日全天拥堵事件
          <span className={styles.num}>{infoData.quConsEvent}</span>次，
          周期性拥堵<span className={styles.num}>{infoData.zqxCons}</span>
          次，突发事件
          <span className={styles.num}>{infoData.tfxEvent}</span>
          次。突发事件中有拥堵事件
          <span className={styles.num}>{infoData.ydInTfxEvent}</span>
          次，独立事件
          <span className={styles.num}>{infoData.dlEvent}</span>次。
        </div>
        <div className={styles.eventBox}>
          <div className={styles.leftBox}>
            <div className={styles.conEventTitle}>拥堵事件</div>
            <div className={styles.conEventCharts}>
              <div id="annularEvent" className={styles.annularEvent}></div>
              <div id="barEvent" className={styles.barEvent}></div>
            </div>
          </div>
          <div className={styles.leftBox}>
            <div className={styles.conEventTitle}>独立事件</div>
            <div className={styles.conEventCharts}>
              <div id="annularStandEvent" className={styles.annularEvent}></div>
              <div id="barStandEvent" className={styles.barEvent}></div>
            </div>
          </div>
        </div>
        <div className={styles.todayTableBox}>
          <div className={styles.todayTableTitle}>当日一览表</div>
          <div className={styles.tableDiv}>
            <Table
              rowKey="roadid"
              className={`${tableStyles.antdTableStyle} ${styles.table}`}
              bordered={false}
              dataSource={tableData}
              pagination={false}
            >
              <Column width="25%" dataIndex="timeSolt" title="" />
              <Column width="25%" dataIndex="zqxCons" title="周期性拥堵" />
              <Column width="25%" dataIndex="tfxCons" title="突发性拥堵" />
              <Column width="25%" dataIndex="tfxEvent" title="突发性独立事件" />
            </Table>
          </div>
        </div>
        <div className={styles.trafficBarBox}>
          <div className={styles.trafficEventTitle}>交通事件构成分析</div>
          <div id="jtsjgcCharts" className={styles.zzt}></div>
        </div>
      </div>
    )
  }
  componentDidMount() {
    this.modeChart(this.state.chartData)
    this.eventAnnularChart()
    this.eventBarChart()
    this.standEventAnnularChart()
    this.standEventBarChart()
  }

  modeChart = data => {
    const dataViewList = {
      name: [],
      data: []
    }
    data &&
      data.map(item => {
        dataViewList.name.push(item.name)
        dataViewList.data.push(item.data)
        return true
      })

    this.inittodayYdChart(dataViewList)
  }

  setData = (tableData, chartData, infoData) => {
    this.setState({
      tableData: tableData,
      chartData: chartData,
      infoData: infoData
    })
  }

  inittodayYdChart = (dataViewList = {}) => {
    const myChart = echarts.init(document.getElementById('jtsjgcCharts'))
    myChart.setOption({
      color: ['#7CB3E2'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          //data: ['绿灯跟进导致路口塞死', '车流量大（周期性）', '普通交通事故', '交通管制', '无视频支持', '车辆故障', '无灯控路口塞死', '医院周边停车影响（周期性）', '路面执法执勤', '变道加塞', '前方拥堵影响', '异常停车', '占用应急车道', '逆行', '视频故障', '视频故障', '视频故障', '视频故障'],
          data: dataViewList.name || [],
          axisTick: {
            //alignWithLabel: true
          },

          axisLabel: {
            interval: 0,
            rotate: 76,
            fontSize: 12,
            textStyle: {
              color: '#DFF6FF'
            }
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: 5,
            lineStyle: {
              color: '#707070',
              width: 1 //这里是为了突出显示加上的
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            fontSize: 12,
            textStyle: {
              color: '#DFF6FF'
            }
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: 5,
            lineStyle: {
              color: '#707070',
              width: 1
            }
          }
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          //data: [160, 152, 200, 334, 390, 330, 220, 210, 152, 200, 334, 390, 330, 220, 232, 176, 220, 210]
          data: dataViewList.data || []
        }
      ]
    })
  }

  eventAnnularChart = () => {
    const myChart = echarts.init(document.getElementById('annularEvent'))
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '40%',
        top: '43%',
        textStyle: {
          color: '#DFF6FF'
        },
        //bottom: 20,

        data: ['路口', '路段']
      },
      color: ['#ECA900', '#65B3EC'],
      series: [
        {
          name: '拥堵来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '路口' },
            { value: 310, name: '路段' }
          ]
        }
      ]
    })
  }
  standEventAnnularChart = () => {
    const myChart = echarts.init(document.getElementById('annularStandEvent'))
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        type: 'scroll',
        orient: 'vertical',
        right: '40%',
        top: '43%',
        textStyle: {
          color: '#DFF6FF'
        },
        //bottom: 20,

        data: ['路口', '路段']
      },
      color: ['#ECA900', '#65B3EC'],
      series: [
        {
          name: '拥堵来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center'
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: '路口' },
            { value: 310, name: '路段' }
          ]
        }
      ]
    })
  }

  eventBarChart = () => {
    const myChart = echarts.init(document.getElementById('barEvent'))
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['路口', '路段'],
        textStyle: {
          color: '#DFF6FF'
        },
        right: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['沙河口', '甘井子', '西岗', '中山', '抚顺'],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            fontSize: 12,
            textStyle: {
              color: '#DFF6FF'
            }
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: 5,
            lineStyle: {
              color: '#707070',
              width: 1 //这里是为了突出显示加上的
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            fontSize: 12,
            textStyle: {
              color: '#DFF6FF'
            }
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: 5,
            lineStyle: {
              color: '#707070',
              width: 1
            }
          }
        }
      ],
      series: [
        {
          name: '路口',
          type: 'bar',
          stack: '广告',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          itemStyle: {
            normal: {
              color: '#65B3EC'
            }
          },
          barWidth: '60%',
          data: [120, 132, 101, 134, 90]
        },
        {
          name: '路段',
          type: 'bar',
          stack: '广告',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          itemStyle: {
            normal: {
              color: '#ECA900'
            }
          },
          barWidth: '60%',
          data: [220, 182, 191, 234, 290]
        }
      ]
    })
  }
  standEventBarChart = () => {
    const myChart = echarts.init(document.getElementById('barStandEvent'))
    myChart.setOption({
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        data: ['路口', '路段'],
        textStyle: {
          color: '#DFF6FF'
        },
        right: 10
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['沙河口', '甘井子', '西岗', '中山', '抚顺'],
          axisTick: {
            alignWithLabel: true
          },
          axisLabel: {
            fontSize: 12,
            textStyle: {
              color: '#DFF6FF'
            }
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: 5,
            lineStyle: {
              color: '#707070',
              width: 1 //这里是为了突出显示加上的
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            fontSize: 12,
            textStyle: {
              color: '#DFF6FF'
            }
          },
          axisLine: {
            symbol: ['none', 'arrow'],
            symbolSize: 5,
            lineStyle: {
              color: '#707070',
              width: 1
            }
          }
        }
      ],
      series: [
        {
          name: '路口',
          type: 'bar',
          stack: '广告',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          itemStyle: {
            normal: {
              color: '#65B3EC'
            }
          },
          barWidth: '60%',
          data: [120, 132, 101, 134, 90]
        },
        {
          name: '路段',
          type: 'bar',
          stack: '广告',
          label: {
            normal: {
              show: true,
              position: 'insideRight'
            }
          },
          itemStyle: {
            normal: {
              color: '#ECA900'
            }
          },
          barWidth: '60%',
          data: [220, 182, 191, 234, 290]
        }
      ]
    })
  }
}
export default index
