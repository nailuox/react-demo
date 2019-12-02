import React, { Component } from 'react'
import { Col, Row, Table, Spin, message } from 'antd'

import CustomBreadcrumb from '@common/CustomBreadcrumb'
import TypingCard from '@common/TypingCard'
import Axios from '@common/Axios'
import styles from './index.module.less'

const { Column } = Table

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      users: []
    }
  }

  render() {
    const { loading, users } = this.state
    const cardContent = `<ul class="card-ul">
            <li>Axios主要作用是调取后台数据，功能与传统的Ajax类似，与JQuery Ajax不同的是Axios是Promise的实现版本，符合最新的ES规范</li>
            <li>安装Axios依赖， yarn add axios</li>
            <li>以下数据来自Axios调用获取</li>
            <li>具体使用参见<a href="https://www.kancloud.cn/yunye/axios/234845" target="#">Axios官网</a></li>
        </ul>`
    return (
      <div className={styles.axiosPage}>
        <CustomBreadcrumb arr={['Axios Demo']} />
        <TypingCard source={cardContent} id="howUse" title="使用说明" />

        <Row gutter={32}>
          <Col span={24}>
            <Spin spinning={loading}>
              <Table
                rowKey="id"
                defaultExpandAllRows={true}
                bordered={true}
                className={styles.reacorListTable}
                dataSource={users}
                pagination={false}
                rowClassName={(record, index) =>
                  index % 2 === 0 ? 'active' : 'lop'
                }
              >
                <Column dataIndex="id" title="id" />
                <Column dataIndex="username" title="姓名" />
                <Column dataIndex="sex" title="性别" />
                <Column dataIndex="age" title="年龄" />
                <Column dataIndex="hobby" title="爱好" />
              </Table>
            </Spin>
          </Col>
        </Row>
      </div>
    )
  }

  componentDidMount() {
    this.requestData()
  }

  requestData = async () => {
    let users = []
    try {
      const res = await Axios.get('/api/axios.json')
      users = res.data ? res.data : []
    } catch (e) {
      message.error('请求数据出错：' + e)
    }

    this.setState({ loading: false, users })
  }
}

export default index
