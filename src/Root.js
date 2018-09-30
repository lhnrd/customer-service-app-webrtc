import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import configureStore from './store/configureStore';
import App from './containers/App';

const store = configureStore();
const theme = {
  main: 'mediumseagreen',
};

const Root = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
);

export default Root;
