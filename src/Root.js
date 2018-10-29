import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { grommet } from 'grommet/themes';
import { Grommet } from 'grommet';

import AppRoute from 'src/routes/AppRoute';
import { APP_PATH } from 'src/routes/paths';
import configureStore from 'src/store/configureStore';
import Global from 'src/styles/Global';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Grommet theme={grommet}>
      <Router>
        <>
          <Global />
          <Switch>
            <Route path={APP_PATH} component={AppRoute} />
          </Switch>
        </>
      </Router>
    </Grommet>
  </Provider>
);

export default Root;
