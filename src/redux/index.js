import {
  createStore,
  combineReducers,
  applyMiddleware
} from 'redux'

import thunk from 'redux-thunk'

/**
 * store包含：
 * getState：获取当前页面状态数据树，即store中的state
 * dispatch：派发action
 * subscribe：订阅页面数据状态，即store中state的变化
 * replaceReducer
 * 
 * 当有多个无关联的数据时，可拆分reducer
 * */

// 记录当前登录用户信息
const userInfo = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_USER':
      // 用于修改用户信息
      return action.userInfo
    default:
      return state
  }
}

// 记录是否更新项目信息。当添加、删除API时，更新project图表信息
const resetProjectChart = (state = false, action) => {
  switch (action.type) {
    case 'RESET':
      return action.resetProjectChart
    default:
      return state
  }
}

// 记录当前访问项目信息
const projectInfo = (state = null, action) => {
  switch (action.type) {
    case 'CHANGE_PROJECT':
      return action.projectInfo
    default:
      return state
  }
}

// 合并reducer
const fianlReducer = combineReducers({ userInfo, resetProjectChart, projectInfo })

const store = createStore(fianlReducer, applyMiddleware(thunk))

export { store }