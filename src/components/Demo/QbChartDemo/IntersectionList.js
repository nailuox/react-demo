import React from 'react'
import { Col, Row, Table, Spin } from 'antd'
import {intersectionList,intersectionBasic} from './data.js'

import styles from './index.module.less'

class IntersectionList extends React.Component{
  constructor(props){
    super(props)
    this.state={
      listInfo:[],
      basicInfo:''
    }
  }

  render(){
    const{listInfo,basicInfo}=this.state
    //const{clickHandler}=this.props
    const columns=[
      {
        title: <div className={styles.thWordBig}>重点关注路口</div>,
        dataIndex: 'intersection_name',
        //width: 141,
        //height:20
        //className:'styles.bigwz'
        render:(text)=> <div><div className={styles.circle}></div><div className={styles.tdWord}>{text}</div></div>
        //render:(text)=>{ return <div className={styles.bigwz}>{text}</div>}
      },
      {
        title: <div className={styles.thWordBig}>周期流量</div>,
        //width: 180,
        //height:21,
        children:[
          {
            title: <div className={styles.thWordSmall}>5分钟</div>,
            dataIndex: 'flow.5m',
            render:(text)=><div className={styles.tdWord2}>{text}</div>
            //width: 37,
            //height:16
          },
          {
            title: <div className={styles.thWordSmall}>15分钟</div>,
            dataIndex: 'flow.15m',
            render:(text)=><div className={styles.tdWord2}>{text}</div>
            //width: 46,
            //height:15
          },
          {
            title: <div className={styles.thWordSmall}>1小时</div>,
            dataIndex: 'flow.1h',
            render:(text)=><div className={styles.tdWord2}>{text}</div>
            //width: 38,
            //height:15
          },
          {
            title: <div className={styles.thWordSmall}>0点起</div>,
            dataIndex: 'flow.0h',
            render:(text)=><div className={styles.tdWord2}>{text}</div>
            //width: 39,
            //height:16
          }
        ]
      },
      {
        title: <div className={styles.thWordBig2}>饱和度</div>,
        //width: 69,
        //height:20,
        children:[
          {
            title: <div className={styles.thWordSmall2}>当前</div>,
            dataIndex: 'saturation.5m',
            render:(text)=><div className={styles.tdWord3}>{text}</div>
            //width: 29,
            //height:15
          },
          {
            title: <div className={styles.thWordSmall2}>15分前</div>,
            dataIndex: 'saturation.15m',
            render:(text)=><div className={styles.tdWord3}>{text}</div>
            //width: 47,
            //height:16
          }
        ]
      }
    ]
    return(
      <div className={ styles.main}  ref="intersection">
        <div>
          <Row>
            <Col span={5}>
              <div className={styles.headWord}>总数量</div>
            </Col>
            <Col span={5}>
              <div className={styles.headWord}>饱和度>{basicInfo.saturation_limit}</div>
            </Col>
            <Col span={5}>
              <div className={styles.headWord}>失衡数量</div>
            </Col>
            <Col span={5}>
              <div className={styles.headWord}>突发性拥堵</div>
            </Col>
            <Col span={4}>
              <div className={styles.headWord}>周期性拥堵</div>
            </Col>
          </Row>
          <Row>
            <Col span={5}>
              <div className={styles.headNum}>{basicInfo.tatal}</div>
            </Col>
            <Col span={5}>
              <div className={styles.headNum}>{basicInfo.saturation_num}</div>
            </Col>
            <Col span={5}>
              <div className={styles.headNum}>{basicInfo.unbalance_num}</div>
            </Col>
            <Col span={5}>
              <div className={styles.headNum}>{basicInfo.busty_num}</div>
            </Col>
            <Col span={4}>
              <div className={styles.headNum}>{basicInfo.cycle_num}</div>
            </Col>
          </Row>
        </div>
        <div>
              <Table
                  rowKey="intersection_id"
                  defaultExpandAllRows={true}
                  bordered={false}
                  className={styles.reacorListTable}
                  dataSource={listInfo}
                  pagination={false}
                  columns={columns}
                  onRow={(record,index)=>{
                    return {
                      onClick: event => {this.props.clickHandler(record.intersection_id)},
                    }
                  }}
                >
                </Table>
        </div>
      </div>
    )
  }
  componentDidMount(){
    //this.setData()
  }

  setData = (
    listData = new Array(7).fill(0),
    basicData={}
    ) => {
    this.setState({
       listInfo:listData,
       basicInfo:basicData
       })
  }

  // clickHandler=(intersection_id)=>{
  //   alert(intersection_id)
  // }


}


export default IntersectionList
