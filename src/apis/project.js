/**
 * Project API
 * get 获取
 * delete 删除
 * put 编辑
 * post 新增
 * */
import { ajax } from './ajax'

export const getProjectListAPI = (params = {}) => ajax({ url: '/projects', method: 'get', params: params })
export const getProjectAPI = (projectId) => ajax({ url: '/projects/' + projectId, method: 'get' })
export const getProjectApiCountsAPI = (projectId) => ajax({ url: '/projects/apiCounts/' + projectId, method: 'get' })
export const newProjectAPI = (data = {}) => ajax({ url: '/projects', method: 'post', data: data })
