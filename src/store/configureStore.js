import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension'; // eslint-disable-line
import io from 'socket.io-client';

import authApiMiddleware from 'src/utils/auth-api-middleware';
import createSocketMiddleware from 'src/utils/socket-middleware';
import rootReducer from 'src/reducers';

const eventsRoot = process.env.REACT_APP_EVENTS_ROOT || '';

const configureStore = preloadedState => {
  const socket = io('/manager', {
    path: eventsRoot,
    transports: ['websocket'],
    autoConnect: false,
  });
  const socketMiddleware = createSocketMiddleware(socket);
  const middlewares = [
    thunk.withExtraArgument({ socket }),
    authApiMiddleware,
    apiMiddleware,
    socketMiddleware,
    logger,
  ];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const enhancers = [middlewareEnhancer, devToolsEnhancer()];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('../reducers', () => store.replaceReducer(rootReducer));
  }

  return store;
};

export default configureStore;
