/**
 * API
 * get 获取
 * delete 删除
 * put 编辑
 * post 新增
 * */
import {
  ajax,
  BASEURL
} from './ajax'

// system
export const loginAPI = (data = {}) => ajax({ url: BASEURL + 'login', method: 'post', data: data })
export const logoutAPI = () => ajax({ url: BASEURL + 'logout', method: 'get' })
export const getLoginUserAPI = (params = {}) => ajax({ url: BASEURL + 'user_info', method: 'get', params: params })

// project
export const getProjectListAPI = (params = {}) => ajax({ url: BASEURL + 'projects', method: 'get', params: params })
export const getProjectAPI = (projectId) => ajax({ url: BASEURL + 'projects/' + projectId, method: 'get' })
export const getProjectApiCountsAPI = (projectId) => ajax({ url: BASEURL + 'projects/apiCounts/' + projectId, method: 'get' })
export const newProjectAPI = (data = {}) => ajax({ url: BASEURL + 'projects', method: 'post', data: data })

// api
export const getApiListAPI = (params = {}) => ajax({ url: BASEURL + 'apis', method: 'get', params: params })
export const getApiAPI = (apiId) => ajax({ url: BASEURL + 'apis/' + apiId, method: 'get' })
export const newApiAPI = (data = {}) => ajax({ url: BASEURL + 'apis', method: 'post', data: data })
export const editApiAPI = (data = {}) => ajax({ url: BASEURL + 'apis', method: 'put', data: data })
export const deleteApiAPI = (apiId) => ajax({ url: BASEURL + 'apis/' + apiId, method: 'delete' })