import React from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import styles from './Apis.module.scss'

import {
  Input,
  Button,
  message,
  Pagination,
  Spin
} from 'antd'

import ApiInfo from './ApiInfo'
import ApiAdd from './ApiAdd'

import { getApiListAPI, deleteApiAPI } from '@/apis'

const Search = Input.Search
const ButtonGroup = Button.Group

class Apis extends React.Component {
  constructor(props) {
    super(props)
    const projectId = Number(this.props.match.params.id)
    this.state = {
      apiList: [],
      activeId: '',
      count: 0,
      init: true,
      currentpage: 1,
      loading: false,
      noData: false,
      params: {
        projectId: projectId,
        start: 0,
        limit: 10,
        search: '',
        desc: 'True', // 按照名称 正逆序
        type: 'mine' // mine all
      }
    }
  }

  componentDidMount() {
    this.getApis()
  }

  getApis = (params) => {
    const init = this.state.init
    this.setState({
      loading: init ? true : false
    })
    let urlParams = params || this.state.params
    getApiListAPI(urlParams).then((res) => {
      this.setState({
        loading: false
      })
      if (res.data.status === 200) {
        let result = res.data.result
        const activeId = result.list.length > 0 ? result.list[0].id : null
        this.setState({
          init: false,
          activeId: activeId,
          count: result.count,
          apiList: result.list,
          noData: result.count === 0
        })
      } else {
        message.error(res.data.message)
      }
    })
  }

  setParams = (type, val) => {
    let params = this.state.params
    let start = 0
    let currentpage = this.state.currentpage
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
    this.getApis(params)
  }

  // 打开新建API页面
  openAddApiCpn = () => {
    this.setState({
      activeId: ''
    })
  }

  // 添加API成功后的回调 以及 获取单个API详情
  getApi = (id, reset) => {
    this.setState({
      activeId: id,
      editApiInfo: null
    })
    if (reset) {
      this.getApis()
      this.props.resetApiCounts(true)
    }
  }

  // 编辑api后的重置
  resetApi = (data) => {
    const list = this.state.apiList
    list.forEach((api) => {
      if (api.id === data.id) {
        api.method = data.method
        api.path = data.path
        api.name = data.name
        return
      }
    })
    this.setState({
      editApiInfo: null
    })
  }

  // 指定被编辑的API
  editApi = (apiInfo) => {
    this.setState({
      editApiInfo: apiInfo
    })
  }


  // 删除API
  deleteApi = (id, e) => {
    e.stopPropagation()
    deleteApiAPI(id).then((res) => {
      if (res.data.status === 200) {
        message.success('删除成功')
        this.getApis()
        this.props.resetApiCounts(true)
      } else {
        message.error(res.data.message)
      }
    })
  }

  render() {
    return (
      <div className="uf" styleName="apisContainer">
        <div className="uf" styleName="apisListContent">
          <div styleName="apisFilterBox">
            <Search
              styleName="apisFilterSearch"
              placeholder="支持名称搜索"
              onSearch={value => this.setParams('search', value)}
              size="small"
            />
            <Button size="small"
              type="primary"
              icon="plus"
              onClick={this.openAddApiCpn} />
          </div>
          <div styleName="apisScreeningBox">
            <h6 styleName={classNames('screeningItem', { 'active': this.state.params.type === 'mine' })}
              onClick={e => this.setParams('type', 'mine')}>我的</h6>
            <h6 styleName={classNames('screeningItem', { 'active': this.state.params.type === 'all' })}
              onClick={e => this.setParams('type', 'all')}>全部</h6>
            <ButtonGroup styleName="apisScreeningSortBtns">
              <Button size="small" styleName={this.state.params.desc ? 'active' : ''}
                onClick={e => this.setParams('desc', true)}>
                <i className="icon-m-sort-desc"></i>
              </Button>
              <Button size="small" styleName={!this.state.params.desc ? 'active' : ''}
                onClick={e => this.setParams('desc', false)}>
                <i className="icon-m-sort-asc"></i>
              </Button>
            </ButtonGroup>
          </div>
          {this.state.loading && <Spin className="loading-box" tip="正在加载..." />}
          {this.state.noData && !this.state.loading && <div className="nodata-box">暂无数据</div>}
          <div styleName="apisListBox">
            {this.state.apiList.map((item) =>
              <div key={item.id}
                className="uf"
                styleName={classNames('apiItem', item.method + 'Api', { 'active': this.state.activeId === item.id })}
                onClick={e => this.getApi(item.id)}>
                <h6 styleName={classNames('apiListMethod', item.method + 'ApiMethod')}>{item.method.toUpperCase()}</h6>
                <h6 className="uf-f1 nowrap" styleName="apiName">
                  {item.name}
                  <i className="icon-m-trash"
                    onClick={e => this.deleteApi(item.id, e)}></i>
                </h6>
              </div>
            )}
          </div>
          <Pagination
            hideOnSinglePage
            size="small"
            styleName="apisPaginationBox"
            total={this.state.count}
            pageSize={this.state.params.limit}
            current={this.state.currentpage}
            defaultCurrent={1}
            onChange={val => this.setParams('curPage', val)} />
        </div>
        {(this.state.activeId && !this.state.editApiInfo) && (
          <ApiInfo apiId={this.state.activeId} onDelApi={this.deleteApi} onEditApi={this.editApi} />
        )}
        {((!this.state.activeId && !this.state.loading) || this.state.editApiInfo) && (
          <ApiAdd
            onAddApi={this.getApi}
            onResetApi={this.resetApi}
            projectId={this.props.match.params.id}
            editApiInfo={this.state.editApiInfo} />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    resetApiCounts: (val) => {
      dispatch({ type: 'RESET', resetProjectChart: val })
    }
  }
}

Apis = connect(null, mapDispatchToProps)(CSSModules(Apis, styles, { allowMultiple: true }))

export default Apis