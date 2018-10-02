import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { HOME_PATH } from 'src/routes/paths';
import { selectIsAuthenticated } from 'src/selectors';

const RouteUnauthenticated = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  if (isAuthenticated) {
    return <Redirect to={HOME_PATH} {...rest} />;
  }

  return <Route {...rest} component={Component} />;
};

RouteUnauthenticated.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: selectIsAuthenticated(state),
});

export default connect(mapStateToProps)(RouteUnauthenticated);
