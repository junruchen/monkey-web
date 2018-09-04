import React from 'react'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import styles from './Apis.styl'

import Dropdown from '@/components/dropdown/Dropdown'
import ApiInfo from './ApiInfo'
import ApiAdd from './ApiAdd'

class Apis extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      apiList: [],
      activeId: '',
      params: {
        start: 0,
        limit: 2,
        search: '',
        desc: 'True',
        order: 'ctime', // ctime name
        type: 'mine' // mine all
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
          label: '按照API名称逆序排序',
          order: 'name',
          desc: 'True'
        },
        {
          label: '按照API名称正序排序',
          order: 'name',
          desc: 'False'
        }
      ]
    }
  }

  componentDidMount () {
    this.getApis()
  }

  getApis = (params) => {
    let urlParams = params || this.state.params
    console.log('根据 params 请求接口', urlParams)
    this.setState({
      activeId: 1,
      apiList: [
        {
          id: 1,
          name: '/user',
          method: 'get'
        },
        {
          id: 2,
          name: '/user',
          method: 'delete'
        },
        {
          id: 3,
          name: '/user',
          method: 'post'
        },
        {
          id: 4,
          name: '/user',
          method: 'put'
        }
      ]
    })
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
    if (type !== 'search') this.getApis(params)
  }

  search = (e) => {
    if (e.keyCode === 13) {
      this.getApis()
    }
  }

  getApi = (id) => {
    this.setState({
      activeId: id
    })
  }

  addApi = () => {
    this.setState({
      activeId: ''
    })
  }

  deleteApi = (id, e) => {
    e.stopPropagation()
    console.log('delete-->', id)
  }

  render () {
    return (
      <div className="uf" styleName="apisContainer">
        <div className="uf uf-col" styleName="apisListContent">

          <div styleName="apisFilterBox">
            <div className="search-box" styleName="apisFilterSearch">
              <input type="text"
                     placeholder="根据名称搜索"
                     value={this.state.params.search}
                     onChange={e => this.setParams('search', e.target.value)}
                     onKeyUp={this.search}/>
              <i className="icon-m-search"></i>
            </div>
            <i className="icon-btn icon-m-add"
               styleName="apisFilterIconBtn"
               onClick={this.addApi}></i>
          </div>

          <div styleName="apisScreeningBox">
            <h6 styleName={classNames('screeningItem', {'active': this.state.params.type === 'mine'})}
                onClick={e => this.setParams('type', 'mine')}>我的</h6>
            <h6 styleName={classNames('screeningItem', {'active': this.state.params.type === 'all'})}
                onClick={e => this.setParams('type', 'all')}>全部</h6>
            <Dropdown
              isSelectBox={true}
              className="apiSortBox"
              onChoseItem={this.setParams}
              dorpmenuBtn={
                <i className="icon-m-sort" styleName="iconSort"></i>
              }
              list={this.state.sortOptions}
              defaultValue={this.state.sortOptions[0]}
            />
          </div>

          <div className="uf-f1" styleName="apisListBox">
            {this.state.apiList.map((item) =>
              <div key={item.id}
                   className="uf"
                   styleName={classNames('apiItem', item.method + 'Api', {'active': this.state.activeId === item.id})}
                   onClick={e => this.getApi(item.id)}>
                <h6 styleName={classNames('apiMethod', item.method + 'ApiMethod')}>{item.method.toUpperCase()}</h6>
                <h6 className="uf-f1 nowrap" styleName="apiName">
                  {item.name}
                  <i className="icon-m-trash"
                     onClick={e => this.deleteApi(item.id, e)}></i>
                </h6>
              </div>
            )}
          </div>
        </div>

        {this.state.activeId ? (
          <ApiInfo apiId={this.state.activeId}/>
        ) : (
          <ApiAdd onAddApi={this.getApi}/>
        )}
      </div>
    )
  }
}

export default CSSModules(Apis, styles, {allowMultiple: true})