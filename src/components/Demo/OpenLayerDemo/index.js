import React, { Component } from 'react'
import { Card, Col, Row } from 'antd'
import Map from 'ol/Map'
import View from 'ol/View'
import OSM from 'ol/source/OSM'
import {
  Heatmap as HeatmapLayer,
  Tile as TileLayer,
  Vector as VectorLayer
} from 'ol/layer'
import VectorSource from 'ol/source/Vector.js'
import KML from 'ol/format/KML.js'
import Feature from 'ol/Feature'
import { Point } from 'ol/geom'
import { transform } from 'ol/proj'
import Stamen from 'ol/source/Stamen.js'
// import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import 'ol/ol.css'

import CustomBreadcrumb from '@common/CustomBreadcrumb'
import TypingCard from '@common/TypingCard'
import styles from './index.module.less'

class index extends Component {
  constructor(props) {
    super(props)
    this.map = null
    this.map2 = null
    this.referenceLayer = new VectorLayer({
      source: new VectorSource()
    })
  }

  render() {
    const cardContent = `<ul class="card-ul">
            <li>OpenLayers 是一个专为Web GIS 客户端开发提供的JavaScript 类库包，用于实现标准格式发布的地图数据访问。openlayers2与openlayers3以后的API完全不同，目前版本是5.3.0</li>
            <li>安装OpenLayer依赖， yarn add ol</li>
            <li>具体使用参见<a href="https://openlayers.org/" target="#">OpenLayer官网</a></li>
            <li>使用地图时注意地图的<a href="http://weilin.me/ol3-primer/ch04/04-03.html" target="#">坐标系</a>是哪种,示例中两个地图坐标系为3857</li>
            <li>配合热力图的使用</li>
        </ul>`
    return (
      <div className={styles.olPage}>
        <CustomBreadcrumb arr={['OpenLayer Demo']} />
        <TypingCard source={cardContent} id="howUse" title="使用说明" />
        <Row gutter={20}>
          <Col span={24}>
            <Card
              hoverable
              bordered={false}
              title="基于KML格式数据生成热力图"
              style={{ minHeight: 400 }}
              id="1"
            >
              <div
                id="map"
                style={{
                  width: '100%',
                  height: '400px',
                  position: 'relative'
                }}
              />
            </Card>
          </Col>
        </Row>
        <Row gutter={20}>
          <Col span={24}>
            <Card
              hoverable
              bordered={false}
              title="通过坐标点和权值生成热力图"
              style={{ minHeight: 400 }}
              id="2"
            >
              <div
                id="map2"
                style={{
                  width: '100%',
                  height: '400px',
                  position: 'relative'
                }}
              />
            </Card>
          </Col>
        </Row>
      </div>
    )
  }

  componentDidMount() {
    this.init()
    this.init2()
  }

  init = () => {
    const vector = new HeatmapLayer({
      source: new VectorSource({
        url: require('./earth.kml'),
        format: new KML({
          extractStyles: false
        })
      }),
      blur: parseInt(5, 10),
      radius: parseInt(5, 10)
    })
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vector
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    })

    setTimeout(() => {
      this.map.updateSize()
    })
  }

  init2 = () => {
    //创建热力图层
    const vector = new HeatmapLayer({
      gradient: ['#00f', '#0ff', '#0f0', '#ff0', '#f00'],
      blur: 10,
      radius: 10,
      shadow: 250,
      source: new VectorSource({
        wrapX: false
      })
    })
    this.map = new Map({
      target: 'map2',
      layers: [
        new TileLayer({
          source: new Stamen({
            layer: 'toner'
          })
        }),
        vector
      ],
      view: new View({
        center: transform([121.586159, 38.9015801], 'EPSG:4326', 'EPSG:3857'),
        zoom: 17
      })
    })
    //创建要素
    let features = []
    const _dataArray = require('./data.json')
    // console.log(_dataArray)
    _dataArray.forEach(data => {
      const _feature = new Feature({
        geometry: new Point(
          transform(data.coordinate, 'EPSG:4326', 'EPSG:3857')
        ),
        data: data,
        weight: data.weight
      })
      features.push(_feature)
    })

    //将要素添加到热力图层的source中
    vector.getSource().addFeatures(features)
  }
}

export default index
