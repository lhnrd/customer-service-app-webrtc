import immerReducer from 'src/utils/immer-reducer';
import { types } from 'src/actions/rtc';

const { PEER_SET, SIGNAL_SEND, STREAM_SET } = types;

export const STATE_KEY = 'rtc';

export const initialState = {
  connecting: false,
  error: null,
  peer: null,
  stream: null,
};

const reducer = immerReducer(
  {
    [PEER_SET]: (state, payload) => {
      state.peer = payload;
      state.connecting = false;
    },
    [SIGNAL_SEND]: state => {
      state.connecting = true;
    },
    [STREAM_SET]: (state, payload) => {
      state.stream = payload;
    },
  },
  initialState
);

export default reducer;
