import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
import './assets/css/index.styl'

import Header from './components/header/Header'
import Menu from './components/menu/Menu'

import Project from './views/project/Project'
import API from './views/api/API'
import User from './views/user/User'

const BasicExample = () => (
  <Router>
    <div className="main-container uf uf-col">
      <Header/>
      <div className="container uf uf-f1">
        <Menu/>
        <Route exact path="/" component={Project}/>
        <Route path="/apis" component={API}/>
        <Route path="/users" component={User}/>
      </div>
    </div>
  </Router>
)

export default BasicExample
