import React from 'react'
import {
  Route,
  NavLink
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import CSSModules from 'react-css-modules'
import styles from './Project.module.scss'

import BarChart from '@/components/chart/BarChart'
import LineChart from '@/components/chart/LineChart'

import Apis from './components/apis/Apis'
import Settings from './components/settings/Settings'
import Users from './components/users/Users'

import { getProjectAPI, getProjectApiCountsAPI } from '@/apis'

import { standardTimeFormat } from '@/utils'

// TODO: resetProjectChart 更新且为true时，重新获取chart数据

class Project extends React.Component {
  static propTypes = {
    resetProjectChart: PropTypes.bool,
    userInfo: PropTypes.object
  }

  constructor(props) {
    super(props)
    this.state = {
      project: {}, // 项目详细信息
      apiCounts: {}, // 项目统计数据
      apiCreatedCountsMetric: {
        rate: '2%',
        isGrowth: true,
        data: [
          {
            time: '2017-08-01',
            data: 20
          }, {
            time: '2017-08-02',
            data: 40
          }, {
            time: '2017-08-03',
            data: 10
          }, {
            time: '2017-08-04',
            data: 80
          }, {
            time: '2017-08-05',
            data: 30
          }, {
            time: '2017-08-06',
            data: 50
          }, {
            time: '2017-08-07',
            data: 70
          }]
      },
      apiUsedCountsMetric: {
        rate: '5%',
        isGrowth: false,
        data: [
          {
            time: '2017-08-01',
            data: 20
          }, {
            time: '2017-08-02',
            data: 24
          }, {
            time: '2017-08-03',
            data: 12
          }, {
            time: '2017-08-04',
            data: 30
          }, {
            time: '2017-08-05',
            data: 28
          }, {
            time: '2017-08-06',
            data: 21
          }, {
            time: '2017-08-07',
            data: 27
          }]
      }
    }
  }

  componentDidMount() {
    this.getProject()
    this.getApiCounts()
  }

  componentDidUpdate(prevProps) {
    let curResetProjectChart = this.props.resetProjectChart
    let prevResetProjectChart = prevProps.resetProjectChart
    if (curResetProjectChart !== prevResetProjectChart && curResetProjectChart) {
      this.getApiCounts()
    }
  }

  getProject = () => {
    let id = this.props.match.params.id
    getProjectAPI(id).then((res) => {
      if (res.data.status === 200) {
        let project = res.data.result
        this.setState({
          project: project
        })
        this.props.setProjectInfo(project)
      }
    })
  }

  // TODO: charts data
  getApiCounts = () => {
    let id = this.props.match.params.id
    getProjectApiCountsAPI(id).then((res) => {
      if (res.data.status === 200) {
        let apiCounts = res.data.result
        this.setState({
          apiCounts: apiCounts
        })
        this.props.resetApiCounts(false)
      }
    })
  }

  render() {
    let project = this.state.project
    let bgStyle
    if (project.logo) {
      bgStyle = {
        backgroundImage: 'url(' + project.logo + ')'
      }
    }
    const loginUserId = this.props.userInfo ? this.props.userInfo.id : ''
    return (
      <div className="container" styleName="projectContainer">
        <div>
          <div styleName="projectDetailBox">
            <h4 styleName="projectTitle">{this.state.project.name}</h4>
            <div styleName="projectImageBox">
              <div styleName="projectImage" style={bgStyle}></div>
              <h5><strong>{this.state.project.context}</strong></h5>
            </div>
            <div className="nowrap" styleName="projectDetail">
              <h6><i className="icon-m-user"></i><span>{this.state.project.creatorName}</span></h6>
              <h6><i className="icon-m-create-time"></i><span>{standardTimeFormat(this.state.project.ctime)}</span></h6>
              <h6><i className="icon-m-update-time"></i><span>{standardTimeFormat(this.state.project.lastModified)}</span>
              </h6>
              <h6><i className="icon-m-description"></i><span>{this.state.project.description || '暂无描述'}</span></h6>
            </div>
          </div>

          <div styleName="projectAnalysisBox">
            <div styleName="apiSummary">
              <div styleName="firstIconBox">
                <i className="icon-m-chart"></i>
              </div>
              <div styleName="countBox">
                <h2>{this.state.apiCounts.apis}</h2>
                <h6>API总数</h6>
              </div>
            </div>
            <div styleName="apiSummary">
              <div styleName="secondIconBox">
                <i className="icon-m-chart1"></i>
              </div>
              <div styleName="countBox">
                <h2>{this.state.apiCounts.apiUsedCounts}</h2>
                <h6>API调用总次数</h6>
              </div>
            </div>
            <div styleName="apiSummary">
              <div styleName="thirdIconBox">
                <i className="icon-m-chart2"></i>
              </div>
              <div styleName="countBox">
                <h2>{this.state.apiCounts.apiTodayUsedCounts}</h2>
                <h6>API今日调用次数</h6>
              </div>
            </div>
            <div styleName="apiChart">
              <div styleName="apiChartBoxCount">
                <h5 styleName="chartTitle"><strong>API个数</strong><br />增长量趋势图</h5>
                <h3 styleName="chartRate">
                  <span>{this.state.apiCreatedCountsMetric.rate}</span>
                  <i
                    className="icon-m-point"
                    styleName={this.state.apiCreatedCountsMetric.isGrowth ? 'isGrowth' : ''}></i>
                </h3>
              </div>
              <div styleName="apiChartBox">
                <BarChart
                  styleName="apiChartBar"
                  colors={['#4183D7']}
                  data={this.state.apiCreatedCountsMetric.data} />
                <LineChart
                  styleName="apiChartLine"
                  colors={['#BAD3F3']}
                  data={this.state.apiCreatedCountsMetric.data} />
              </div>
            </div>
            <div styleName="apiChart">
              <div styleName="apiChartBoxCount">
                <h5 styleName="chartTitle"><strong>API调用次数</strong><br />增长量趋势图</h5>
                <h3 styleName="chartRate">
                  <span>{this.state.apiUsedCountsMetric.rate}</span>
                  <i className="icon-m-point"
                    styleName={this.state.apiUsedCountsMetric.isGrowth ? 'isGrowth' : ''}></i>
                </h3>
              </div>
              <div styleName="apiChartBox">
                <LineChart
                  styleName="apiChartBar"
                  isBoundaryGap={false}
                  isAreaStyle={true}
                  colors={['#77D0A2']}
                  data={this.state.apiCreatedCountsMetric.data} />
                <LineChart
                  styleName="apiChartLine"
                  isBoundaryGap={false}
                  colors={['#C5E5D4']}
                  data={this.state.apiCreatedCountsMetric.data} />
              </div>
            </div>
          </div>
        </div>
        <div styleName="subContentBox" className="uf">
          <div styleName="subTitleBox">
            <NavLink
              exact
              styleName="subTitle"
              to={'/projects/' + this.props.match.params.id}
              activeClassName="projectActiveSubTitle"
            >接口</NavLink>
            {loginUserId && (loginUserId === project.creator) && (
              <React.Fragment>
                <NavLink
                  exact
                  styleName="subTitle"
                  to={'/projects/' + this.props.match.params.id + '/users'}
                  activeClassName="projectActiveSubTitle"
                >用户</NavLink>
                <NavLink
                  exact
                  styleName="subTitle"
                  to={'/projects/' + this.props.match.params.id + '/settings'}
                  activeClassName="projectActiveSubTitle"
                >设置</NavLink>
              </React.Fragment>
            )}
          </div>
          <Route exact path="/projects/:id" component={Apis} />
          {loginUserId && (loginUserId === project.creator) && (
            <React.Fragment>
              <Route path="/projects/:id/users" component={Users} />
              <Route path="/projects/:id/settings" component={Settings} />
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    resetProjectChart: state.resetProjectChart,
    userInfo: state.userInfo
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    resetApiCounts: (val) => {
      dispatch({ type: 'RESET', resetProjectChart: val })
    },
    setProjectInfo: (val) => {
      dispatch({ type: 'CHANGE_PROJECT', projectInfo: val })
    }
  }
}

Project = connect(mapStateToProps, mapDispatchToProps)(CSSModules(Project, styles))

export default Project