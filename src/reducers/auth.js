import produce from 'immer';
import {
  AUTH_FAILURE,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
} from 'src/actions/auth';

const authReducer = (
  state = {
    errorMessage: null,
    isAuthenticated: false,
    isFetching: false,
    user: null,
  },
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case AUTH_REQUEST:
      case CHECK_AUTH_REQUEST:
        draft.isAuthenticated = false;
        draft.isFetching = true;
        return;
      case AUTH_SUCCESS:
        draft.errorMessage = null;
        draft.isAuthenticated = true;
        draft.isFetching = false;
        draft.user = action.payload.user;
        return;
      case AUTH_FAILURE:
      case CHECK_AUTH_FAILURE:
        draft.errorMessage = action.payload.message;
        draft.isAuthenticated = false;
        draft.isFetching = false;
        return;
      case CHECK_AUTH_SUCCESS:
        draft.errorMessage = null;
        draft.isAuthenticated = true;
        draft.isFetching = false;
        draft.user = action.payload;
    }
  });

export default authReducer;
