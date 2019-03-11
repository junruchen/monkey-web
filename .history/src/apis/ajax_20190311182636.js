import axios from 'axios'
import history from '@/history'
import { message } from 'antd'

import { getCookiesObj } from '@/utils'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
const BASEURL = '/api'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

export const request = axios.create({
  baseURL: BASEURL,
  headers: {
    'x-csrf-token': getCookiesObj().csrfToken
  }
})

axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.cancelToken = source.token
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
})

request.interceptors.response.use((res) => {
  if (res.data.status === 401) {
    // 用户未登录
    history.push('/login')
    console.log('---', source)
    source.cancel('Operation canceled by the user.')
  }
  return res
}, (error) => {
  return Promise.reject(error)
})

// 将所有的错误放到catch中处理
export function ajax(options) {
  return request(options).then((res) => {
    return res
  }).catch((err) => {
    message.error(err.message)
    return err
  })
}
