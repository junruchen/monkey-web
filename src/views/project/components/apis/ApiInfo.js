import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './Apis.module.scss'
import ReactJson from 'react-json-view'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { getApiAPI } from '@/apis'
import {
  message,
  Button,
  Spin
} from 'antd';

import { standardTimeFormat } from '@/utils'

class ApiInfo extends React.Component {
  static propTypes = {
    projectInfo: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.codeRef = React.createRef()
    this.state = {
      apiInfo: null
    }
  }

  componentDidMount() {
    this.getApiInfo()
  }

  componentDidUpdate(prevProps) {
    let curId = this.props.apiId
    let prevId = prevProps.apiId
    if (curId !== prevId && curId) {
      this.getApiInfo()
    }
  }

  getApiInfo = () => {
    const apiId = this.props.apiId
    getApiAPI(apiId).then((res) => {
      if (res.data.status === 200) {
        const apiInfo = res.data.result
        this.setState({
          apiInfo: apiInfo
        })
      } else {
        message.error(res.data.message)
      }
    })
  }

  copyUrl = () => {
    message.success('复制成功')
  }

  deleteApi = (e) => {
    this.props.onDelApi(this.props.apiId, e)
  }

  editApi = () => {
    this.props.onEditApi(this.state.apiInfo)
  }

  render() {
    const apiInfo = this.state.apiInfo
    let ApiUrl
    if (apiInfo) {
      ApiUrl = window.location.origin + '/m/' + this.props.projectInfo.id + this.props.projectInfo.context + this.state.apiInfo.path
    }
    return (
      !this.state.apiInfo ? (
        <div className="uf" styleName="apiInfoContent">
          <Spin className="loading-box" tip="正在加载..." />
        </div>
      ) : (
          <div styleName="apiInfoContent">
            <div className="uf" styleName="apiInfoTitle">
              <h4 className="uf-f1">
                <strong styleName="apiUrl">{ApiUrl}</strong>
                <CopyToClipboard text={ApiUrl} onCopy={this.copyUrl}>
                  <Button size="small" styleName="copyApiBtn">复制</Button>
                </CopyToClipboard>
              </h4>
              <h6 styleName="apiHandleBtn"><span onClick={this.editApi}>编辑</span><span onClick={this.deleteApi}>删除</span></h6>
            </div>
            <div styleName="apiInfoBaseBox">
              <h6>
                <span>调用次数：</span>
                <span styleName="apiUsedCount">{this.state.apiInfo.apiUsedCounts}</span>
              </h6>
              <div>
                <h6>
                  <span>接口名称：</span>
                  <span>{this.state.apiInfo.name}</span>
                </h6>
                <h6>
                  <span>接口路径：</span>
                  <span>{this.state.apiInfo.path}</span>
                </h6>
              </div>

              <div>
                <h6>
                  <span>接口类型：</span>
                  <span styleName={this.state.apiInfo.method + 'ApiMethod'}>{this.state.apiInfo.method.toUpperCase()}</span>
                </h6>
                <h6>
                  <span>创建用户：</span>
                  <span>{this.state.apiInfo.creatorName}</span>
                </h6>
              </div>

              <div>
                <h6>
                  <span>创建时间：</span>
                  <span>{standardTimeFormat(this.state.apiInfo.ctime)}</span>
                </h6>
                <h6>
                  <span>更新时间：</span>
                  <span>{standardTimeFormat(this.state.apiInfo.lastModified)}</span>
                </h6>
              </div>
              <h6>
                <span>接口描述：</span>
                <span>{this.state.apiInfo.description || '暂无描述'}</span>
              </h6>
            </div>
            <div styleName="responseBox">
              <div styleName="reponseTitle">Response</div>
              <div className="editorStyleBox">
                <div className="editorContent">
                  <ReactJson enableClipboard={false}
                    src={JSON.parse(this.state.apiInfo.response)} />
                </div>
              </div>
            </div>
          </div>
        )
    )
  }
}

const mapStateToProps = (state) => {
  return {
    projectInfo: state.projectInfo
  }
}

ApiInfo = connect(mapStateToProps)(CSSModules(ApiInfo, styles))

export default ApiInfo //  {allowMultiple: true}