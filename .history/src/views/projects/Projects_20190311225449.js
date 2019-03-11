import React from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import queryString from 'query-string'
import CSSModules from 'react-css-modules'
import {
  Input,
  Button,
  Pagination,
  Spin
} from 'antd'
import styles from './Projects.module.scss'

import { getProjectListAPI } from '@/apis'
import ProjectItem from './ProjectCard'

import resetUnMounted from '@/components/resetUnMounted'

const Search = Input.Search
const ButtonGroup = Button.Group

class Projects extends React.Component {
  constructor() {
    super()
    this.state = {
      count: 0,
      init: true,
      loading: false,
      noData: false,
      currentpage: 1,
      params: {
        start: 0,
        limit: 12,
        search: '',
        desc: 'true',
        type: 'all' // mine all
      },
      projectList: []
    }
  }

  componentDidMount() {
    this._isMounted = true
    console.log(this.props, '=======', this)
    this.getProjects()
  }

  componentDidUpdate(prevProps) {
    let curSearch = this.props.location.search
    let prevSearch = prevProps.location.search
    if (curSearch !== prevSearch) {
      let params = this.initParams()
      this.getProjects(params)
    }
  }

  componentWillUnmount = () => {
    this.setState = () => {
      return
    }
  }

  initParams = () => {
    let params = this.state.params
    params.start = 0
    params.limit = 12
    params.search = ''
    params.desc = 'true'
    this.setState({
      params: params
    })
    return params
  }

  getProjects = (params) => {
    const init = this.state.init
    this.setState({
      loading: init ? true : false
    })
    let urlParams = params || this.state.params
    let curSearch = queryString.parse(this.props.location.search)
    urlParams.type = (curSearch.type && curSearch.type === 'mine') ? 'mine' : 'all'
    getProjectListAPI(urlParams).then((res) => {
      // if (!this._isMounted) return 
      this.setState({
        loading: false
      })
      if (res.data && res.data.status === 200) {
        let result = res.data.result
        this.setState({
          init: false,
          count: result.count,
          projectList: result.list,
          noData: result.count === 0
        })
      }
    })
  }

  setParams = (type, val) => {
    let params = this.state.params
    let currentpage = this.state.currentpage
    let start = 0
    if (type === 'curPage') {
      start = (val - 1) * this.state.params.limit
      currentpage = val
    }
    params[type] = val
    params.start = start
    this.setState({
      currentpage: currentpage,
      params: params
    })
    this.getProjects(params)
  }

  render() {
    return (
      <div className="container">
        <div styleName="filterBox">
          <Search
            styleName="searchBox"
            placeholder="支持名称、context搜索"
            onSearch={value => this.setParams('search', value)}
            style={{ width: 200 }}
          />
          <div styleName="sortBox">
            <ButtonGroup styleName="sortBtns">
              <Button type={this.state.params.desc ? 'primary' : ''} onClick={e => this.setParams('desc', true)}>
                <i className="icon-m-sort-desc"></i>
              </Button>
              <Button type={!this.state.params.desc ? 'primary' : ''} onClick={e => this.setParams('desc', false)}>
                <i className="icon-m-sort-asc"></i>
              </Button>
            </ButtonGroup>
            <Button type="primary" styleName="newProjectBtn">
              <NavLink to="/projects/new">创建新项目</NavLink>
            </Button>
          </div>
        </div>
        <div className="projects-box">
          {this.state.projectList.map((item) =>
            <ProjectItem project={item} key={item.id} />
          )}
        </div>
        <Pagination
          hideOnSinglePage
          total={this.state.count}
          showTotal={total => `共 ${total} 条`}
          pageSize={this.state.params.limit}
          current={this.state.currentpage}
          defaultCurrent={this.state.currentpage}
          onChange={val => this.setParams('curPage', val)}
        />
        {this.state.loading && <Spin size="large" className="loading-box" tip="正在加载..." />}
        {this.state.noData && !this.state.loading && <div className="nodata-box">暂无数据</div>}
      </div>
    )
  }
}

export default resetUnMounted(withRouter(CSSModules(Projects, styles)))
