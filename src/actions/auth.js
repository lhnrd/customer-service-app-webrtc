import { RSAA } from 'redux-api-middleware';

export const AUTH_REQUEST = '@@auth/AUTH_REQUEST';
export const AUTH_SUCCESS = '@@auth/AUTH_SUCCESS';
export const AUTH_FAILURE = '@@auth/AUTH_FAILURE';

export const CHECK_AUTH_REQUEST = '@@auth/CHECK_AUTH_REQUEST';
export const CHECK_AUTH_SUCCESS = '@@auth/CHECK_AUTH_SUCCESS';
export const CHECK_AUTH_FAILURE = '@@auth/CHECK_AUTH_FAILURE';

export const authenticate = ({ email, password }) => ({
  [RSAA]: {
    endpoint: '/auth',
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}$`,
    },
    types: [AUTH_REQUEST, AUTH_SUCCESS, AUTH_FAILURE],
  },
});

export const checkAuth = () => ({
  [RSAA]: {
    endpoint: '/users/me',
    method: 'GET',
    types: [CHECK_AUTH_REQUEST, CHECK_AUTH_SUCCESS, CHECK_AUTH_FAILURE],
  },
});
