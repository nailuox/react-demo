import React from 'react'
import moment from 'moment'
import { message } from 'antd'
import Echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/grid'

import AppWebScoket from '@common/WebScoket'
import Axios from '@common/Axios'
import Constant from '@common/Constant'
import styles from './index.module.less'
import ScheduleTimeBar from './ScheduleTimeBar'

const {
  SEAT_ACCEPTED,
  SEAT_LOST
} = Constant.redisKeys

class ScheduleChart extends React.Component {

  constructor(props) {
    super(props)

    this.baseOptions = null
    this.chart = null
    this.wsInstance = null

    this.userInfo = JSON.parse(sessionStorage.getItem(Constant.storageKeys.userInfo))

    this.SEAT_ACCEPTED = SEAT_ACCEPTED.replace('$userId', this.userInfo.user_id)
    this.SEAT_LOST = SEAT_LOST.replace('$userId', this.userInfo.user_id)

    this.initBaseOptions()
  }

  componentDidMount() {
    this.initChart()
    this.fetchAcceptAndLostNums()
    this.initWS()
  }

  render() {

    return (
      <div className={styles.scheduleChartRoot}>
        <p className={styles.title}>坐席时间</p>
        <div className={styles.chart} ref="chart" />
        <ScheduleTimeBar />
      </div>
    )
  }

  initBaseOptions = () => {
    const hoursOfDay = (() => {
      const hArr = []
      const time = moment().startOf('day')

      let i = 0
      while(i < 24) {
        hArr.push(time.format('HH:mm'))
        time.add(1, 'hour')
        i++
      }
      return hArr
    })()

    this.baseOptions = {
      grid: {
        top: 10,
        right: 10,
        bottom: 25,
        left: 40
      },
      xAxis: {
        data: hoursOfDay,
        axisLine: {
          lineStyle: {
            color: 'rgba(63, 91, 118, 0.8)'
          }
        },
        axisLabel: {
          color: '#dff6ff',
          margin: 8
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: 'rgba(63, 91, 118, 0.8)'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(63, 91, 118, 0.8)'
          }
        },
        axisLabel: {
          color: '#ffffff',
          margin: 12
        }
      },
      series: [{
        name: '接警',
        type: 'bar',
        data: new Array(24).fill(0),
        stack: 'count',
        itemStyle: {
          color: 'rgba(125, 179, 225, 1)',
          borderColor: 'rgba(125, 179, 225, 1)'
        },
        barWidth: 23
      },{
        name: '漏接',
        type: 'bar',
        data: new Array(24).fill(0),
        stack: 'count',
        itemStyle: {
          color: 'rgba(125, 179, 225, 0.2)',
          borderColor: 'rgba(125, 179, 225, 0.5)'
        },
        barWidth: 23
      }]
    }
  }

  initChart() {
    this.chart = Echarts.init(this.refs.chart)
    this.setData()
  }

  fetchAcceptAndLostNums = async () => {
    let acceptedData
    let lostData

    try {
      const acceptedRes = await Axios.get(Constant.api.seats.taskAcceptedNum.replace('$userId', this.userInfo.user_id))
      const lostRes = await Axios.get(Constant.api.seats.taskLostNum.replace('$userId', this.userInfo.user_id))

      acceptedData = acceptedRes.data.data || []
      lostData = lostRes.data.data || []
    } catch(err) {
      return message.error('获取任务统计信息失败, ' + err)
    }

    this.receivedAcceptAndLostNums(acceptedData, lostData)
  }

  receivedAcceptAndLostNums = (acceptedData, lostData) => {
    acceptedData = this.convertObject2Array(acceptedData, 24, 0)
    lostData = this.convertObject2Array(lostData, 24, 0)

    this.setData(acceptedData, lostData)
  }

  convertObject2Array = (obj, length, defaultValue) => Object.keys(obj).reduce((arr, key) => {
    arr[Number(key)] = obj[key]
    return arr
  }, new Array(length || 0).fill(defaultValue || 0))

  initWS = () => {
    this.wsInstance = new AppWebScoket({
      subscribeKeys: [
        this.SEAT_ACCEPTED,
        this.SEAT_LOST
      ],
      onMessage: this.onWSMessage
    })
  }

  onWSMessage = (data, key) => {
    switch (key) {

      case this.SEAT_ACCEPTED:
        data = this.convertObject2Array(data, 24, 0)
        const lostData = [...this.baseOptions.serises[1].data]
        this.setData(data, lostData)
        break
      case this.SEAT_LOST:
        data = this.convertObject2Array(data, 24, 0)
        const acceptedData = [...this.baseOptions.serises[0].data]
        this.setData(acceptedData, data)
        break

      default:
        break
    }
  }

  getChartOptions = (acceptedData, lostData) => {
    this.baseOptions.series[0].data = acceptedData
    this.baseOptions.series[1].data = lostData
    return this.baseOptions
  }

  setData = (
    acceptedData = new Array(24).fill(0),
    lostData = new Array(24).fill(0)
  ) => {
    const options = this.getChartOptions(acceptedData, lostData)
    this.chart.setOption(options)
  }

  resizeChart = () => {
    this.chart.resize()
  }
}

export default ScheduleChart
