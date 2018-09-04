import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './ProjectCard.styl'

/**
 * ProjectItem 项目卡片组件
 * - project 项目基本信息
 * */

class ProjectItem extends React.Component {
  goInfo = () => {
    let id = this.props.project.id
    let path = '/projects/' + id
    this.props.history.push(path)
  }

  render () {
    let project = this.props.project
    let bgStyle
    if (project.logo) {
      bgStyle = {
        backgroundImage: 'url(' + project.logo + ')'
      }
    }
    return (
      <div styleName="projectItem" onClick={this.goInfo}>
        <div styleName="projectLogo" style={bgStyle}></div>
        <h4 className="nowrap" styleName="projectContext">{project.context}</h4>
        <h5 className="nowrap">{project.name}</h5>
        <div styleName="projectInfo">
          <h6><i className="icon-m-users"></i><span>{project.users}</span></h6>
          <h6><i className="icon-m-apis"></i><span>{project.apis}</span></h6>
          <h6 styleName="projectCtime">{project.ctime}</h6>
        </div>
      </div>
    )
  }
}

ProjectItem.propTypes = {
  project: PropTypes.any
}

export default withRouter(CSSModules(ProjectItem, styles))