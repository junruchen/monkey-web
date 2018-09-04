/* global plupload */
import React from 'react'
import {
  NavLink,
  withRouter
} from 'react-router-dom'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import styles from './NewProject.styl'

class NewProject extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        name: '',
        description: '',
        context: '',
        logo: ''
      },
      isBtnDisabled: true,
      isContextUnique: false // 默认不唯一
    }
  }

  componentDidMount () {
    this.pluploadUpload()
  }

  pluploadUpload = () => {
    // 初始化上传组件
    var browseButton = [].slice.call(document.getElementsByClassName('plipload-btn'))
    var uploader = new plupload.Uploader({
      runtimes: 'html5,html4',
      browse_button: browseButton,
      filters: {
        mime_types: [
          {
            title: 'Image files',
            extensions: 'jpg,jpeg,gif,png'
          }
        ],
        max_file_size: '600kb',
        prevent_duplicates: false
      },
      max_retries: 2,
      multi_selection: false,
      url: '/m/api/uploadImage', // 上传接口
      init: {
        PostInit: function PostInit () {
        },
        FilesAdded: function FilesAdded (t) {
          t.start()
        },
        UploadProgress: function UploadProgress (uploader, files) {
        },
        FileUploaded: function FileUploaded (uploader, files, res) {
          let response = JSON.parse(res.response)
          if (response.status === 200) {
            // success 返回 URL res.data.imgUrl
          } else {
            // error
          }
        },
        Error: function Error (e, i) {
          // error
        }
      }
    })
    uploader.init()
  }

  submit = (e) => {
    e.preventDefault()
    if (!this.checkUnique(this.state.form.context)) return
    console.log('check---> ajax--- 保存')
    // 成功后 -- 进入详情页
    this.props.history.push('/projects/1')
  }

  changeFormParams = (type, e) => {
    let form = this.state.form
    form[type] = e.target.value
    this.setState({
      form: form,
      isBtnDisabled: !(form.name && form.name.length <= 30 && form.context),
      isContextError: type === 'context' ? false : this.state.isContextError
    })
  }

  checkUnique = (context) => {
    /*
     * 1 检测字符
     * 2 检测唯一性
     * 任意一个不满足，则提示error isContextError: true
     * error
     * this.setState({
     *   isContextError: true,
     *   isBtnDisabled: true
     * })
     * success
     * this.setState({
     *   isContextError: false,
     *   isBtnDisabled: !(this.state.form.name && this.state.form.name.length <= 30)
     * })
     * */
    // check: 仅支持大小写字母、横线'-'、下划线'_', 非'/m'
    let contextReg = /^\/[^m][a-zA-Z-_]+$|^\/m[a-zA-Z-_]+$/g
    if (!contextReg.test(context)) {
      this.setState({
        isContextError: true,
        isBtnDisabled: true
      })
      return false
    }
    // check: 检验context唯一性
    console.log('调用接口-检验context唯一性')
    return true
  }

  render () {
    let submitBtnClass = classNames('btn small', {'disabled': this.state.isBtnDisabled})
    return (
      <div styleName="newProjectBox">
        <div styleName="titleBox">
          <h1>创建项目</h1>
          <h6 styleName="titleDes">用于管理、测试API</h6>
        </div>
        <div styleName="formBox">
          <div styleName={classNames('formItem', {'error': this.state.form.name.length > 30})}>
            <label>项目名称<span styleName="labelMarkDes">(长度限制30个字符)</span></label>
            <input placeholder="请输入项目名称"
                   value={this.state.form.name}
                   onChange={e => this.changeFormParams('name', e)}/>
          </div>
          <div styleName={classNames('formItem', {'error': this.state.isContextError})}>
            <label>项目路径<span styleName="labelMarkDes">(唯一项目标识; 支持大小写字母、横线'-'、下划线'_', 非'/m')</span></label>
            <input placeholder="/project_url"
                   value={this.state.form.context}
                   onChange={e => this.changeFormParams('context', e)}
                   onBlur={e => this.checkUnique(e.target.value)}/>
          </div>
          <div styleName="textareaFormItem">
            <label>项目描述<span styleName="labelDes">(可选)</span></label>
            <textarea placeholder="请输入项目描述"
                      value={this.state.form.description}
                      onChange={e => this.changeFormParams('description', e)}></textarea>
          </div>
          <div styleName="formItem">
            <label>项目LOGO<span styleName="labelDes">(支持png、jpg等格式)</span></label>
            <div styleName="imageBox"></div>
            <button className="text-btn plipload-btn" styleName="textBtn">上传</button>
          </div>
        </div>
        <div className="btn-group">
          <button className={submitBtnClass} onClick={this.submit}>创建新项目</button>
          <button className="btn small link-btn cancel-btn">
            <NavLink to="/projects">取消</NavLink>
          </button>
        </div>
      </div>
    )
  }
}

export default  withRouter(CSSModules(NewProject, styles, {allowMultiple: true}))