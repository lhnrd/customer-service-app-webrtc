import io from 'socket.io-client';

import { RSSA } from 'src/constants';

const eventsRoot = process.env.REACT_APP_EVENTS_ROOT || '';

const createSocketMiddleware = () => {
  const socket = io({
    path: eventsRoot,
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    console.log('WebSocket connected.'); // eslint-disable-line
  });

  return ({ dispatch }) => {
    socket.on('test', dispatch);

    return next => action => {
      const socketAction = action[RSSA];

      if (socketAction) {
        const { event, message, ack } = socketAction;
        return socket.emit(event, message, ack);
      }

      return next(action);
    };
  };
};

export default createSocketMiddleware;
