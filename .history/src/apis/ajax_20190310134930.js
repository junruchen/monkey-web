import axios from 'axios'
import history from '@/history'
import { message } from 'antd'

import { getCookiesObj } from '@/utils'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

const BASEURL = '/api'

export const request = axios.create({
  baseURL: BASEURL,
  headers: {
    'x-csrf-token': getCookiesObj().csrfToken
  }
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
    console.log('throw res error----->', res)
    throw new Error(res.data.message)
  }).catch((err) => {
    console.log('throw error----->', err)
    message.error(err.message)
    return Promise.reject(err)
  })
}
