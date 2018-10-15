import { RSAA } from 'redux-api-middleware';

import createConstants from 'src/utils/create-constants';

const createAuthConstants = createConstants('@@auth/');

// authenticate
export const types = createAuthConstants(
  // authenticate
  'AUTH_REQUEST',
  'AUTH_SUCCESS',
  'AUTH_FAILURE',

  // check authentication
  'CHECK_AUTH_REQUEST',
  'CHECK_AUTH_SUCCESS',
  'CHECK_AUTH_FAILURE'
);

const {
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAILURE,
} = types;

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
