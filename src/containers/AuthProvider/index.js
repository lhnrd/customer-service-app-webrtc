import { Children, Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as authActions from 'src/actions/auth';

class AuthProvider extends Component {
  componentWillMount() {
    const { checkAuth } = this.props;
    checkAuth();
  }

  render() {
    const { children } = this.props;
    return Children.only(children);
  }
}

AuthProvider.propTypes = {
  checkAuth: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const mapStateToProps = state => ({
  checking: state.isFetching,
});

const mapDispatchToProps = {
  checkAuth: authActions.checkAuth,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthProvider);
