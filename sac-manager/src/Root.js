import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { grommet } from 'grommet/themes';
import { Grommet } from 'grommet';

import AuthProvider from 'src/containers/AuthProvider';
import configureStore from 'src/store/configureStore';
import Global from 'src/styles/Global';
import { APP_PATH, LOGIN_PATH } from 'src/routes/paths';
import AppRoute from 'src/routes/AppRoute';
import LoginPage from 'src/pages/LoginPage';
import RouteAuthenticated from 'src/containers/RouteAuthenticated';
import RouteUnauthenticated from 'src/containers/RouteUnauthenticated';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Grommet theme={grommet}>
      <AuthProvider>
        <Router>
          <>
            <Global />
            <Switch>
              <RouteUnauthenticated path={LOGIN_PATH} component={LoginPage} />
              <RouteAuthenticated path={APP_PATH} component={AppRoute} />
            </Switch>
          </>
        </Router>
      </AuthProvider>
    </Grommet>
  </Provider>
);

export default Root;
