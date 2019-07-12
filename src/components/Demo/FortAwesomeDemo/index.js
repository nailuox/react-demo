import React, { Component } from 'react'
import { Card, Col, Row } from 'antd'
import '@fortawesome/fontawesome-free/css/all.css'

import CustomBreadcrumb from '@common/CustomBreadcrumb'
import TypingCard from '@common/TypingCard'
import styles from './index.module.less'

class index extends Component {
  render() {
    const cardContent = `<ul className="card-ul">
            <li>Font Awesome提供可缩放的矢量图标，可以使用CSS所提供的所有特性对它们进行更改，包括：大小、颜色、阴影或者其它任何支持的效果。</li>
            <li>安装FortAwesome依赖， yarn add @fortawesome/fontawesome-free</li>
            <li>js文件中引入 import '@fortawesome/fontawesome-free/css/all.css'</li>
            <li>具体使用参见<a href="http://www.fontawesome.com.cn/" target="#">FortAwesome官网</a></li>
        </ul>`
    return (
      <div className={styles.fortawesomePage}>
        <CustomBreadcrumb arr={['FortAwesome Demo']} />
        <TypingCard source={cardContent} id="howUse" title="使用说明" />
        <Row gutter={20}>
          <Col span={24}>
            <Card
              hoverable
              bordered={false}
              title="基础图标"
              style={{ minHeight: 400 }}
              id="1"
            >
              <i className="fa fa-address-book fa-2x" aria-hidden="true" />
              <div className={styles.listGroup}>
                <a className={styles.listGroupItem} href="/app/dashboard">
                  <i className="fa fa-home fa-fw" aria-hidden="true" />
                  &nbsp; 首页
                </a>
                <a
                  className={styles.listGroupItem}
                  href="http://www.fontawesome.com.cn/"
                >
                  <i className="fa fa-book fa-fw" aria-hidden="true" />
                  &nbsp; 关于我们
                </a>
              </div>
              <ul className="fa-ul">
                <li>
                  <i className="fa-li fa fa-check-square" />
                  使用列表类图标
                </li>
                <li>
                  <i className="fa-li fa fa-check-square" />
                  轻松的替换
                </li>
                <li>
                  <i className="fa-li fa fa-spinner fa-spin" />
                  无序列表
                </li>
                <li>
                  <i className="fa-li fa fa-square" />
                  中的默认图标
                </li>
              </ul>

              <i className="fa fa-spinner fa-spin fa-3x fa-fw" />
              <span className="sr-only">Loading1...</span>

              <i className="fa fa-cog fa-spin fa-3x fa-fw" />
              <span className="sr-only">Loading4...</span>

              <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
              <span className="sr-only">Loading5...</span>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default index
