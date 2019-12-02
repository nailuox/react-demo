import React from 'react'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import { Card } from 'antd'

import styles from './index.module.less'

class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      infoData: { quality: '良好', num: 85 },
      signData: { total: 232, offLine: 33, fault: 13 },
      videoData: { total: 232, offLine: 33, fault: 13 },
      detectorData: { total: 232, offLine: 33, fault: 13 }
    }
  }

  render() {
    const { infoData, signData, videoData, detectorData } = this.state
    return (
      <div className={styles.maxDiv}>
        <div className={styles.d1}>
          大连市本日设备数据质量&nbsp;
          <span className={styles.infomation}>{infoData.quality}</span>,
          &nbsp;健康度&nbsp;
          <span className={styles.infomation}>{infoData.num}</span>
        </div>
        <div className={styles.maxDiv2}>
          <div className={styles.card1}>
            <Card title="信号机" bordered={false}>
              <p>
                总&nbsp;数&nbsp;量：&nbsp;&nbsp;&nbsp;&nbsp;{signData.total}
              </p>
              <p>离线数量：&nbsp;&nbsp;&nbsp;&nbsp;{signData.offLine}</p>
              <p>故障数量：&nbsp;&nbsp;&nbsp;&nbsp;{signData.fault}</p>
            </Card>
          </div>
          <div className={styles.di1}></div>
          <div className={styles.card2}>
            <Card title="视频" bordered={false}>
              <p>
                总&nbsp;&nbsp;数&nbsp;&nbsp;量：&nbsp;&nbsp;&nbsp;&nbsp;
                {videoData.total}
              </p>
              <p>离线数量：&nbsp;&nbsp;&nbsp;&nbsp;{videoData.offLine}</p>
              <p>故障数量：&nbsp;&nbsp;&nbsp;&nbsp;{videoData.fault}</p>
            </Card>
          </div>
          <div className={styles.di2}></div>
          <div className={styles.card3}>
            <Card title="检测器" bordered={false}>
              <p>
                总&nbsp;&nbsp;数&nbsp;&nbsp;量：&nbsp;&nbsp;&nbsp;&nbsp;
                {detectorData.total}
              </p>
              <p>离线数量：&nbsp;&nbsp;&nbsp;&nbsp;{detectorData.offLine}</p>
              <p>故障数量：&nbsp;&nbsp;&nbsp;&nbsp;{detectorData.fault}</p>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  componentDidMount() {}

  setData = (infoData, signData, videoData, detectorData) => {
    this.setState({
      infoData: infoData,
      signData: signData,
      videoData: videoData,
      detectorData: detectorData
    })
  }
}
export default index
