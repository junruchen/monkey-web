import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import { NavLink, withRouter } from 'react-router-dom'
import {
  Popover,
  Avatar
} from 'antd'
import styles from './Header.module.scss'
import { logoutAPI } from '@/apis'

class Header extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object
  }

  isMineProjects = (match, location) => {
    return location.pathname === '/projects' && location.search === '?type=mine'
  }

  isAllProjects = (match, location) => {
    return location.pathname === '/projects' && location.search === ''
  }

  lagout = () => {
    // 调用退出登录接口
    logoutAPI().then(() => {
      this.props.history.push('/login')
    })
  }

  render() {
    const userInfo = this.props.userInfo || {}
    const headerMenu = (
      <div styleName="headerUserMenu">
        <h3>{userInfo.name}</h3>
        {userInfo.email &&
          <div styleName="headerUserEmail">{userInfo.email}</div>
        }
        <div styleName="headerUserSetting" className="uf">
          <NavLink to="/log"><i className="icon-m-log"></i><span>日志</span></NavLink>
          <NavLink className="uf-f1" to="/usercenter"><i
            className="icon-m-setting"></i><span>设置</span></NavLink>
          <a onClick={this.lagout} href="##"><i className="icon-m-logout"></i><span>退出</span></a>
        </div>
      </div>
    )
    return (
      <header styleName="headerContainer">
        <div styleName="headerContent">
          <div styleName="headerLogo"></div>
          <div styleName="headerMenus">
            <NavLink
              exact
              styleName="headerMenuItem"
              to="/projects?type=mine"
              activeClassName="headerMenuItemActive"
              isActive={this.isMineProjects}
            >我的项目</NavLink>
            <NavLink
              exact
              styleName="headerMenuItem"
              to="/projects"
              activeClassName="headerMenuItemActive"
              isActive={this.isAllProjects}
            >全部项目</NavLink>
          </div>
          <Popover placement="bottomRight" content={headerMenu} trigger="hover" styleName="headerUser">
            <Avatar icon="user" src={userInfo.avatar} />
          </Popover>
        </div>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

Header = connect(mapStateToProps)(CSSModules(Header, styles))

export default withRouter(Header)