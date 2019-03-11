import { getLoginUserAPI } from '@/apis'
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

export function getUserDetails() {
  return function (dispatch) {
    getLoginUserAPI().then((res) => {
      console.log('then-----', res)
      dispatch({ type: 'CHANGE_USER', userInfo: res.data.result })
    }).catch(() => {
      dispatch({ type: 'CHANGE_USER', userInfo: null })
    })
  }
}
