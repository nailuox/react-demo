import React from 'react'
import PropTypes from 'prop-types'
import {
	LogoutOutlined,
	UserOutlined,
	MenuUnfoldOutlined,
	MenuFoldOutlined
} from '@ant-design/icons'
import { Layout, Avatar } from 'antd'
import { connect } from 'react-redux'

import { action as leftSideAction } from '@components/blocks/LeftSide/store'
import { action } from './store'

import Constant from '@common/Constant'
import AppHistory from '@common/AppHistory'
import styles from './index.module.less'
import { clearInterval } from 'timers'

const { Header } = Layout

class AppHeader extends React.Component {
	componentDidMount() {
		this.timer = setInterval(this.props.startRefreshTime, 1000)
	}

	componentWillUnmount() {
		if (this.timer) clearInterval(this.timer)
	}

	render() {
		const { collapsed, handleToggleLeftSideCollapse, time } = this.props

		return (
			<Header className={styles.header}>
				{/* <LegacyIcon
					className={styles.trigger}
					type={collapsed ? 'menu-unfold' : 'menu-fold'}
					onClick={handleToggleLeftSideCollapse}
				/> */}
				{React.createElement(
					collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
					{
						className: styles.trigger,
						onClick: handleToggleLeftSideCollapse
					}
				)}

				<span className={styles.title}>react示例项目</span>
				<div className={styles.usernameBox}>
					<Avatar icon={<UserOutlined />} />
					<span>Admin</span>
					<LogoutOutlined onClick={this.logout} />
				</div>
				<div className={styles.timeBox}>{time}</div>
			</Header>
		)
	}

	logout = () => {
		sessionStorage.removeItem(Constant.storageKeys.token)
		AppHistory.push('/')
	}
}

AppHeader.propTypes = {
	time: PropTypes.string.isRequired,
	handleToggleLeftSideCollapse: PropTypes.func.isRequired,
	startRefreshTime: PropTypes.func.isRequired
}

const mapState = (state) => ({
	time: state.blocks_header_reducer.time
})

const mapDispatch = (dispatch) => ({
	handleToggleLeftSideCollapse() {
		dispatch(leftSideAction.toggleLeftSideCollapse())
	},
	startRefreshTime() {
		dispatch(action.refreshTime())
	}
})

export default connect(mapState, mapDispatch)(AppHeader)
