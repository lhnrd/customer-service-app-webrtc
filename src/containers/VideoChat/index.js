import { connect } from 'react-redux';
import { compose, lifecycle, withHandlers } from 'recompose';

import { CONNECTION_STATE as RTC_CONNECTION_STATE } from 'src/reducers/rtc';
import * as rtcActions from 'src/actions/rtc';
import * as serviceCallActions from 'src/actions/service-call';

import VideoChat from './components/VideoChat';

const rtcConnectionStateSelector = state => state.rtc.connectionState;

const mapStateToProps = state => ({
  localStream: state.rtc.localStream,
  remoteStream: state.rtc.remoteStream,
  rtcConnectionState: rtcConnectionStateSelector(state),
  user: state.auth.user,
});

const mapDispatchToProps = {
  connectPeer: rtcActions.connectPeer,
  updateServiceCall: serviceCallActions.updateServiceCall,
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
    componentDidUpdate(prevProps) {
      const { rtcConnectionState, room, user, updateServiceCall } = this.props;

      if (
        rtcConnectionState !== prevProps.rtcConnectionState &&
        rtcConnectionState === RTC_CONNECTION_STATE.REQUESTED
      ) {
        updateServiceCall({ id: room, userId: user.id, startedAt: new Date() });
      }
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
