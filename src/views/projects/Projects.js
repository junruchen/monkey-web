import React from 'react'
import queryString from  'query-string'
import classNames from 'classnames'
import {NavLink} from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './Projects.styl'

import Dropdown from '@/components/dropdown/Dropdown'
import ProjectItem from './projectComponents/ProjectCard'
import Pagination from '@/components/pagination/Pagination'

class Projects extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 24,
      projectList: [],
      params: {
        start: 0,
        limit: 2,
        search: '',
        desc: 'True',
        order: 'ctime', // ctime name
        type: 'all' // mine all
      },
      sortOptions: [
        {
          label: '按照创建时间逆序排序',
          order: 'ctime',
          desc: 'True'
        },
        {
          label: '按照创建时间正序排序',
          order: 'ctime',
          desc: 'False'
        },
        {
          label: '按照项目名称逆序排序',
          order: 'name',
          desc: 'True'
        },
        {
          label: '按照项目名称正序排序',
          order: 'name',
          desc: 'False'
        }
      ]
    }
  }

  componentDidMount () {
    this.getProjects()
  }

  componentDidUpdate (prevProps) {
    let curSearch = this.props.location.search
    let prevSearch = prevProps.location.search
    if (curSearch !== prevSearch) {
      this.getProjects()
    }
  }

  getProjects = (params) => {
    let urlParams = params || this.state.params
    let curSearch = queryString.parse(this.props.location.search)
    urlParams.type = (curSearch.type && curSearch.type === 'mine') ? 'mine' : 'all'
    console.log('projects列表页根据 params 请求接口', urlParams)
    if (curSearch.type && curSearch.type === 'mine') {
      // type=mine 我的项目
      this.setState({
        projectList: [
          {
            id: 1,
            name: 'Monkey API',
            context: '/monkey',
            apis: 20,
            users: 5,
            logo: '',
            ctime: '三天前'
          }]
      })
    } else {
      this.setState({
        projectList: [
          {
            id: 1,
            name: 'Monkey API',
            context: '/monkey',
            apis: 20,
            users: 5,
            logo: '',
            ctime: '三天前'
          },
          {
            id: 2,
            name: '掘金项目',
            context: '/juejin',
            apis: 126,
            users: 25,
            logo: 'https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg',
            ctime: '两天前'
          },
          {
            id: 3,
            name: '百度',
            context: '/baidu',
            apis: 1436,
            users: 30,
            logo: 'https://www.baidu.com/img/baidu_jgylogo3.gif',
            ctime: '两年前'
          }]
      })
    }
  }

  setParams = (type, val) => {
    let params = this.state.params
    params.start = type === 'start' ? val : 0
    if (type === 'sort') {
      params.desc = val.desc
      params.order = val.order
    } else {
      params[type] = val
    }
    this.setState({
      params: params
    })
    if (type !== 'search') this.getProjects(params)
  }

  search = (e) => {
    if (e.keyCode === 13) {
      this.getProjects()
    }
  }

  render () {
    return (
      <div className="container">
        <div styleName="listFilterBox">
          <div className={classNames({'active': this.state.params.search})} styleName="listSearchBox">
            <input styleName="listSearchInput"
                   type="text"
                   placeholder="支持名称、context搜索"
                   value={this.state.params.search}
                   onChange={e => this.setParams('search', e.target.value)}
                   onKeyUp={this.search}/>
            <i className="icon-m-search" styleName="listSearchIcon"></i>
          </div>
          <Dropdown
            isSelectBox={true}
            styleName="listSortBox"
            onChoseItem={this.setParams}
            dorpmenuBtn={
              <i className="icon-m-sort" styleName="listSortIcon"></i>
            }
            list={this.state.sortOptions}
            defaultValue={this.state.sortOptions[0]}
          />
          <button className="btn link-btn">
            <NavLink to="/new-project">创建新项目</NavLink>
          </button>
        </div>
        <div className="projects-box">
          {this.state.projectList.map((item) =>
            <ProjectItem project={item} key={item.id}/>
          )}
        </div>
        { this.state.count > 0 && Math.ceil(this.state.count / this.state.params.limit) > 1 &&
        <h2>
          <Pagination
            count={this.state.count}
            limit={this.state.params.limit}
            onStartChange={this.setParams}
          />
        </h2>
        }
      </div>
    )
  }
}

export default CSSModules(Projects, styles)