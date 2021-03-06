import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ThemeSwitch from './ThemeSwitch'

class Content extends React.Component {
  static propTypes = {
    themeColor: PropTypes.string
  }

  render () {
    return (
      <div>
        <div style={{ color: this.props.themeColor }}>小书内容</div>
        <ThemeSwitch/>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    themeColor: state.themeColor
  }
}

Content = connect(mapStateToProps)(Content)

export default Content
