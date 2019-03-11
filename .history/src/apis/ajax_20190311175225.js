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

request.interceptors.response.use((res) => {
  if (res.data.status === 401) {
    message.error(res.data.message)
    history.push('/login')
  }
  return res
}, (error) => {
  console.log('----catch--err-----', err.message)
  return Promise.reject(error)
})

// 将所有的错误放到catch中处理
export function ajax(options) {
  return request(options).then((res) => {
    return res
  }).catch((err) => {
    if (err.status == 504||err.response.status == 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (err.response.status == 403) {
      Message.error({message: '权限不足,请联系管理员!'});
    }else {
      Message.error({message: '未知错误!'});
    }
    console.log('catch--err-----', err.message)
    message.error(err.message)
    return err
  })
}
