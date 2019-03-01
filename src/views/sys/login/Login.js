import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import {
  Form,
  Input,
  Icon,
  Button,
  message,
  Checkbox
} from 'antd'
import styles from './Login.module.scss'
import { loginAPI } from '@/apis'
import {
  getUserDetails,
  rules
} from '@/utils'

class Login extends React.Component {
  submit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let data = values
        loginAPI(data).then((res) => {
          if (res.data.status === 200) {
            this.props.getUserInfo()
            this.props.history.push('/')
          } else {
            message.error(res.data.message)
          }
        })
      }
    })
  }

  enterSubmit = (e) => {
    if (e.keyCode === 13) {
      this.submit(e)
    }
  }

  render () {
    const { getFieldDecorator } = this.props.form
    return (
      <div styleName="loginContainer">
        <div styleName="loginBox">
          <div styleName="monkeyHeaderLogo"></div>
          <Form onSubmit={this.submit} styleName="loginFormBox" className="monkey-form-box">
            <Form.Item
              label="用户名/邮箱">
              {getFieldDecorator('account', {
                rules: [rules.required],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                       placeholder="请输入用户名/邮箱"/>
              )}
            </Form.Item>
            <Form.Item
              label="密码">
              {getFieldDecorator('password', {
                rules: [rules.required],
              })(
                <Input type="password"
                       prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                       placeholder="请输入密码"
                       onPressEnter={this.submit}/>
              )}
            </Form.Item>

            <Form.Item>
              {getFieldDecorator('rememberMe', {
                valuePropName: 'checked',
                initialValue: false,
              })(
                <Checkbox>记住密码</Checkbox>
              )}</Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" styleName="loginBtn">
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUserInfo: () => {
      dispatch(getUserDetails())
    }
  }
}

Login = Form.create({ name: 'loginForm' })(CSSModules(Login, styles))

Login = connect(null, mapDispatchToProps)(Login)

export default withRouter(Login)