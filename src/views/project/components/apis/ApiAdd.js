import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Apis.module.scss'
import PropTypes from 'prop-types'

import {
  Form,
  Input,
  Button,
  Radio,
  message
} from 'antd'

import JSONEditor from 'jsoneditor'
import 'jsoneditor/dist/jsoneditor.css'

import { rules } from '@/utils'

import { newApiAPI, editApiAPI } from '@/apis'

const RadioGroup = Radio.Group

// TODO: 区分 edit or new
class ApiAdd extends React.Component {
  static propTypes = {
    editApiInfo: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      jsoneditor: null,
      responseStatus: { // 自定义response校验
        validateStatus: '',
        help: ''
      },
      pathStatus: { // 自定义path校验
        validateStatus: '',
        help: ''
      },
      initialValue: {
        name: '',
        path: '',
        description: '',
        method: 'get',
        response: '{}'
      }
    }
  }

  componentDidMount() {
    const editApiInfo = this.props.editApiInfo
    const initialValue = editApiInfo || this.state.initialValue
    this.setState({
      initialValue: initialValue
    })
    this.initJSONEditor(initialValue.response)
  }

  componentWillUnmount() {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  initJSONEditor = (defaultJson) => {
    const options = {
      mode: 'code',
      statusBar: false
    }
    this.jsoneditor = new JSONEditor(this.container, options)
    this.jsoneditor.setText(defaultJson)
  }

  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = values
        try {
          this.jsoneditor.get() // 用于校验输入内容是否正确
          const responseStatus = {
            validateStatus: '',
            help: ''
          }
          this.setState({
            responseStatus: responseStatus
          })
          const responseVal = this.jsoneditor.getText()
          data.response = responseVal
          data.projectId = this.props.projectId
          if (this.props.editApiInfo) {
            this.edit(data)
          } else {
            this.add(data)
          }

        } catch (e) {
          const responseStatus = {
            validateStatus: 'error',
            help: e.message
          }
          this.setState({
            responseStatus: responseStatus
          })
        }
      }
    })
  }

  add = (data) => {
    newApiAPI(data).then((res) => {
      if (res.data.status === 200) {
        const apiId = res.data.result.id
        this.props.onAddApi(apiId, true)
      } else {
        message.error(res.data.message)
      }
    })
  }

  edit = (data) => {
    data.id = this.props.editApiInfo.id
    editApiAPI(data).then((res) => {
      if (res.data.status === 200) {
        this.props.onResetApi(data)
      } else {
        const pathStatus = {
          validateStatus: 'error',
          help: res.data.message
        }
        this.setState({
          pathStatus: pathStatus
        })
        message.error(res.data.message)
      }
    })
  }

  resetPathStatus = () => {
    const pathStatus = {
      validateStatus: '',
      help: ''
    }
    this.setState({
      pathStatus: pathStatus
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="uf" styleName="apiNewContent">
        <div styleName="newTitleBox">
          <h4>{this.props.editApiInfo ? '编辑API' : '创建API'}</h4>
        </div>

        <Form onSubmit={this.submit}
          className="monkey-form-box"
          autoComplete="off"
          styleName="newApiFormBox">
          <Form.Item
            styleName="newApiFormItem"
            label="API名称">
            {getFieldDecorator('name', {
              initialValue: this.state.initialValue.name,
              rules: [rules.name]
            })(
              <Input placeholder="请输入API名称" />
            )}
          </Form.Item>
          <Form.Item
            styleName="newApiFormItem"
            label="API描述">
            {getFieldDecorator('description', {
              initialValue: this.state.initialValue.description
            })(
              <Input placeholder="请输入API描述" />
            )}
          </Form.Item>
          <Form.Item
            styleName="newApiFormItem"
            label="API PATH"
            extra="参考API命名规范，项目内唯一，仅支持大小写字母 数字 - _ /"
            validateStatus={this.state.pathStatus.validateStatus}
            help={this.state.pathStatus.help}>
            {getFieldDecorator('path', {
              validateTrigger: 'onBlur',
              initialValue: this.state.initialValue.path,
              rules: [rules.apiPathUnique]
            })(
              <Input placeholder="请输入API PATH, 如: /monkey/user" onChange={this.resetPathStatus} />
            )}
          </Form.Item>
          <Form.Item
            styleName="newApiFormItem"
            label="API方法">
            {getFieldDecorator('method', {
              initialValue: this.state.initialValue.method,
              rules: [rules.required]
            })(
              <RadioGroup name="radiogroup" onChange={this.resetPathStatus}>
                <Radio value='get'>GET</Radio>
                <Radio value='post'>POST</Radio>
                <Radio value='put'>PUT</Radio>
                <Radio value='delete'>DELETE</Radio>
              </RadioGroup>
            )}
          </Form.Item>
          <Form.Item
            required
            styleName="newApiFormItemEditor"
            label="API Response"
            validateStatus={this.state.responseStatus.validateStatus}
            help={this.state.responseStatus.help}>
            <div className="json-editor-container" ref={el => this.container = el} ></div>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              确定
              </Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

ApiAdd = Form.create({ name: 'newApiForm' })(CSSModules(ApiAdd, styles))

export default ApiAdd