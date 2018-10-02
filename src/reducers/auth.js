import produce from 'immer';

import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
} from 'src/actions/auth';
import els from 'src/utils/expirable-local-storage';
import { AUTH_TOKEN_KEY } from 'src/constants';

const authReducer = (
  state = {
    errorMessage: null,
    isAuthenticated: !!els.get(AUTH_TOKEN_KEY),
    isFetching: false,
    user: null,
  },
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_REQUEST:
        draft.isAuthenticated = false;
        draft.isFetching = true;
        return;
      case AUTH_SUCCESS:
        if (els.set(AUTH_TOKEN_KEY, action.payload.token)) {
          draft.errorMessage = null;
          draft.isAuthenticated = true;
          draft.isFetching = false;
          draft.user = action.payload.user;
        }
        return;
      case AUTH_FAILURE:
      case CHECK_AUTH_FAILURE:
        draft.errorMessage = action.payload.message;
        draft.isAuthenticated = false;
        draft.isFetching = false;
        return;
      case CHECK_AUTH_REQUEST:
        draft.isFetching = true;
        return;
      case CHECK_AUTH_SUCCESS:
        draft.errorMessage = null;
        draft.isFetching = false;
        draft.user = action.payload;
      // no default
    }
  });

export default authReducer;
