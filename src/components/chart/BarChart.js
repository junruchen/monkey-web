import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import echarts from 'echarts'
import {customed} from './customed.js'
import './Chart.styl'

/**
 * BarChart  柱状图组件
 * - colors 颜色
 * - data 数组
 * - className 自定义样式
 * */

class BarChart extends React.Component {
  constructor (props) {
    super(props)
    this.barChartRef = React.createRef()
    this.state = {
      echart: null,
      options: {
        xAxis: {
          show: false,
          type: 'category',
          data: []
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
          barWidth: 7,
          data: [],
          type: 'bar'
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
    this.echart = echarts.init(this.barChartRef.current, 'customed')
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
    this.setState({
      options
    })
    this.echart.setOption(options)
  }

  render () {
    return (
      <div ref={this.barChartRef} className={classNames('bar-echart-box', this.props.className)}></div>
    )
  }
}

BarChart.propTypes = {
  data: PropTypes.array.isRequired,
  colors: PropTypes.array,
  className: PropTypes.string
}

export default BarChart