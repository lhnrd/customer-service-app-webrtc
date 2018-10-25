import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import AuthProvider from 'src/containers/AuthProvider';
import configureStore from 'src/store/configureStore';
import Global from 'src/styles/Global';
import { HOME_PATH, LOGIN_PATH } from 'src/routes/paths';
import HomeRoute from 'src/routes/HomeRoute';
import LoginPage from 'src/pages/LoginPage';
import RouteAuthenticated from 'src/containers/RouteAuthenticated';
import RouteUnauthenticated from 'src/containers/RouteUnauthenticated';

const store = configureStore();
const theme = {
  main: 'mediumseagreen',
};

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <>
            <Global />
            <Switch>
              <RouteUnauthenticated path={LOGIN_PATH} component={LoginPage} />
              <RouteAuthenticated path={HOME_PATH} component={HomeRoute} />
            </Switch>
          </>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  </Provider>
);

export default Root;
