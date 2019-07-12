import React from 'react'
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {
  componentDidMount() {
    this.player = videojs(this.videoNode, this.props, function onPlayerReady() {
      console.log('onPlayerReady', this)
    })
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose()
    }
  }

  // wrap the player in a div with a `data-vjs-player` attribute
  // so videojs won't create additional wrapper in the DOM
  // see https://github.com/videojs/video.js/pull/3856
  render() {
    return (
      <div>
        <div data-vjs-player>
          <video
            ref={node => (this.videoNode = node)}
            style={this.props.style}
            className="video-js"
          >
            抱歉，您的浏览器不支持内嵌视频
          </video>
        </div>
      </div>
    )
  }
}
