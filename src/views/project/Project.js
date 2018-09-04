import React from 'react'
import {
  Route,
  NavLink
} from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './Project.styl'

import BarChart from '@/components/chart/BarChart'
import LineChart from '@/components/chart/LineChart'

import Apis from './projectComponents/apis/Apis'
import Logs from './projectComponents/logs/Logs'
import Settings from './projectComponents/settings/Settings'
import Users from './projectComponents/users/Users'

class Project extends React.Component {
  constructor (props) {
    super(props)
    let url = '/projects/' + this.props.match.params.id
    this.state = {
      url: url,
      subMenus: [
        {
          label: '接口',
          path: url
        }, {
          label: '动态',
          path: url + '/logs'
        }, {
          label: '用户',
          path: url + '/users'
        }, {
          label: '设置',
          path: url + '/settings'
        }
      ],
      project: {},
      apiCreatedCountsMetric: {data: []},
      apiUsedCountsMetric: {data: []}
    }
  }

  componentDidMount () {
    this.getProject()
  }

  getProject = () => {
    console.log('project详情页根据 id 请求接口', this.props.match.params.id)
    this.setState({
      project: {
        id: 1,
        name: '掘金',
        context: '/juejin',
        description: '掘金项目，技术社区',
        ctme: '2018-07-08 12:22:20',
        updateTime: '2018-08-08 12:22:20',
        logo: 'https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg',
        creator: 'Junru',
        apis: 28,
        apiUsedCounts: 256,
        apiTodayUsedCounts: 47
      },
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
    })
  }

  render () {
    return (
      <div className="container">
        <div styleName="projectDetailBox">
          <h4 styleName="projectTitle">{this.state.project.name}</h4>
          <div styleName="projectImageBox" style={{backgroundImage: 'url(' + this.state.project.logo + ')'}}>
            <h4><strong>{this.state.project.context}</strong></h4>
          </div>
          <div className="nowrap" styleName="projectDetail">
            <h6><i className="icon-m-user"></i><span>{this.state.project.creator}</span></h6>
            <h6><i className="icon-m-create-time"></i><span>{this.state.project.ctme}</span></h6>
            <h6><i className="icon-m-update-time"></i><span>{this.state.project.updateTime}</span></h6>
            <h6><i className="icon-m-description"></i><span>{this.state.project.description}</span></h6>
          </div>
        </div>

        <div styleName="projectAnalysisBox">
          <div styleName="apiSummary">
            <div styleName="firstIconBox">
              <i className="icon-m-chart"></i>
            </div>
            <div styleName="countBox">
              <h2>{this.state.project.apis}</h2>
              <h6>API总数</h6>
            </div>
          </div>
          <div styleName="apiSummary">
            <div styleName="secondIconBox">
              <i className="icon-m-chart1"></i>
            </div>
            <div styleName="countBox">
              <h2>{this.state.project.apiUsedCounts}</h2>
              <h6>API调用总次数</h6>
            </div>
          </div>
          <div styleName="apiSummary">
            <div styleName="thirdIconBox">
              <i className="icon-m-chart2"></i>
            </div>
            <div styleName="countBox">
              <h2>{this.state.project.apiTodayUsedCounts}</h2>
              <h6>API今日调用次数</h6>
            </div>
          </div>
          <div styleName="apiChart">
            <div styleName="apiChartBoxCount">
              <h5 styleName="chartTitle"><strong>API个数</strong><br/>增长量趋势图</h5>
              <h3 styleName="chartRate">
                <span>{this.state.apiCreatedCountsMetric.rate}</span>
                <i
                  className="icon-m-point"
                  styleName={this.state.apiCreatedCountsMetric.isGrowth ? 'isGrowth' : ''}></i>
              </h3>
            </div>
            <div styleName="apiChartBox">
              <BarChart
                className={'api-base-chart'}
                colors={['#4183D7']}
                data={this.state.apiCreatedCountsMetric.data}/>
              <LineChart
                className={'api-line-chart'}
                colors={['#BAD3F3']}
                data={this.state.apiCreatedCountsMetric.data}/>
            </div>
          </div>
          <div styleName="apiChart">
            <div styleName="apiChartBoxCount">
              <h5 styleName="chartTitle"><strong>API调用次数</strong><br/>增长量趋势图</h5>
              <h3 styleName="chartRate">
                <span>{this.state.apiUsedCountsMetric.rate}</span>
                <i className="icon-m-point"
                   styleName={this.state.apiUsedCountsMetric.isGrowth ? 'isGrowth' : ''}></i>
              </h3>
            </div>
            <div styleName="apiChartBox">
              <LineChart
                isBoundaryGap={false}
                isAreaStyle={true}
                className={'api-base-chart'}
                colors={['#77D0A2']}
                data={this.state.apiCreatedCountsMetric.data}/>
              <LineChart
                isBoundaryGap={false}
                className={'api-line-chart'}
                colors={['#C5E5D4']}
                data={this.state.apiCreatedCountsMetric.data}/>
            </div>
          </div>
        </div>
        <div styleName="subContentBox">
          <div styleName="subTitleBox">
            {this.state.subMenus.map((item, idx) =>
              <NavLink
                exact
                key={idx}
                styleName="subTitle"
                to={item.path}
                activeClassName="activeSubTitle"
              >{item.label}</NavLink>
            )}
          </div>
          <Route exact path={this.state.url} component={Apis}/>
          <Route path={this.state.url + '/users'} component={Users}/>
          <Route path={this.state.url + '/logs'} component={Logs}/>
          <Route path={this.state.url + '/settings'} component={Settings}/>
        </div>
      </div>
    )
  }
}

export default CSSModules(Project, styles)