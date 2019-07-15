import React, { Component } from 'react'
import { Col, Row, Table, Spin, message } from 'antd'
import ReconnectingWebSocket from 'reconnectingwebsocket'

import CustomBreadcrumb from '@common/CustomBreadcrumb'
import TypingCard from '@common/TypingCard'
import AppHistory from '@common/AppHistory'
import styles from './index.module.less'

const { Column } = Table

class index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      users: []
    }
    this.ws = null
  }

  render() {
    const cardContent = `<ul class="card-ul">
            <li>Websocket允许服务端主动向客户端推送数据。在WebSocket API中，浏览器和服务器只需要完成一次握手，两者之间就直接可以创建持久性的连接，并进行双向数据传输。</li>
            <li>安装Websocket依赖， yarn add reconnectingwebsocket</li>
            <li>具体使用参见<a href="https://www.npmjs.com/package/reconnectingwebsocket" target="#">reconnectingwebsocket npm</a></li>
            <li>以下数据通过<a href="http://coolaf.com/tool/chattest" target="#">websocket在线测试地址</a>发送并获取</li>
        </ul>`
    const { users, loading } = this.state
    return (
      <div className={styles.websocketPage}>
        <CustomBreadcrumb arr={['Websocket Demo']} />
        <TypingCard source={cardContent} id="howUse" title="使用说明" />
        <Row gutter={20}>
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
    this.fetchData()
  }

  fetchData = () => {
    try {
      this.ws = new ReconnectingWebSocket(
        'ws://123.207.167.163:9010/ajaxchattest'
      )
    } catch (e) {
      message.error('websocket连接出错：' + e)
      setTimeout(() => {
        AppHistory.goback()
      }, 2000)
    }
    // console.log(this.ws)
    this.ws.onopen = data => {
      console.log('Connection open ...')
      this.ws.send(
        `[{"id": 1,"username": "张三","sex": "男","age": 20,"hobby": "旅游"},{"id": 2,"username": "李四","sex": "男","age": 32,"hobby": "看书"}]`
      )
    }
    this.ws.onmessage = data => {
      console.log(data.data)
      const users = JSON.parse(
        data.data.replace('<b>从服务端返回你发的消息：</b>')
      )
      this.setState({ loading: false, users })
      // message.success(data.data)
      this.ws.close()
    }
  }

  componentWillUnmount() {
    if (!this.ws) {
      this.ws.close()
    }
  }
}

export default index
