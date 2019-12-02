import React from 'react'
import TodayChart from './TodayChart.js'
import CompareChart from './CompareChart.js'
import IntersectionList from './IntersectionList.js'
import ZhddChart from './ZhddChart.js'
import KeyFocusIntersection from './KeyFocusIntersection.js'
import KeyFocusRoad from './KeyFocusRoad.js'
import { todaydata, comparedata,intersectionList,intersectionBasic } from './data.js'

class index extends React.Component {
  render() {
    return (
      <div>
        <TodayChart ref="todayChart" />
        <CompareChart ref="compareChart" />
      </div>
    );
  }
  componentDidMount() {
    this.refs.todayChart.setData(todaydata)
    this.refs.compareChart.setData(comparedata)
    //this.refs.intersection.setData(intersectionList,intersectionBasic)
  }
  tabClickHandler(intersection_id) {
    alert("intersection_id:" + intersection_id);
  }
  //<TodayChart ref="todayChart"/>
  // <CompareChart ref="compareChart"/>
  //<IntersectionList ref="intersection" clickHandler={this.tabClickHandler} />
  //<ZhddChart ref="zhddChart"  />
  //<KeyFocusIntersection chartTitle="平衡指数排名" />
  // <KeyFocusRoad chartTitle="流量排名" chartTitle2="受阻指数排名" />
}
export default index
