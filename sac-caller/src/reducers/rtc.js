import immerReducer from 'src/utils/immer-reducer';
import { types } from 'src/actions/rtc';

const {
  PEER_CONNECT,
  PEER_SET,
  STREAM_SET,
  SIGNAL_RECEIVE,
  SIGNAL_SEND,
} = types;

export const STATE_KEY = 'rtc';

export const CONNECTION_STATE = {
  REQUESTED: 'REQUESTED',
  DISCONNECTED: 'DISCONNECTED',
  SIGNAL_SENT: 'SIGNAL_SENT',
  SIGNAL_RECEIVED: 'SIGNAL_RECEIVED',
  CONNECTED: 'CONNECTED',
  CONNECTED_STREAM: 'CONNECTED_STREAM',
};

export const initialState = {
  connectionState: CONNECTION_STATE.DISCONNECTED,
  error: null,
  peer: null,
  localStream: null,
  remoteStream: null,
};

const reducer = immerReducer(
  {
    [PEER_CONNECT]: (state, payload) => {
      state.localStream = payload.stream;
      state.connectionState = CONNECTION_STATE.REQUESTED;
    },
    [PEER_SET]: (state, payload) => {
      state.peer = payload.peer;
      state.connectionState = CONNECTION_STATE.CONNECTED;
    },
    [SIGNAL_SEND]: state => {
      state.connectionState = CONNECTION_STATE.SIGNAL_SENT;
    },
    [SIGNAL_RECEIVE]: state => {
      state.connectionState = CONNECTION_STATE.SIGNAL_RECEIVED;
    },
    [STREAM_SET]: (state, payload) => {
      state.remoteStream = payload.stream;
      state.connectionState = CONNECTION_STATE.CONNECTED_STREAM;
    },
  },
  initialState
);

export default reducer;
