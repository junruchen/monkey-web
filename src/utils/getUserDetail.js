import { message } from 'antd'
import { getLoginUserAPI } from '@/apis'

export function getUserDetails () {
  return function (dispatch) {
    getLoginUserAPI().then((res) => {
      if (res.data.status === 200) {
        dispatch({ type: 'CHANGE_USER', userInfo: res.data.result })
      } else {
        message.error(res.data.message)
        dispatch({ type: 'CHANGE_USER', userInfo: null })
      }
    })
  }
}
