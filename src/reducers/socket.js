import produce from 'immer';

import { types } from 'src/actions/socket';

const { SOCKET_OPEN_SUCCESS, SOCKET_CONN_ERROR, SOCKET_CLOSE_SUCCESS } = types;

const socketReducer = (
  state = {
    connected: false,
    error: null,
    sid: null,
  },
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case SOCKET_OPEN_SUCCESS:
        draft.connected = true;
        draft.sid = action.payload.sid;
        return;
      case SOCKET_CONN_ERROR:
        draft.connected = false;
        draft.error = action.payload.error;
        draft.sid = null;
        return;
      case SOCKET_CLOSE_SUCCESS:
        draft.connected = false;
        draft.sid = null;
      // no default
    }
  });

export default socketReducer;
