import { combineReducers } from 'redux';

import entities, { STATE_KEY as ENTITIES_STATE_KEY } from './entities';
import rtc, { STATE_KEY as RTC_STATE_KEY } from './rtc';
import socket, { STATE_KEY as SOCKET_STATE_KEY } from './socket';
import ui, { STATE_KEY as UI_STATE_KEY } from './ui';

const rootReducer = combineReducers({
  [ENTITIES_STATE_KEY]: entities,
  [RTC_STATE_KEY]: rtc,
  [SOCKET_STATE_KEY]: socket,
  [UI_STATE_KEY]: ui,
});

export default rootReducer;
