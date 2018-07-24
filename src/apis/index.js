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

export const getUserListAPI = (params = {}) => ajax({url: BASEURL + 'user', method: 'get', params: params})