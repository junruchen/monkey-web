// 解决问题：
// 【Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method】

import React, { Component } from 'react'

export default (WrappedComponent) => {
  class resetUnMounted extends Component {
    // 可以做很多自定义逻辑
    render () {
      return <WrappedComponent />
    }
  }
  return resetUnMounted
}