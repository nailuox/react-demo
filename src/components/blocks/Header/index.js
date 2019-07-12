import React from 'react'
import PropTypes from 'prop-types'
import {
  Layout,
  Icon,
  Avatar
} from 'antd'
import { connect } from 'react-redux'

import { action as leftSideAction } from '@components/blocks/LeftSide/store'
import { action } from './store'

import Constant from '@common/Constant'
import AppHistory from '@common/AppHistory'
import styles from './index.module.less'
import { clearInterval } from 'timers';

const { Header } = Layout

class AppHeader extends React.Component {

  componentDidMount() {
    this.timer = setInterval(this.props.startRefreshTime, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  render() {
    const {
      collapsed,
      handleToggleLeftSideCollapse,
      time
    } = this.props

    return (
      <Header className={styles.header}>
        <Icon
          className={styles.trigger}
          type={collapsed ? 'menu-unfold' : 'menu-fold'}
          onClick={handleToggleLeftSideCollapse}
        />
        <span className={styles.title}>react示例项目</span>
        <div className={styles.usernameBox}>
          <Avatar icon="user" />
          <span>Admin</span>
          <Icon type="logout" onClick={this.logout} />
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


const mapState = state =>({
  time: state.blocks_header_reducer.time
})

const mapDispatch = dispatch => ({
  handleToggleLeftSideCollapse() {
    dispatch(leftSideAction.toggleLeftSideCollapse())
  },
  startRefreshTime() {
    dispatch(action.refreshTime())
  }
})

export default connect(
  mapState,
  mapDispatch
)(AppHeader)
