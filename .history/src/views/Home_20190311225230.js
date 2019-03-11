import React from 'react'
import {
  Route,
  Switch
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Header from '@/components/header/Header'
import Projects from '@/views/projects/Projects'
import Project from '@/views/project/Project'
import ProjectsNew from '@/views/projects/ProjectNew'
import Dashboard from '@/views/Dashboard'
import { getUserDetails } from '@/utils'

import { getLoginUserAPI } from '@/apis'

import Login from '@/views/sys/login/Login.js'

class Home extends React.Component {
  static propTypes = {
    userInfo: PropTypes.object
  }

  componentDidMount() {
    if (this.props.location.pathname !== '/login' && !this.props.userInfo) {
      // this.props.getUserInfo()
      getLoginUserAPI().then((res) => {
        if (res.data && res.data.status === 200) {
          this.setState({
            user: res.data.result
          })
          return
        }
        this.setState({
          user: null
        })
      })
    }
  }

  render() {
    let pathname = this.props.location.pathname
    // console.log('home-------', pathname)
    return (
      (pathname === '/login' ? <Route exact path="/login" component={Login} />
        : <div className="main-container">
          <Header />
          <Switch>
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/new" component={ProjectsNew} />
            <Route path="/projects/:id" component={Project} />
            <Route component={Dashboard} />
          </Switch>
        </div>)
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch(getUserDetails())
    }
  }
}
const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo
  }
}

Home = connect(mapStateToProps, mapDispatchToProps)(Home)

export default Home
