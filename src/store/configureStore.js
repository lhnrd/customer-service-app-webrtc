import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension'; // eslint-disable-line

const configureStore = preloadedState => {
  const middlewares = [apiMiddleware, logger, thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [devToolsEnhancer(), middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const rootReducer = () => ({
    user: 'lucas',
  });
  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  // if (process.env.NODE_ENV !== 'production' && module.hot) {
  //   module.hot.accept('./reducers', () => store.replaceReducer(rootReducer));
  // }

  return store;
};

export default configureStore;
