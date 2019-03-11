// 解决问题：
// 报错：Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method
// no-op：Can only update a mounted or mounting component. This usually means you called setState, replaceState, or forceUpdate on an unmounted component.
// 对于定时器、事件监听等，组件中可直接在componentWillUnmount中移除
// 对于异步请求的情况，则需要增加一个参数来控制这一情况

import React, { Component } from 'react'

export default (WrappedComponent) => {
  class resetUnMounted extends Component {
    _isMounted = false
    constructor () {
      super()
      this.state = {
        test: '-------'
      }
    }
    componentDidMount () {}
    render () {
      return <WrappedComponent />
    }
  }
  return resetUnMounted
}