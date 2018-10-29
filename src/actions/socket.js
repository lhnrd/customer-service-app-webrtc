import createConstants from 'src/utils/create-constants';

export const types = createConstants('@socket/')(
  'SOCKET_OPEN_REQUEST',
  'SOCKET_OPEN_SUCCESS',
  'SOCKET_CLOSE_REQUEST',
  'SOCKET_CLOSE_SUCCESS',
  'SOCKET_CONN_ERROR',
  'FSA',
  'RSSA'
);

const { SOCKET_OPEN_REQUEST } = types;

export const connectSocket = () => ({
  type: SOCKET_OPEN_REQUEST,
});
