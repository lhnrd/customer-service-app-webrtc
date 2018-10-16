import io from 'socket.io-client';

import { FSA, RSSA } from 'src/constants';

const eventsRoot = process.env.REACT_APP_EVENTS_ROOT || '';

const createSocketMiddleware = () => {
  const socket = io('/caller', {
    path: eventsRoot,
    transports: ['websocket'],
  });
  socket.on('connect', () => {
    console.log('WebSocket connected.'); // eslint-disable-line
  });

  return ({ dispatch }) => {
    socket.on(FSA, dispatch);

    return next => action => {
      const socketAction = action[RSSA];

      if (socketAction) {
        const { ack, event, message, optimistic } = socketAction;
        message.meta = {
          ...message.meta,
          sid: socket.id,
        };
        socket.emit(event || FSA, message, ack);
        if (optimistic) {
          next(message);
        }
        return;
      }

      next(action);
    };
  };
};

export default createSocketMiddleware;
