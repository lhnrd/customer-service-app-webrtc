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
      peerConnectTo,
    } = this.props;

    navigator.getUserMedia(
      { video: true, audio: true },
      stream => {
        peerConnectTo({
          id: params.id,
          stream,
        });
      },
      () => null
    );
  }

  render() {
    return <VideoPage />;
  }
}

VideoRoute.propTypes = {
  match: matchPropType.isRequired,
  peerConnectTo: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  peerConnectTo: rtcActions.peerConnectTo,
};

export default connect(
  null,
  mapDispatchToProps
)(VideoRoute);
