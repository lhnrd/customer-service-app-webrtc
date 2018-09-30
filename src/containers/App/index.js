import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Button } from 'antd';

import { APP_PATH, LOGIN_PATH } from 'src/routes/paths';

const App = () => (
  <div id="app">
    <Switch>
      <Route path={LOGIN_PATH} render={() => <div>Login</div>} />
      <Route
        path={APP_PATH}
        render={() => (
          <div>
            <Button>Test</Button>
          </div>
        )}
      />
    </Switch>
  </div>
);

export default App;
