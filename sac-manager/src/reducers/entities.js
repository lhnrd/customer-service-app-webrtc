import { combineReducers } from 'redux';
import customers, { STATE_KEY as CUSTOMERS_STATE_KEY } from './customers';
import serviceCalls, {
  STATE_KEY as SERVICE_CALLS_STATE_KEY,
} from './service-call';

export const STATE_KEY = 'entities';

const reducer = combineReducers({
  [CUSTOMERS_STATE_KEY]: customers,
  [SERVICE_CALLS_STATE_KEY]: serviceCalls,
});

export default reducer;
