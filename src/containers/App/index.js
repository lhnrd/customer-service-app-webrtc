import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button } from 'antd';

import { APP_PATH, LOGIN_PATH } from 'src/routes/paths';
import LoginPage from 'src/pages/LoginPage';
import Global from 'src/styles/Global';

const App = () => (
  <Fragment>
    <Global />
    <Switch>
      <Route path={LOGIN_PATH} component={LoginPage} />
      <Route
        path={APP_PATH}
        render={() => (
          <div>
            <Button>Test</Button>
          </div>
        )}
      />
    </Switch>
  </Fragment>
);

export default App;
