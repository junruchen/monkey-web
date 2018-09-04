import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

class DropdownItem extends React.Component {
  choseItem = (val) => {
    this.props.onChoseItem(val)
  }

  render () {
    let item = this.props.item
    let activeObj = this.props.activeObj
    let labelAlias = this.props.labelAlias
    let valueAlias = this.props.valueAlias
    let activeItem = ''
    if (activeObj) {
      activeItem = typeof activeObj === 'object' ? activeObj[labelAlias] : activeObj
    }
    let dropMenuItemClass = classNames('select-item', {
      'active': item[labelAlias] === activeItem,
      'disabled': this.props.item.disabled
    })
    let label = item[labelAlias]
    let returnVal = valueAlias ? item[valueAlias] : item
    return (
      <li className={dropMenuItemClass}
          data-value={returnVal}
          onClick={e => this.choseItem(returnVal)}>{label}</li>
    )
  }
}

DropdownItem.propTypes = {
  item: PropTypes.object.isRequired,
  valueAlias: PropTypes.string, // 返回信息，默认返回item
  labelAlias: PropTypes.string, // 展示信息，默认展示label字段
  activeObj: PropTypes.any // 当前选中值
}

export default DropdownItem