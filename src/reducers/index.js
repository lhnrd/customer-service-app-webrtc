import { combineReducers } from 'redux';

import auth, { STATE_KEY as AUTH_STATE_KEY } from './auth';
import rtc, { STATE_KEY as RTC_STATE_KEY } from './rtc';
import serviceCalls, {
  STATE_KEY as SERVICE_CALLS_STATE_KEY,
} from './service-call';
import socket, { STATE_KEY as SOCKET_STATE_KEY } from './socket';

const rootReducer = combineReducers({
  [AUTH_STATE_KEY]: auth,
  [RTC_STATE_KEY]: rtc,
  [SERVICE_CALLS_STATE_KEY]: serviceCalls,
  [SOCKET_STATE_KEY]: socket,
});

export default rootReducer;
