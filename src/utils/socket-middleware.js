import io from 'socket.io-client';

import { types } from 'src/actions/socket';
import { FSA, RSSA } from 'src/constants';

const eventsRoot = process.env.REACT_APP_EVENTS_ROOT || '';
const {
  SOCKET_OPEN_REQUEST,
  SOCKET_OPEN_SUCCESS,
  SOCKET_CLOSE_REQUEST,
  SOCKET_CLOSE_SUCCESS,
  SOCKET_CONN_ERROR,
} = types;

const createSocketMiddleware = () => {
  const socket = io('/manager', {
    path: eventsRoot,
    transports: ['websocket'],
    autoConnect: false,
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

      switch (action.type) {
        case SOCKET_OPEN_REQUEST:
          socket.connect();

          socket.on('connect', () =>
            dispatch({
              type: SOCKET_OPEN_SUCCESS,
              payload: { sid: socket.id },
            })
          );
          socket.on('disconnect', () =>
            dispatch({ type: SOCKET_CLOSE_SUCCESS })
          );
          socket.on('error', error =>
            dispatch({ type: SOCKET_CONN_ERROR, payload: { error } })
          );

          break;
        case SOCKET_CLOSE_REQUEST:
          socket.disconnect();
          break;
        case SOCKET_CONN_ERROR:
          socket.open();
          break;
        case SOCKET_CLOSE_SUCCESS:
          break;
        default:
          break;
      }

      next(action);
    };
  };
};

export default createSocketMiddleware;
