import React from 'react';
import { Route, Switch } from 'react-router-dom';

import { HOME_PATH } from 'src/routes/paths';
import Global from 'src/styles/Global';
import HomePage from 'src/pages/HomePage';

const App = () => (
  <>
    <Global />
    <Switch>
      <Route path={HOME_PATH} component={HomePage} />
    </Switch>
  </>
);

export default App;
