import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import App from 'src/containers/App';
import configureStore from 'src/store/configureStore';

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
