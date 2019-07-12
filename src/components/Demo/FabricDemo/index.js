import React, { Component } from 'react'
import { fabric } from 'fabric'
import { Card, Col, Row } from 'antd'

import CustomBreadcrumb from '@common/CustomBreadcrumb'
import TypingCard from '@common/TypingCard'
import photo from '@assets/setup.jpg'

class index extends Component {
  render() {
    const cardContent = `<ul class="card-ul">
            <li>Fabric使用html5 的canvas画板做一些图片旋转，拖动，放大，缩小和合成图片</li>
            <li>安装Fabric依赖， yarn add fabric</li>
            <li>具体使用参见<a href="http://fabricjs.com/" target="#">Fabric官网</a></li>
        </ul>`
    return (
      <div>
        <CustomBreadcrumb arr={['Fabric Demo']} />
        <TypingCard source={cardContent} id="howUse" title="使用说明" />
        <Row gutter={20}>
          <Col span={12}>
            <Card
              hoverable
              bordered={false}
              title="基础图形"
              style={{ minHeight: 400 }}
              id="1"
            >
              <canvas id="c" />
            </Card>
          </Col>
          <Col span={12}>
            <Card
              hoverable
              bordered={false}
              title="图片加载"
              style={{ minHeight: 400 }}
              id="2"
            >
              <canvas id="c2" />
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

  init() {
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center'

    var canvas = new fabric.Canvas('c', {
      selection: false,
      width: 800,
      height: 400
    })
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: '#D81B60',
      width: 50,
      height: 50,
      strokeWidth: 2,
      stroke: '#880E4F',
      rx: 10,
      ry: 10,
      angle: 45,
      scaleX: 3,
      scaleY: 3,
      hasControls: true
    })

    canvas.add(rect)

    var circle1 = new fabric.Circle({
      radius: 65,
      fill: '#039BE5',
      left: 300,
      top: 100,
      stroke: 'red',
      strokeWidth: 3
    })

    var circle2 = new fabric.Circle({
      radius: 65,
      fill: '#4FC3F7',
      left: 500,
      top: 100,
      opacity: 0.7,
      stroke: 'blue',
      strokeWidth: 3,
      strokeUniform: true
    })

    canvas.add(circle1)
    canvas.add(circle2)
  }

  init2 = () => {
    fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center'
    var canvas = new fabric.Canvas('c2', {
      selection: false,
      width: 800,
      height: 400
    })
    fabric.Object.prototype.transparentCorners = false
    fabric.Image.fromURL(photo, function(img) {
      img.scale(0.3).set({
        left: 200,
        top: 200,
        angle: -15,
        // clipTo: function(ctx) {
        //   ctx.arc(0, 0, radius, 0, Math.PI * 2, true)
        // }
      })
      canvas.add(img).setActiveObject(img)
    })
  }
}

export default index
