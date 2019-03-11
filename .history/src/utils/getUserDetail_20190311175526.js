import { getLoginUserAPI } from '@/apis'

export function getUserDetails() {
  return function (dispatch) {
    getLoginUserAPI().then((res) => {
      console.log('then-----', res)
      if (res.data && res.data.status === 200) {
        console.log('then-----', res)
        dispatch({ type: 'CHANGE_USER', userInfo: res.data.result })
        return
      }
      dispatch({ type: 'CHANGE_USER', userInfo: null })
      console.log('err-----', res)
    }).catch((e) => {
      console.log('catch-----', e)
      
    })
  }
}
