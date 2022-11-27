import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { DASHBOARD_PATH } from 'src/routes/paths';
import { isAuthenticatedSelector } from 'src/selectors/auth';

const RouteUnauthenticated = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  if (isAuthenticated) {
    return <Redirect to={DASHBOARD_PATH} {...rest} />;
  }

  return <Route {...rest} component={Component} />;
};

RouteUnauthenticated.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
});

export default connect(mapStateToProps)(RouteUnauthenticated);
