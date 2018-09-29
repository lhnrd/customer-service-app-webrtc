import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import configureStore from './store/configureStore';
import App from './containers/App';

const store = configureStore();

const Root = () => (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
);

export default Root;
