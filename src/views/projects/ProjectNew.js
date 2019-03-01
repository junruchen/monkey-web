import React from 'react'
import CSSModules from 'react-css-modules'
import {
  Form,
  Input,
  Button,
  Upload,
  Icon,
  message
} from 'antd'
import styles from './Projects.module.scss'

import {
  rules,
  getCookiesObj
} from '@/utils'

import {
  newProjectAPI
} from '@/apis'

const { TextArea } = Input
const csrfToken = getCookiesObj() ? getCookiesObj().csrfToken : ''

class ProjectsNew extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      uploadLoading: false,
    }
  }

  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = values
        data.context = '/' + data.context
        newProjectAPI(data).then((res) => {
          if (res.data.status === 200) {
            this.props.history.push('/projects/' + res.data.result.id)
          } else {
            message.error(res.data.message)
            return false
          }
        })
      }
    })
  }

  handleChange = (info) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true })
      return
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imagePreUrl => this.setState({
        imagePreUrl,
        loading: false,
      }))
    }
  }

  getImageUrl = (e) => {
    if (e.file.status === 'done' && e.file.response.status === 200) {
      return e.file.response.result.imgUrl
    }
    return ''
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const imagePreUrl = this.state.imagePreUrl
    return (
      <div className="container">
        <div styleName="newProjectBox">
          <div styleName="newTitleBox">
            <h1>创建项目</h1>
            <h6 styleName="newTitleDes">用于管理、测试API</h6>
          </div>
          <Form onSubmit={this.submit} styleName="newProjectFormBox" className="monkey-form-box">
            <Form.Item
              label="项目名称">
              {getFieldDecorator('name', {
                rules: [rules.name],
              })(
                <Input placeholder="请输入项目名称"/>
              )}
            </Form.Item>
            <Form.Item
              label="项目路径"
              extra="唯一，仅支持大小写字母、短横线与下划线">
              {getFieldDecorator('context', {
                rules: [rules.projectContext]
              })(
                <Input addonBefore="/"
                       placeholder="请输入项目路径"/>
              )}
            </Form.Item>
            <Form.Item
              label="项目描述">
              {getFieldDecorator('description')(
                <TextArea placeholder="请输入项目描述" autosize={{ maxRows: 4, minRows: 2 }}/>
              )}
            </Form.Item>
            <Form.Item
              label="项目LOGO"
              extra="仅支持小于600MB的IMG、PNG、GIF图片"
            >
              {getFieldDecorator('logo', { getValueFromEvent: this.getImageUrl })(
                <Upload
                  name="avatar"
                  listType="picture-card"
                  className="avatar-uploader"
                  showUploadList={false}
                  headers={{ 'x-csrf-token': csrfToken }}
                  action="/api/uploadImage"
                  beforeUpload={beforeUpload}
                  onChange={this.handleChange}
                >
                  {imagePreUrl ? <img src={imagePreUrl} alt="projectLogo" width="102" height="102"/> :
                    <div>
                      <Icon type={this.state.loading ? 'loading' : 'plus'}/>
                      <div styleName="logoUploadBtnText">点击上传</div>
                    </div>}
                </Upload>
              )}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" styleName="newProjectFormBtn">
                创建新项目
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

function beforeUpload (file) {
  const isImg = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type)
  if (!isImg) {
    message.error('You can only upload JPG file!')
  }
  const isLt2M = file.size / 1024 / 1024 <= .6
  if (!isLt2M) {
    message.error('Image must smaller than 1MB!')
  }
  return isImg && isLt2M
}

function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

ProjectsNew = Form.create({ name: 'newProjectForm' })(CSSModules(ProjectsNew, styles))

export default ProjectsNew
