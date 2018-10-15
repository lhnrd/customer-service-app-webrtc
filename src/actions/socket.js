import createConstants from 'src/utils/create-constants';

const createAuthConstants = createConstants('@@auth/');

export const types = createAuthConstants(
  'SOCKET_OPEN_REQUEST',
  'SOCKET_OPEN_SUCCESS',
  'SOCKET_CLOSE_REQUEST',
  'SOCKET_CLOSE_SUCCESS',
  'SOCKET_CONN_ERROR'
);

const {
  SOCKET_OPEN_REQUEST,
  // SOCKET_OPEN_SUCCESS,
  // SOCKET_CLOSE_REQUEST,
  // SOCKET_CLOSE_SUCCESS,
  // SOCKET_CONN_ERROR,
} = types;

export const connectSocket = () => ({
  type: SOCKET_OPEN_REQUEST,
});
