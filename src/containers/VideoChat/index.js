import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';

import * as rtcActions from 'src/actions/rtc';

import VideoChat from './components/VideoChat';

const mapStateToProps = state => ({
  localStream: state.rtc.localStream,
  remoteStream: state.rtc.remoteStream,
});

const mapDispatchToProps = {
  connectPeer: rtcActions.connectPeer,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      const { room, connectPeer } = this.props;

      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { max: 1920 },
            height: { max: 1920 },
          },
          audio: true,
        })
        .then(stream => {
          connectPeer({ room, stream });
        });
    },
    componentWillUnmount() {
      const { localStream } = this.props;
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    },
  }),
  withHandlers({
    onClickHangUp: ({ onHangUp }) => () => onHangUp(null),
  })
)(VideoChat);
