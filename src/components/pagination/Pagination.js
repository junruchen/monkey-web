import React from 'react'
import {pagination} from './util'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Pagination.styl'

/**
 * Pagination 分页组件
 * 页码切换（点击按钮切换，输入页码切换）
 * 通知父组件更新 start 值，父组件根据 start 重新获取接口
 * 接收父组件参数：
 * - count 总数
 * - limit 每一页展示的个数
 * */

class Pagination extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      curPageIdx: 1,
      pageCount: 0,
      pageList: []
    }
  }

  componentDidMount () {
    this.getPageList()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.count !== this.props.count) {
      this.getPageList()
    }
  }

  getPageList = () => {
    let pageCount = Math.ceil(this.props.count / this.props.limit)
    let pages = pagination(this.state.curPageIdx, pageCount)
    this.setState({
      pageList: pages,
      pageCount: pageCount
    })
  }

  changeCurPageIdx = (e) => {
    this.setState({
      curPageIdx: e.target.value
    })
  }

  updateData = (type, val, e) => {
    let curPage
    if (type === 'curPageIdx') {
      curPage = e.target.value
      if (e.keyCode !== 13 || !curPage) return
      curPage = isNaN(parseInt(curPage, 10)) ? 1 : parseInt(curPage, 10)
      if (!(/^(\d+)$/g.test(e.target.value))) {
        if (curPage < 1) {
          curPage = 1
        }
      }
      if (curPage > this.state.pageCount) {
        curPage = this.state.pageCount
      }
    } else {
      curPage = this.state.curPageIdx
      if (type === 'number') {
        curPage = val
      } else if (type === 'next') {
        curPage++
      } else if (type === 'prev') {
        curPage--
      }
    }
    // pagelist 变更
    this.getPageList()
    // 通知父组件，更新列表
    let start = (curPage - 1) * this.props.limit
    this.setState({
      curPageIdx: curPage
    })
    this.props.onStartChange('start', start)
  }

  render () {
    return (
      <div styleName="paginationBox">
        <h6 styleName="paginationCount">共 {this.props.count} 条</h6>
        <ul styleName="paginations">
          <li className={classNames('page-item',
            {'disabled': this.state.curPageIdx === 1})}
              onClick={e => this.updateData('prev', '', e)}>
            <i className="icon-m-l-point"></i>
          </li>
          {this.state.pageList.map((item, idx) =>
            <li className={classNames('page-item',
              {'active': this.state.curPageIdx === item.value},
              {'disabled': item.type !== 'number'})}
                key={idx}
                onClick={e => this.updateData(item.type, item.value, e)}>
              {item.value}
            </li>
          )}
          <li className={classNames('page-item',
            {'disabled': this.state.pageCount === this.state.curPageIdx})}
              onClick={e => this.updateData('next', '', e)}>
            <i className="icon-m-r-point"></i>
          </li>
        </ul>
        <div styleName="changePagination">
          前往
          <input type="number"
                 styleName="paginationInput"
                 value={this.state.curPageIdx}
                 onChange={e => this.changeCurPageIdx(e)}
                 onKeyUp={e => this.updateData('curPageIdx', '', e)}/>
          页
        </div>
      </div>
    )
  }
}

Pagination.defaultProps = {
  count: 0,
  limit: 10
}
Pagination.propTypes = {
  count: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired
}

export default CSSModules(Pagination, styles)