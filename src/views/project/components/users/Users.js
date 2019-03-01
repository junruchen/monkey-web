import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Users.module.scss'

class Users extends React.Component {
  render () {
    return (
      <div styleName="usersContainer">
        <div className="uf">
          <h5 styleName="addUserLabel">添加用户</h5>
          <div className="uf-f1" styleName="inputBox">
            <input type="text"/>
          </div>
          <button className="btn small">添加</button>
        </div>
        <h6 styleName="addUserDes">新添加的用户，将拥有除用户管理外所有权限，可操作项目、API等。</h6>
      </div>
    )
  }
}

export default CSSModules(Users, styles)