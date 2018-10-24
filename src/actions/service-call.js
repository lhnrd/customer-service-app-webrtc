import { RSAA } from 'redux-api-middleware';

import createConstants from 'src/utils/create-constants';

const createServiceCallConstants = createConstants('@@service-call/');

export const types = createServiceCallConstants(
  // READ ENTITIES
  'READ_ENTITIES_REQUEST',
  'READ_ENTITIES_SUCCESS',
  'READ_ENTITIES_FAILURE'
);

const {
  READ_ENTITIES_REQUEST,
  READ_ENTITIES_SUCCESS,
  READ_ENTITIES_FAILURE,
} = types;

export const readServiceCalls = () => ({
  [RSAA]: {
    endpoint: '/service-calls',
    method: 'GET',
    types: [
      READ_ENTITIES_REQUEST,
      READ_ENTITIES_SUCCESS,
      READ_ENTITIES_FAILURE,
    ],
  },
});
