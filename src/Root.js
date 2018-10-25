import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import Global from 'src/styles/Global';
import HomeRoute from 'src/routes/HomeRoute';
import { HOME_PATH } from 'src/routes/paths';
import configureStore from 'src/store/configureStore';

const store = configureStore();
const theme = {
  main: 'mediumseagreen',
};

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <>
          <Global />
          <Switch>
            <Route path={HOME_PATH} component={HomeRoute} />
          </Switch>
        </>
      </Router>
    </ThemeProvider>
  </Provider>
);

export default Root;
