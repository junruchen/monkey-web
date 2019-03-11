/**
 * System API
 * get 获取
 * delete 删除
 * put 编辑
 * post 新增
 * */
import { ajax } from './ajax'

export const loginAPI = (data = {}) => ajax({ url: '/login', method: 'post', data: data })
export const logoutAPI = () => ajax({ url: '/logout', method: 'get' })
export const getLoginUserAPI = (params = {}) => ajax({ url: '/user_info', method: 'get', params: params })
