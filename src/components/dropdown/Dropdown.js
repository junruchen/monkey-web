import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './DropMenu.styl'

import DropdownItem from './DropdownItem'

/**
 * DropDown 下拉组件
 * 支持形式：自定义，常规列表select-list，常规操作handle-list
 *
 * - className
 * - dorpmenuBtn: 触发按钮,
 * - isSelectBox: 是否是常规select组件,
 *
 * select-box
 * - type: 告知父组件，dropmenu类型
 * - list: 数组，注意处理disabled，如:[{id:1, name: 'test1', disabled: true}]
 * - valueAlias: 返回值，默认返回item
 * - labelAlias: 展示信息，默认展示label字段
 * - defaultValue: 默认值，与valueKey类型对应，可以是对象，也可以是具体的ID
 *
 * handle-box
 * */

class DropDown extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isToggleOn: false,
      activeObj: this.props.defaultValue
    }
    document.addEventListener('click', this.closeDropDown, false)
  }

  componentWillUnmount () {
    document.removeEventListener('click', this.closeDropDown, false)
  }

  closeDropDown = () => {
    this.setState(prevState => ({
      isToggleOn: false
    }))
  }

  toggleDropMenu = (e) => {
    e.nativeEvent.stopImmediatePropagation()
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }))
  }

  choseItem = (val) => {
    this.props.onChoseItem(this.props.type, val)
    this.setState(prevState => ({
      isToggleOn: false,
      activeObj: val
    }))
  }

  render () {
    let dropMenuClass = classNames('dropmenu-box', this.props.className, {'active': this.state.isToggleOn})
    return (
      <div className={dropMenuClass} onClick={e => e.nativeEvent.stopImmediatePropagation()}>
        <div className="dropmenu-btn" onClick={ this.toggleDropMenu }>
          {this.props.dorpmenuBtn}
        </div>
        {this.props.isSelectBox ? (
          <ul className="dropmenu select-box">
            {this.props.list.map((item, idx) =>
              <DropdownItem
                key={item.id || idx}
                item={item}
                activeObj={this.state.activeObj}
                labelAlias={this.props.labelAlias}
                valueAlias={this.props.valueAlias}
                onChoseItem={this.choseItem}
              />
            )}
          </ul>
        ) : (
          this.props.dropmenuList
        )}
      </div>
    )
  }
}

DropDown.defaultProps = {
  labelAlias: 'label',
  isSelectBox: false,
  type: 'sort',
  isHandleBox: false
}
DropDown.propTypes = {
  className: PropTypes.string,
  dorpmenuBtn: PropTypes.element.isRequired,
  isSelectBox: PropTypes.bool,
  isHandleBox: PropTypes.bool,

  list: PropTypes.array,
  valueAlias: PropTypes.string,
  labelAlias: PropTypes.string,
  defaultValue: PropTypes.any,
  type: PropTypes.string
}

export default DropDown