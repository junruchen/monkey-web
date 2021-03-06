import axios from 'axios'
import history from '@/history'
import { message } from 'antd'

import { getCookiesObj } from '@/utils'
const BASEURL = '/api'

export const request = axios.create({
  baseURL: BASEURL,
  headers: {
    'x-csrf-token': getCookiesObj().csrfToken
  }
})

request.interceptors.request.use(config=> {
  return config
}, err=> {
  message.error('请求超时')
  return Promise.resolve(err)
})
request.interceptors.response.use((response) => {
  if (response.data.status === 401) {
    history.push('/login')
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

// 将所有的错误放到catch中处理
export function ajax(options) {
  return request(options).then((res) => {
    if (res.data.status === 200) {
      return res
    }
    return Promise.reject(res)
    // throw new Error(res.data.message)
  }).catch((err) => {
    console.log('======>', err)
    message.error(err.message)
    return Promise.reject(err)
  })
}
