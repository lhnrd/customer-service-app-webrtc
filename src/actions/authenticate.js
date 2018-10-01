import { RSAA } from 'redux-api-middleware';

export const AUTH_REQUEST = '@@auth/AUTH_REQUEST';
export const AUTH_SUCCESS = '@@auth/AUTH_SUCCESS';
export const AUTH_FAILURE = '@@auth/AUTH_FAILURE';

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
