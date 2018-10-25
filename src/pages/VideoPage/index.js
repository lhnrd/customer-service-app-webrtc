/* eslint-disable */
import React, { Component, createRef } from 'react';

class VideoPage extends Component {
  constructor(props) {
    super(props);

    this.localVideoRef = createRef();
    this.remoteVideoRef = createRef();
  }

  componentDidUpdate() {
    const { localStream, remoteStream } = this.props;

    if (remoteStream) {
      this.remoteVideoRef.current.srcObject = remoteStream;
    }
  }

  render() {
    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'fixed',
          top: '0',
          left: '0',
        }}
      >
        <video
          style={{ width: '50%', height: '50%' }}
          ref={this.localVideoRef}
          autoPlay
          muted
        />
        <video
          style={{ width: '50%', height: '50%' }}
          ref={this.remoteVideoRef}
          autoPlay
          muted
        />
      </div>
    );
  }
}

VideoPage.propTypes = {};

VideoPage.defaultProps = {};

export default VideoPage;
