import React from 'react'
import { Redirect, HashRouter, Route, Switch } from 'react-router-dom'
import { Layout, LocaleProvider, Spin } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { Provider as ReduxProvider } from 'react-redux'

import store from './store'
import LeftSide from '@components/blocks/LeftSide'
import Header from '@components/blocks/Header'
import AppRoute from '@common/AppRoute'
import styles from './App.module.less'
import Constant from '@common/Constant'

moment.locale('zh-cn')

Spin.setDefaultIndicator(<div className={styles.spiner}>Loading...</div>)

class App extends React.Component {
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <ReduxProvider store={store}>
          <HashRouter basename={Constant.appBasePath}>
            <Layout>
              <Switch>
                {/* <Route
                  exact
                  path="/"
                  component={Login}
                /> */}
                <Route path="/app" component={AppContent} />
                <Route
                  render={() => (
                    <Redirect to={{ pathname: '/app/dashboard' }} />
                  )}
                />
              </Switch>
            </Layout>
          </HashRouter>
        </ReduxProvider>
      </LocaleProvider>
    )
  }
}

class AppContent extends React.Component {
  // componentWillMount () {
  //   const token = sessionStorage.getItem(Constant.storageKeys.token)
  //   if (!token) {
  //     AppHistory.push('/')
  //   }
  // }

  render() {
    return (
      <Layout>
        <LeftSide />
        <Layout className={styles.rightSide}>
          <Header />
          <AppRoute />
        </Layout>
      </Layout>
    )
  }
}

export default App
