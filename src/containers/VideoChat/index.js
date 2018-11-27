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
  disconnectPeer: rtcActions.disconnectPeer,
  updateServiceCall: serviceCallActions.updateServiceCall,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withHandlers({
    onClickHangUp: ({ disconnectPeer, localStream }) => () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
      disconnectPeer();
    },
  }),
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
      const {
        onHangUp,
        rtcConnectionState,
        room,
        user,
        updateServiceCall,
      } = this.props;

      if (
        rtcConnectionState !== prevProps.rtcConnectionState &&
        rtcConnectionState === RTC_CONNECTION_STATE.CONNECTED
      ) {
        updateServiceCall({ id: room, userId: user.id, startedAt: new Date() });
      }

      if (
        prevProps.rtcConnectionState === RTC_CONNECTION_STATE.CONNECTED &&
        rtcConnectionState === RTC_CONNECTION_STATE.DISCONNECTED
      ) {
        updateServiceCall({ id: room, endedAt: new Date() });
        onHangUp();
      }
    },
  })
)(VideoChat);
