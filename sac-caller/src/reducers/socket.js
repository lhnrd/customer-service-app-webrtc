import produce from 'immer';

import { types } from 'src/actions/socket';

const { SOCKET_OPEN_SUCCESS, SOCKET_CONN_ERROR, SOCKET_CLOSE_SUCCESS } = types;

export const STATE_KEY = 'socket';

export const state = {
  connected: false,
  error: null,
  sid: null,
};

const reducer = produce((draft, { type, payload }) => {
  switch (type) {
    case SOCKET_OPEN_SUCCESS:
      draft.connected = true;
      draft.sid = payload.sid;
      return;
    case SOCKET_CONN_ERROR:
      draft.connected = false;
      draft.error = payload.error;
      draft.sid = null;
      return;
    case SOCKET_CLOSE_SUCCESS:
      draft.connected = false;
      draft.sid = null;
    // no default
  }
}, state);

export default reducer;
