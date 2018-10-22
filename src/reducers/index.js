import { combineReducers } from 'redux';

import auth from './auth';
import socket from './socket';

const rootReducer = combineReducers({
  auth,
  socket,
});

export default rootReducer;
