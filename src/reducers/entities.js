import { combineReducers } from 'redux';
import serviceCalls, {
  STATE_KEY as SERVICE_CALLS_STATE_KEY,
} from './service-call';

export const STATE_KEY = 'entities';

const reducer = combineReducers({
  [SERVICE_CALLS_STATE_KEY]: serviceCalls,
});

export default reducer;
