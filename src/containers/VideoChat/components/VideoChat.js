import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';
import { Button, Box, Layer } from 'grommet';
import { Stretch } from 'styled-loaders-react';

import LocalVideoChatOverlay from '../styles/LocalVideoChatOverlay';

class VideoChat extends Component {
  constructor(props) {
    super(props);

    this.localVideoRef = createRef();
    this.remoteVideoRef = createRef();
  }

  componentDidUpdate() {
    const { localStream, remoteStream } = this.props;

    if (localStream) {
      this.localVideoRef.current.srcObject = localStream;
    }

    if (remoteStream) {
      this.remoteVideoRef.current.srcObject = remoteStream;
    }
  }

  render() {
    const { localStream, remoteStream, onClickHangUp } = this.props;
    return (
      <Layer
        position="center"
        margin="large"
        style={{
          backgroundColor: 'transparent',
          height: '100%',
          overflow: 'hidden',
        }}
        modal
        full
      >
        <Box
          align="center"
          justify="center"
          background="#000"
          overflow="hidden"
          elevation="xlarge"
          round
          fill
        >
          {remoteStream ? (
            <video
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                transform: 'scaleX(-1)',
              }}
              ref={this.remoteVideoRef}
              autoPlay
              muted
            />
          ) : (
            <Stretch color="#7D4CDB" size="100px" />
          )}
          <LocalVideoChatOverlay>
            <Box
              align="center"
              justify="center"
              background="#000"
              elevation="xlarge"
              style={{ position: 'absolute', bottom: '24px', right: '24px' }}
              overflow="hidden"
              height="small"
              width="medium"
              round
            >
              {localStream ? (
                <video
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    transform: 'scaleX(-1)',
                  }}
                  ref={this.localVideoRef}
                  autoPlay
                  muted
                />
              ) : (
                <Stretch color="#7D4CDB" size="100px" />
              )}
            </Box>
            <Button
              color="status-critical"
              label="Hang up"
              style={{
                position: 'absolute',
                bottom: '24px',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
              onClick={onClickHangUp}
              primary
            />
          </LocalVideoChatOverlay>
        </Box>
      </Layer>
    );
  }
}

VideoChat.propTypes = {
  localStream: PropTypes.shape({
    id: PropTypes.string,
  }),
  remoteStream: PropTypes.shape({
    id: PropTypes.string,
  }),
  onClickHangUp: PropTypes.func,
};

VideoChat.defaultProps = {
  localStream: null,
  remoteStream: null,
  onClickHangUp: null,
};

export default VideoChat;
