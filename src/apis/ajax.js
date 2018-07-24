import axios from 'axios'

export const BASEURL = '/api/'

export function ajax (options) {
  let config = {
    url: options.url,
    method: options.method || 'get',
    params: options.params || {},
    data: options.data || {}
  }
  axios.interceptors.response.use((response) => {
    return response
  }, (error) => {
    return Promise.reject(error)
  })
  return axios(config).catch((e) => {
    console.log('异常--->', e)
  })
}
