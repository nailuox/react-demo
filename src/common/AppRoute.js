import React from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'

import Dashboard from '@components/Dashboard'

import EchartsDemo from '@components/Demo/EchartsDemo'
import AxiosDemo from '@components/Demo/AxiosDemo'
import FabricDemo from '@components/Demo/FabricDemo'
import VideoDemo from '@components/Demo/VideoDemo'
import OpenLayerDemo from '@components/Demo/OpenLayerDemo'
import WebsocketDemo from '@components/Demo/WebsocketDemo'
import FortAwesomeDemo from '@components/Demo/FortAwesomeDemo'
import QbChartDemo from '@components/Demo/QbChartDemo'
import IntersectionDemo from '@components/Demo/IntersectionDemo'
import KeyIntersection from '@components/Demo/KeyIntersection'
import KeyRoad from '@components/Demo/KeyRoad'
import DatePickerDemo from '@components/Demo/DatePickerDemo'
import TableDemo from '@components/Demo/TableDemo'

const { Content } = Layout

class AppRoute extends React.Component {
  render() {
    return (
      <Content>
        <Route path="/app/dashboard" component={Dashboard} />
        <Route path="/app/qbcharts" component={QbChartDemo} />
        <Route path="/app/intersection" component={IntersectionDemo} />
        <Route path="/app/echarts" component={EchartsDemo} />
        <Route path="/app/axios" component={AxiosDemo} />
        <Route path="/app/fabric" component={FabricDemo} />
        <Route path="/app/video" component={VideoDemo} />
        <Route path="/app/openlayer" component={OpenLayerDemo} />
        <Route path="/app/websocket" component={WebsocketDemo} />
        <Route path="/app/fortawesome" component={FortAwesomeDemo} />
        <Route path="/app/keyintersection" component={KeyIntersection} />
        <Route path="/app/keyroad" component={KeyRoad} />
        <Route path="/app/datepickerdemo" component={DatePickerDemo} />
        <Route path="/app/table" component={TableDemo} />
      </Content>
    )
  }
}

export default AppRoute
