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

const constraints = {
  video: {
    width: { max: 1920 },
    height: { max: 1920 },
  },
  audio: true,
};

const handleError = error => {
  if (error.name === 'ConstraintNotSatisfiedError') {
    const v = constraints.video;
    console.log(
      `The resolution ${v.width.exact}x${
        v.height.exact
      } px is not supported by your device.`
    );
  } else if (error.name === 'PermissionDeniedError') {
    console.log(
      'Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.'
    );
  }
  console.log(`getUserMedia error: ${error.name}`, error);
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
        .getUserMedia(constraints)
        .then(stream => connectPeer({ room, stream }))
        .catch(handleError);
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
