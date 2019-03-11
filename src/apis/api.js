/**
 * Api API
 * get 获取
 * delete 删除
 * put 编辑
 * post 新增
 * */
import { ajax } from './ajax'

export const getApiListAPI = (params = {}) => ajax({ url: '/apis', method: 'get', params: params })
export const getApiAPI = (apiId) => ajax({ url: '/apis/' + apiId, method: 'get' })
export const newApiAPI = (data = {}) => ajax({ url: '/apis', method: 'post', data: data })
export const editApiAPI = (data = {}) => ajax({ url: '/apis', method: 'put', data: data })
export const deleteApiAPI = (apiId) => ajax({ url: '/apis/' + apiId, method: 'delete' })
