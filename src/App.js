import React from 'react'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Header from '@/components/header/Header'
import Introduce from '@/views/introduce/Introduce'
import Projects from '@/views/projects/Projects'
import Project from '@/views/project/Project'
import Logs from '@/views/logs/Logs'
import Usercenter from '@/views/usercenter/Usercenter'
import Login from '@/views/login/Login'
import NewProject from '@/views/newProject/NewProject'

const BasicExample = () => (
  <Router
    basename="/">
    <div className="main-container uf uf-col">
      <Header/>
      <div className="main-content uf-f1">
        <Route exact path="/" component={Introduce}/>
        <Route exact path="/projects" component={Projects}/>
        <Route path="/new-project" component={NewProject}/>
        <Route path="/projects/:id" component={Project}/>
        <Route path="/logs" component={Logs}/>
        <Route path="/usercenter" component={Usercenter}/>
        <Route path="/login" component={Login}/>
      </div>
    </div>
  </Router>
)

export default BasicExample
