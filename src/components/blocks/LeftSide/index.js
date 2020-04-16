import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import {
	ApiOutlined,
	AppstoreOutlined,
	DashboardOutlined,
	EyeOutlined,
	ForkOutlined,
	GlobalOutlined,
	HighlightOutlined,
	MenuUnfoldOutlined,
	PieChartOutlined,
	PlayCircleOutlined,
	SlidersOutlined
} from '@ant-design/icons'

import { Layout, Menu } from 'antd'
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
							<DashboardOutlined />
							<span>首页</span>
						</Link>
					</Menu.Item>
					<SubMenu
						title={
							<span>
								<MenuUnfoldOutlined />
								<span>组件演示</span>
							</span>
						}
					>
						<Menu.Item key="qbcharts">
							<Link to="/app/qbcharts">
								<EyeOutlined />
								<span>QbCharts</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="intersection">
							<Link to="/app/intersection">
								<ForkOutlined />
								<span>Intersection</span>
							</Link>
						</Menu.Item>

						<Menu.Item key="echarts">
							<Link to="/app/echarts">
								<PieChartOutlined />
								<span>Echarts</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="axios">
							<Link to="/app/axios">
								<ApiOutlined />
								<span>Axios</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="fabric">
							<Link to="/app/fabric">
								<HighlightOutlined />
								<span>Fabric</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="video">
							<Link to="/app/video">
								<PlayCircleOutlined />
								<span>Video</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="openlayer">
							<Link to="/app/openlayer">
								<GlobalOutlined />
								<span>OpenLayer</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="websocket">
							<Link to="/app/websocket">
								<SlidersOutlined />
								<span>Websocket</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="fortawesome">
							<Link to="/app/fortawesome">
								<AppstoreOutlined />
								<span>FortAwesome</span>
							</Link>
						</Menu.Item>

						<Menu.Item key="keyintersection">
							<Link to="/app/keyintersection">
								<AppstoreOutlined />
								<span>KeyIntersection</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="keyroad">
							<Link to="/app/keyroad">
								<AppstoreOutlined />
								<span>KeyRoad</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="datepickerdemo">
							<Link to="/app/datepickerdemo">
								<AppstoreOutlined />
								<span>DatePickerDemo</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="tabledemo">
							<Link to="/app/table">
								<AppstoreOutlined />
								<span>TableDemo</span>
							</Link>
						</Menu.Item>
					</SubMenu>
				</Menu>
			</Sider>
		)
	}

	handleMenuSelect = (item) => {
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

const mapState = (state) => ({
	leftSideCollapsed: state.blocks_leftSide_reducer.leftSideCollapsed
})

const mapDispatch = (dispatch) => ({
	handleToggleLeftSideCollapse() {
		dispatch(action.toggleLeftSideCollapse())
	}
})

export default connect(mapState, mapDispatch)(LeftSide)
