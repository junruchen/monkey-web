import React from 'react'
import {NavLink} from 'react-router-dom'
import './Menu.styl'

const menuList = [
  {
    path: '/',
    icon: 'icon-projects',
    title: '项目管理',
    exact: true
  }, {
    path: '/apis',
    icon: 'icon-apis',
    title: 'API管理'
  }, {
    path: '/users',
    icon: 'icon-users',
    title: '用户管理'
  }
]

const Menu = () => {
  return (
    <ul className="monkey-menu">
      <input type="checkbox" className="toggle-menu-checkbox"/>
      <li
        className="toggle-menu-item">
        <i className="icon-toggle-menu"></i>
      </li>
      {menuList.map((item, idx) =>
        <li
          key={idx}
          className="menu-item">
          <NavLink
            to={item.path}
            exact={item.exact}
            activeClassName="active-menu-item"
          ><i className={item.icon}></i><span>{item.title}</span></NavLink>
        </li>
      )}
    </ul>
  )
}

export default Menu