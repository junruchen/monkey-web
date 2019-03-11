import { getLoginUserAPI } from '@/apis'

export function getUserDetails() {
  return function (dispatch) {
    getLoginUserAPI().then((res) => {
      if (res.data && res.data.status === 200) {
        dispatch({ type: 'CHANGE_USER', userInfo: res.data.result })
        return
      }
      dispatch({ type: 'CHANGE_USER', userInfo: null })
    })
  }
}
