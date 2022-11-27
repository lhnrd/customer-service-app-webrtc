import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { LOGIN_PATH } from 'src/routes/paths';
import { isAuthenticatedSelector } from 'src/selectors/auth';

const RouteAuthenticated = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  if (!isAuthenticated) {
    return <Redirect to={LOGIN_PATH} {...rest} />;
  }

  return <Route {...rest} component={Component} />;
};

RouteAuthenticated.propTypes = {
  component: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isAuthenticated: isAuthenticatedSelector(state),
});

export default connect(mapStateToProps)(RouteAuthenticated);
