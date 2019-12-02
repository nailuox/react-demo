import React from 'react'
import { DatePicker } from 'antd'
import moment from 'moment'

import styles from './index.module.less'

const dateFormat = 'YYYY 年 MM 月 DD 日 '

class index extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      time: ''
    }
  }
  componentDidMount() {
    const now = moment().format('YYYY-MM-DD')
    this.setState({ time: now })
  }
  render() {
    return (
      <div className={styles.searchBox}>
        <span className={styles.prefix}>日期</span>
        <div className={styles.calendarSearch}>
          <DatePicker defaultValue={moment()} format={dateFormat} />
        </div>
      </div>
    )
  }
}
export default index
