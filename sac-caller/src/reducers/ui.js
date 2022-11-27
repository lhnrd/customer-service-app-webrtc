import { combineReducers } from 'redux';
import { types } from 'src/actions/service-call';

export const STATE_KEY = 'ui';

const activeServiceCall = (state = null, { type, payload }) => {
  switch (type) {
    case types.SERVICE_CALL_SET_ACTIVE: {
      const { serviceCallId } = payload;
      return serviceCallId;
    }
    default:
      return state;
  }
};

const reducer = combineReducers({
  activeServiceCall,
});

export default reducer;
