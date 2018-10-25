import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { match as matchPropType } from 'react-router-prop-types';
import { connect } from 'react-redux';

import VideoPage from 'src/pages/VideoPage';
import * as rtcActions from 'src/actions/rtc';

class VideoRoute extends Component {
  componentDidMount() {
    const {
      match: { params },
      connectPeer,
    } = this.props;

    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        connectPeer({
          room: params.id,
          stream,
        });
      },
      () => null
    );
  }

  render() {
    return <VideoPage {...this.props} />;
  }
}

VideoRoute.propTypes = {
  match: matchPropType.isRequired,
  connectPeer: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  localStream: state.rtc.localStream,
  remoteStream: state.rtc.remoteStream,
});

const mapDispatchToProps = {
  connectPeer: rtcActions.connectPeer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoRoute);
