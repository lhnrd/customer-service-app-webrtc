import React, { Fragment } from 'react';
import { Switch } from 'react-router-dom';

import { APP_PATH, LOGIN_PATH } from 'src/routes/paths';
import Global from 'src/styles/Global';
import HomePage from 'src/pages/HomePage';
import LoginPage from 'src/pages/LoginPage';
import RouteAuthenticated from 'src/components/RouteAuthenticated';
import RouteUnauthenticated from 'src/components/RouteUnauthenticated';

const App = () => (
  <Fragment>
    <Global />
    <Switch>
      <RouteUnauthenticated path={LOGIN_PATH} component={LoginPage} />
      <RouteAuthenticated path={APP_PATH} component={HomePage} />
    </Switch>
  </Fragment>
);

export default App;
