import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import { connect } from 'react-redux'

import { action } from './store'

import AppHistory from '@common/AppHistory'
import styles from './index.module.less'

const SubMenu = Menu.SubMenu
const { Sider } = Layout

class LeftSide extends React.Component {
  render() {
    const { leftSideCollapsed } = this.props
    const defaultSelectedKey = AppHistory.location.pathname.replace('/app/', '')
    return (
      <Sider
        trigger={null}
        collapsible
        collapsed={leftSideCollapsed}
        className={styles.leftSide}
      >
        <div className={styles.logo}>LOGO</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKey]}
          onSelect={this.handleMenuSelect}
        >
          <Menu.Item key="dashboard">
            <Link to="/app/dashboard">
              <Icon type="dashboard" />
              <span>首页</span>
            </Link>
          </Menu.Item>
          <SubMenu
            title={
              <span>
                <Icon type="menu-unfold" />
                <span>组件演示</span>
              </span>
            }
          >
            <Menu.Item key="qbcharts">
              <Link to="/app/qbcharts">
                <Icon type="eye" />
                <span>QbCharts</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="intersection">
              <Link to="/app/intersection">
                <Icon type="fork" />
                <span>Intersection</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="echarts">
              <Link to="/app/echarts">
                <Icon type="pie-chart" />
                <span>Echarts</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="axios">
              <Link to="/app/axios">
                <Icon type="api" />
                <span>Axios</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="fabric">
              <Link to="/app/fabric">
                <Icon type="highlight" />
                <span>Fabric</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="video">
              <Link to="/app/video">
                <Icon type="play-circle" />
                <span>Video</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="openlayer">
              <Link to="/app/openlayer">
                <Icon type="global" />
                <span>OpenLayer</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="websocket">
              <Link to="/app/websocket">
                <Icon type="sliders" />
                <span>Websocket</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="fortawesome">
              <Link to="/app/fortawesome">
                <Icon type="appstore" />
                <span>FortAwesome</span>
              </Link>
            </Menu.Item>

            <Menu.Item key="keyintersection">
              <Link to="/app/keyintersection">
                <Icon type="appstore" />
                <span>KeyIntersection</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="keyroad">
              <Link to="/app/keyroad">
                <Icon type="appstore" />
                <span>KeyRoad</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="datepickerdemo">
              <Link to="/app/datepickerdemo">
                <Icon type="appstore" />
                <span>DatePickerDemo</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="tabledemo">
              <Link to="/app/table">
                <Icon type="appstore" />
                <span>TableDemo</span>
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    )
  }

  handleMenuSelect = item => {
    if (item.key === 'manualControl') {
      window.open(
        '/manualControlPanel',
        'manualControlPanel',
        'width=480, height=480, location=no'
      )
    }
  }
}

LeftSide.propTypes = {
  leftSideCollapsed: PropTypes.bool.isRequired,
  handleToggleLeftSideCollapse: PropTypes.func.isRequired
}

const mapState = state => ({
  leftSideCollapsed: state.blocks_leftSide_reducer.leftSideCollapsed
})

const mapDispatch = dispatch => ({
  handleToggleLeftSideCollapse() {
    dispatch(action.toggleLeftSideCollapse())
  }
})

export default connect(mapState, mapDispatch)(LeftSide)
