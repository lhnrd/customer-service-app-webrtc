import { combineReducers } from 'redux';

import auth, { STATE_KEY as AUTH_STATE_KEY } from './auth';
import rtc, { STATE_KEY as RTC_STATE_KEY } from './rtc';
import entities, { STATE_KEY as ENTITIES_STATE_KEY } from './entities';
import socket, { STATE_KEY as SOCKET_STATE_KEY } from './socket';

const rootReducer = combineReducers({
  [AUTH_STATE_KEY]: auth,
  [ENTITIES_STATE_KEY]: entities,
  [RTC_STATE_KEY]: rtc,
  [SOCKET_STATE_KEY]: socket,
});

export default rootReducer;
