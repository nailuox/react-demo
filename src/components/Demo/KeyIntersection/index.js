import React, { Component } from 'react'
import { Table, Row, Col } from 'antd'
import moment from 'moment'

import styles from './index.module.less'
import tableStyles from '@styles/Table/index.module.less'

const { Column } = Table

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [
        {
          roadid: "11",
          roadname: "东快速辅路(南行)出口汇流处",
          peakhour: "07:00-08:00",
          blanceindex: "9500"
        },
        {
          roadid: "12",
          roadname: "东快速辅路(南行)出口汇流处",
          peakhour: "07:00-08:00",
          blanceindex: "9500"
        },
        {
          roadid: "13",
          roadname: "东快速辅路(南行)出口汇流处",
          peakhour: "07:00-08:00",
          blanceindex: "9500"
        },
        {
          roadid: "14",
          roadname: "东快速辅路(南行)出口汇流处",
          peakhour: "07:00-08:00",
          blanceindex: "9500"
        },
        {
          roadid: "15",
          roadname: "东快速辅路(南行)出口汇流处",
          peakhour: "07:00-08:00",
          blanceindex: "9500"
        },
        {
          roadid: "16",
          roadname: "东快速辅路(南行)出口汇流处",
          peakhour: "07:00-08:00",
          blanceindex: "9500"
        }
      ]
    };
  }

  render() {
    const { data } = this.state
    return (
      <div className={styles.showBox}>
        <div className={styles.tableBox}>
          <Row>
            <Col span={24}>
              <span className={styles.chartTitle}>
                平衡指数排名
              </span>
            </Col>
            <Col span={24}>
              <Table
                rowKey="roadid"
                className={`${tableStyles.antdTableStyle} ${styles.table}`}
                bordered={false}
                dataSource={data}
                pagination={false}
              >
                <Column
                  width="5%"
                  dataIndex="rank"
                  title="排名"
                  render={(text, record, index) => (
                    <div
                      className={`${
                        tableStyles.tableIdBox
                      } ${tableStyles.ranking - 0}`}
                    >
                      {index + 1}
                    </div>
                  )}
                />
                <Column width="50%" dataIndex="roadname" title="路段名" />
                <Column width="30%" dataIndex="peakhour" title="高峰时段" />
                <Column width="15%" dataIndex="blanceindex" title="平衡指数" />
              </Table>
            </Col>
          </Row>
        </div>
      </div>
    );
  }

  setTableData = data => {
    this.setState({ data })
  }
}

export default index
