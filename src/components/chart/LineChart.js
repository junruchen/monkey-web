import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import {customed} from './customed.js'

/**
 * LineChart  折线图组件
 * - colors 颜色
 * - data 数组
 * - isBoundaryGap 是否留白
 * - isAreaStyle 是否有背景
 * - className 自定义样式
 * */

class LineChart extends React.Component {
  constructor (props) {
    super(props)
    this.lineChartRef = React.createRef()
    this.state = {
      echart: null,
      options: {
        xAxis: {
          show: false,
          type: 'category',
          data: []
        },
        grid: {
          top: 3,
          bottom: 0
        },
        color: this.props.colors,
        yAxis: {
          show: false,
          type: 'value'
        },
        tooltip: {
          show: false
        },
        series: {
          data: [],
          type: 'line'
        }
      }
    }
  }

  componentDidMount () {
    this.initECharts()
  }

  componentDidUpdate (prevProps) {
    let curData = this.props.data
    let prevData = prevProps.data
    if (curData !== prevData) {
      this.setEchartOption()
    }
  }

  initECharts = () => {
    echarts.registerTheme('customed', customed)
    this.echart = echarts.init(this.lineChartRef.current, 'customed')
    this.setEchartOption()
  }

  setEchartOption = () => {
    let xAxisData = []
    let seriesData = []
    this.props.data.forEach((item) => {
      xAxisData.push(item.time)
      seriesData.push(item.data)
    })
    let options = this.state.options
    options.xAxis.data = xAxisData
    options.series.data = seriesData

    options.xAxis.boundaryGap = this.props.isBoundaryGap

    if (this.props.isAreaStyle) {
      options.series.areaStyle = {}
      options.series.lineStyle = {
        color: 'transparent'
      }
      options.series.showSymbol = false
    }

    this.setState({
      options
    })
    this.echart.setOption(options)
  }

  render () {
    return (
      <div ref={this.lineChartRef} className={classNames('echart-box', this.props.className)}></div>
    )
  }
}
LineChart.defaultProps = {
  isAreaStyle: false,
  isBoundaryGap: true
}
LineChart.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.array,
  isAreaStyle: PropTypes.bool,
  className: PropTypes.string
}

export default LineChart