import axios from 'axios'
import history from '@/history'
import { message } from 'antd'

import { getCookiesObj } from '@/utils'
const BASEURL = '/api'
const errorMsg = {} // 记录同种错误类型，如果同时出现多次，则仅提示一次错误。如：登录失效时，仅提示一个登录失效 


export const request = axios.create({
  baseURL: BASEURL,
  headers: {
    'x-csrf-token': getCookiesObj().csrfToken
  }
})

request.interceptors.response.use((res) => {
  if (res.data.status === 401) {
    message.error(res.data.message)
    history.push('/login')
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
