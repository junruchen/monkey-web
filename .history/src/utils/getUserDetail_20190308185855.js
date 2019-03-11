import { message } from 'antd'
import { getLoginUserAPI } from '@/apis'

export function getUserDetails() {
  return function (dispatch) {
    getLoginUserAPI().then((res) => {
      dispatch({ type: 'CHANGE_USER', userInfo: res.data.result })
    }).catch(() => {
      dispatch({ type: 'CHANGE_USER', userInfo: null })
    })
  }
}
