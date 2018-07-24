import React from 'react'
// test axios
import {getUserListAPI} from '../../apis/index'

getUserListAPI().then((res) => {
  if (res.data.status === 200) {
    console.log(res.data.result)
  } else {
    console.log(res.data.message)
  }
  return null
})

const User = () => {
  return (
    <div className="uf-f1 wrapper">
      User content
    </div>
  )
}

export default User