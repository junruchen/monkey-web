import axios from 'axios'
import createHistory from 'history/createBrowserHistory'

import { getCookiesObj } from '@/utils'

import { message } from 'antd'

const history = createHistory()

export const BASEURL = '/api/'

export function ajax (options) {
  let csrfToken = getCookiesObj() ? getCookiesObj().csrfToken : ''
  let config = {
    headers: {
      'x-csrf-token': csrfToken
    },
    url: options.url,
    method: options.method || 'get',
    params: options.params || {},
    data: options.data || {}
  }
  axios.interceptors.response.use((response) => {
    if (response.data.status === 401) {
      history.push('/login')
      return response
    } else {
      return response
    }
  }, (error) => {
    return Promise.reject(error)
  })
  return axios(config).catch((e) => {
    message.error('网络异常')
  })
}
