import produce from 'immer';

import { types } from 'src/actions/auth';
import els from 'src/utils/expirable-local-storage';
import { AUTH_TOKEN_KEY } from 'src/constants';

const {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
} = types;

export const STATE_KEY = 'auth';

export const state = {
  errorMessage: null,
  isAuthenticated: !!els.get(AUTH_TOKEN_KEY),
  isFetching: false,
  user: null,
};

const reducer = produce((draft, { type, payload }) => {
  switch (type) {
    case AUTH_REQUEST:
      draft.isAuthenticated = false;
      draft.isFetching = true;
      return;
    case AUTH_SUCCESS:
      if (els.set(AUTH_TOKEN_KEY, payload.token)) {
        draft.errorMessage = null;
        draft.isAuthenticated = true;
        draft.isFetching = false;
        draft.user = payload.user;
      }
      return;
    case AUTH_FAILURE:
    case CHECK_AUTH_FAILURE:
      draft.errorMessage = payload.message;
      draft.isAuthenticated = false;
      draft.isFetching = false;
      return;
    case CHECK_AUTH_REQUEST:
      draft.isFetching = true;
      return;
    case CHECK_AUTH_SUCCESS:
      draft.errorMessage = null;
      draft.isFetching = false;
      draft.user = payload;
    // no default
  }
}, state);

export default reducer;
