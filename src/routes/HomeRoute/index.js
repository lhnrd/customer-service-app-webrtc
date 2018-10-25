import { compose, lifecycle } from 'recompose';
import { connect } from 'react-redux';

import HomePage from 'src/pages/HomePage';
import * as socketActions from 'src/actions/socket';

const mapDispatchToProps = {
  connectSocket: socketActions.connectSocket,
};

export default compose(
  connect(
    null,
    mapDispatchToProps
  ),
  lifecycle({
    componentDidMount() {
      this.props.connectSocket();
    },
  })
)(HomePage);
