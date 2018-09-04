import React from 'react'
import classNames from 'classnames'
import Dropdown from '@/components/dropdown/Dropdown'
import CSSModules from 'react-css-modules'
import styles from './Apis.styl'

import ApiEdit from './ApiAdd'

class ApiInfo extends React.Component {
  constructor (props) {
    super(props)
    this.codeRef = React.createRef()
    this.state = {
      edit: false,
      apiInfo: {
        method: ''
      },
      handlelist: [
        {
          label: '编辑',
          value: 'edit'
        },
        {
          label: '删除',
          value: 'delete'
        }
      ]
    }
  }

  componentDidMount () {
    this.getApiInfo()
  }

  componentDidUpdate (prevProps) {
    let curId = this.props.apiId
    let prevId = prevProps.apiId
    if (curId !== prevId && prevId) {
      this.getApiInfo()
    }
  }

  getApiInfo = () => {
    console.log('api详情页根据 apiId 请求接口', this.props.apiId)
    this.setState({
      edit: false,
      apiInfo: {
        id: 1,
        name: '/user',
        description: '获取用户信息接口',
        method: 'get',
        creator: 'Junru',
        last_modified: '2018-09-10 19:30:22',
        ctime: '2018-09-10 12:30:22',
        response: '{"result": {"id": 480, "username": "root", "email": null, "china_name": "ROOT", "user_role": "root", "status": 0, "info": null, "token": null, "role_id": 1, "role_name": "root", "role_type": "root", "description": "系统管理员"}, "status": 200}',
        usedCount: 29
      }
    })
  }

  handleApi = (type, val) => {
    switch (val) {
      case 'edit':
        this.editApi()
        break
      case 'delete':
        this.deleteApi()
        break
      default:
        break
    }
  }

  deleteApi = () => {
    console.log('deleteApi-->', this.props.apiId)
  }

  editApi = () => {
    console.log('editApi-->', this.props.apiId)
    this.setState({
      edit: true
    })
  }

  resetApi = () => {
    this.setState({
      edit: false
    })
    console.log('-----')
    this.getApiInfo()
  }

  render () {
    return (
      this.state.edit ? (
        <ApiEdit userInfo={this.state.apiInfo} onResetApi={this.resetApi}/>
      ) : (
        <div className="uf uf-col uf-f1" styleName="apiInfoContent">
          <div className="uf" styleName="apiInfoTitle">
            <h4 className="uf-f1"><strong>{this.state.apiInfo.name} {this.props.apiId}</strong></h4>
            <h6><strong styleName="usedCount">{this.state.apiInfo.usedCount}</strong> 调用</h6>
            <Dropdown
              type="handle"
              isSelectBox={true}
              valueAlias="value"
              className="handle-box"
              onChoseItem={this.handleApi}
              dorpmenuBtn={
                <i className="icon-m-more"></i>
              }
              list={this.state.handlelist}
            />
          </div>
          <div styleName="apiInfoBaseBox">
            <div className="uf" styleName="apiBaseDetail">
              <div className="uf uf-f1"><h6>接口类型：</h6><h6
                className={classNames('uf-f1', this.state.apiInfo.method + 'ApiMethod')}>{this.state.apiInfo.method.toUpperCase()}</h6>
              </div>
              <div className="uf uf-f1"><h6>创建用户：</h6><h6 className="uf-f1"
                                                          styleName="apiCreator">{this.state.apiInfo.creator}</h6>
              </div>
            </div>
            <div className="uf" styleName="apiBaseDetail">
              <div className="uf uf-f1"><h6>创建时间：</h6><h6 className="uf-f1"
                                                          styleName="apiInfoVal">{this.state.apiInfo.ctime}</h6>
              </div>
              <div className="uf uf-f1"><h6>更新时间：</h6><h6
                className="uf-f1" styleName="apiInfoVal">{this.state.apiInfo.last_modified}</h6>
              </div>
            </div>
            <div styleName="apiBaseDetail">
              <div className="uf"><h6>接口描述：</h6><h6 className="uf-f1"
                                                    styleName="apiInfoVal">{this.state.apiInfo.description}</h6>
              </div>
            </div>
            <button className="btn small"
                    onClick={this.editApi}
                    styleName="editApiBtn">编辑
            </button>
          </div>
          <div className="panel-box uf-f1">
            <div className="panel-title-box">
              <h6 className="panel-title active">Response</h6>
            </div>
            <div className="panel-content uf uf-col">
              <div className="res-box uf uf-f1">
                <div className="line-count-box">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, idx) =>
                    <h6 key={idx}>{item}</h6>
                  )}
                </div>
                <div className="code-box uf-f1">{this.state.apiInfo.response}</div>
              </div>
            </div>
          </div>
        </div>
      )
    )
  }
}

export default CSSModules(ApiInfo, styles) //  {allowMultiple: true}