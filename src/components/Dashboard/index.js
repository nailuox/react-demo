import React from 'react'

import CustomBreadcrumb from '@common/CustomBreadcrumb'
import TypingCard from '@common/TypingCard'

class Dashboard extends React.Component {
  render() {
    const cardContent = `<ul class="card-ul">
            <li>该系统用于演示react项目</li>
            <li>使用CRA脚手架生成, UI使用 Antd Design, 使用Yarn管理依赖</li>
            <li>项目使用技术栈为：react + react router + react redux + redux thunk + less</li>
            <li>
              演示Echart图表组件, Fabric绘制图形插件, Openlayer地图组件, Video视频播放器插件,
               FortAwesome字体图标, Websocket等组件的使用
            </li>
        </ul>`
    return (
      <div>
        <CustomBreadcrumb />
        <TypingCard source={cardContent} id="howUse" title="项目介绍" />
      </div>
    )
  }
}

export default Dashboard
