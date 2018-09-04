import React from 'react'
import classNames from 'classnames'
import CSSModules from 'react-css-modules'
import styles from './Apis.styl'

class ApiAdd extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        name: '',
        description: '',
        method: 'get',
        response: ''
      },
      methods: ['get', 'put', 'post', 'delete'],
      isBtnDisabled: true,
      isNameError: false,
    }
  }

  componentDidMount () {
    if (this.props.userInfo) {
      let userInfo = this.props.userInfo
      let form = this.state.form
      form.name = userInfo.name
      form.description = userInfo.description
      form.method = userInfo.method
      form.response = userInfo.response
      this.setState({
        form: form,
        isBtnDisabled: false
      })
    }
  }

  changeFormParams = (type, e) => {
    let form = this.state.form
    form[type] = e.target.value
    this.setState({
      form: form,
      isBtnDisabled: !(form.name && form.response),
      isNameError: type === 'name' ? false : this.state.isNameError
    })
  }

  checkName = (name) => {
    /*
     * 检测字符
     * 任意一个不满足，则提示error isContextError: true
     * error
     * this.setState({
     *   isNameError: true,
     *   isBtnDisabled: true
     * })
     * success
     * this.setState({
     *   isNameError: false,
     *   isBtnDisabled: !this.state.form.response
     * })
     * */
    // check: 仅支持大小写字母、横线'-'、下划线'_'
    let nameReg = /^\/[a-zA-Z-_]+$/g
    if (!nameReg.test(name)) {
      this.setState({
        isNameError: true,
        isBtnDisabled: true
      })
      return false
    }
    return true
  }

  submit = (e) => {
    console.log(this.checkName(this.state.form.name))
    if (!this.checkName(this.state.form.name)) return
    if (this.props.userInfo) {
      this.props.onResetApi()
      console.log('check---> ajax--- edit')
    } else {
      this.props.onAddApi(2)
      console.log('check---> ajax--- newid 2')
    }
  }

  render () {
    let submitBtnClass = classNames('btn small', {'disabled': this.state.isBtnDisabled})
    return (
      <div className="uf uf-col uf-f1" styleName="apiNewContent">
        <div styleName="newTitleBox">
          <h4>创建API</h4>
        </div>
        <div styleName="newFormBox">
          <div styleName={classNames('newFormItem', {'error': this.state.isNameError})}>
            <label>API名称<span styleName="newLabelMarkDes">(支持大小写字母、横线'-'、下划线'_')</span></label>
            <input placeholder="/users"
                   value={this.state.form.name}
                   onChange={e => this.changeFormParams('name', e)}
                   onBlur={e => this.checkName(e.target.value)}/>
          </div>
          <div styleName="newFormItem">
            <label>API方法</label>
            {this.state.methods.map((item, idx) =>
              <div key={idx}
                   styleName={classNames('inputRadioBox', item + 'Api', {'active': this.state.form.method === item})}>
                <input id={'methodRadio' + idx}
                       name="method"
                       type="radio"
                       defaultChecked={this.state.form.method === item}
                       onChange={e => this.changeFormParams('method', e)}
                       value={item}/>
                <label styleName={item + 'ApiMethod'}
                       htmlFor={'methodRadio' + idx}>{item.toUpperCase()}</label>
              </div>
            )}
          </div>
          <div styleName="newTextareaFormItem">
            <label>API描述<span styleName="newLabelDes">(可选)</span></label>
            <textarea placeholder="请输入API描述"
                      value={this.state.form.description}
                      onChange={e => this.changeFormParams('description', e)}></textarea>
          </div>
          <div styleName="newTextareaFormItem">
            <label>API Response</label>
            <textarea placeholder="请输入API Response"
                      value={this.state.form.response}
                      onChange={e => this.changeFormParams('response', e)}></textarea>
          </div>
        </div>
        <div className="btn-group">
          <button className={submitBtnClass} onClick={this.submit}>创建API</button>
        </div>
      </div>
    )
  }
}

export default CSSModules(ApiAdd, styles, {allowMultiple: true})