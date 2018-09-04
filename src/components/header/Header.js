import React from 'react'
import {
  NavLink,
  withRouter
} from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './Header.styl'

import Dropdown from '@/components/dropdown/Dropdown'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.state = {closeDropMenu: false}
    document.addEventListener('click', this.changeIsToggleState, false)
  }

  isMineProjects = (match, location) => {
    return location.pathname === '/projects' && location.search === '?type=mine'
  }

  isAllProjects = (match, location) => {
    return location.pathname === '/projects' && location.search === ''
  }

  goIntroduce = () => {
    // 前往monkey介绍页面
    this.props.history.push('/')
  }

  lagout = () => {
    // 调用退出登录接口
    this.props.history.push('/login')
  }

  render () {
    return (
      <header styleName="monkeyHeaderContainer">
        <div styleName="monkeyHeader">
          <div styleName="monkeyHeaderLogo" onClick={this.goIntroduce}></div>
          <div styleName="monkeyHeaderMenu">
            <NavLink
              styleName="headerMenuItem"
              exact
              to="/projects?type=mine"
              activeClassName="active-header-menu-item"
              isActive={this.isMineProjects}
            >我的项目</NavLink>
            <NavLink
              styleName="headerMenuItem"
              exact
              to="/projects"
              activeClassName="active-header-menu-item"
              isActive={this.isAllProjects}
            >全部项目</NavLink>
          </div>
          <Dropdown
            styleName="monkeyHeaderUser"
            dorpmenuBtn={
              <i styleName="headerUserIcon"></i>
            }
            dropmenuList={
              <div className="dropmenu" styleName="headerUserMenu">
                <h3>Junru</h3>
                <h6 styleName="headerUserEmail">chenjunru05@enmotech.com</h6>
                <div styleName="headerUserSetting" className="uf">
                  <NavLink to="/logs"><i className="icon-m-log"></i><span>日志</span></NavLink>
                  <NavLink className="uf-f1" to="/usercenter"><i
                    className="icon-m-setting"></i><span>设置</span></NavLink>
                  <a onClick={this.lagout}><i className="icon-m-logout"></i><span>退出</span></a>
                </div>
              </div>
            }
          />
        </div>
      </header>
    )
  }
}

export default withRouter(CSSModules(Header, styles))