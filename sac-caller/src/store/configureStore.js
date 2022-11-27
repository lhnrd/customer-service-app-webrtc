import { applyMiddleware, compose, createStore } from 'redux';
import { apiMiddleware } from 'redux-api-middleware';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { devToolsEnhancer } from 'redux-devtools-extension'; // eslint-disable-line
import io from 'socket.io-client';

import createSocketMiddleware from 'src/utils/socket-middleware';
import rtcMiddleware from 'src/utils/rtc-middleware';
import rootReducer from 'src/reducers';

const eventsRoot = process.env.REACT_APP_EVENTS_ROOT || '';

const configureStore = preloadedState => {
  const socket = io('/caller', {
    path: eventsRoot,
    transports: ['websocket'],
    autoConnect: true,
    reconnection: false,
  });
  const socketMiddleware = createSocketMiddleware(socket);
  const middlewares = [
    thunk.withExtraArgument({ socket }),
    apiMiddleware,
    socketMiddleware,
    rtcMiddleware,
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
