import { combineReducers } from 'redux';

import rtc, { STATE_KEY as RTC_STATE_KEY } from './rtc';
import socket, { STATE_KEY as SOCKET_STATE_KEY } from './socket';

const rootReducer = combineReducers({
  [RTC_STATE_KEY]: rtc,
  [SOCKET_STATE_KEY]: socket,
});

export default rootReducer;
