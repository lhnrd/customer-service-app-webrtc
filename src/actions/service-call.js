import { RSAA } from 'redux-api-middleware';

import createConstants from 'src/utils/create-constants';

const createServiceCallConstants = createConstants('@@service-call/');

export const types = createServiceCallConstants(
  // GET
  'GET_REQUEST',
  'GET_SUCCESS',
  'GET_FAILURE'
);

const { GET_REQUEST, GET_SUCCESS, GET_FAILURE } = types;

export const loadServiceCalls = () => ({
  [RSAA]: {
    endpoint: '/service-calls',
    method: 'GET',
    types: [GET_REQUEST, GET_SUCCESS, GET_FAILURE],
  },
});
