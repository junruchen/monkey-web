import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import { Provider } from 'react-redux'

import Home from '@/views/Home.js'

import { store } from '@/redux'

/**
 * forceRefresh 在导航的过程中整个页面是否会刷新，一般在不支持 HTML5 history API 的浏览器中使用此功能。
 */

const supportsHistory = 'pushState' in window.history

class Basic extends React.Component {
  render () {
    return (
      <Router forceRefresh={!supportsHistory}>
        <Provider store={store}>
          <Route path="/" component={Home}/>
        </Provider>
      </Router>
    )
  }
}

export default Basic
