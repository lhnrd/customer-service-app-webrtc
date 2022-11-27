import { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as authActions from 'src/actions/auth';
import * as socketActions from 'src/actions/socket';

class AuthProvider extends Component {
  componentDidMount() {
    const { checkAuth, connectSocket, isAuthenticated } = this.props;

    checkAuth();

    if (isAuthenticated) {
      connectSocket();
    }
  }

  componentDidUpdate() {
    const { connectSocket, isAuthenticated } = this.props;

    if (isAuthenticated) {
      connectSocket();
    }
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

AuthProvider.propTypes = {
  checkAuth: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  connectSocket: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = {
  checkAuth: authActions.checkAuth,
  connectSocket: socketActions.connectSocket,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider);
