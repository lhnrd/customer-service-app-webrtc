import { RSAA } from 'redux-api-middleware';

import createConstants from 'src/utils/create-constants';

const createServiceCallConstants = createConstants('@@customers/');

export const types = createServiceCallConstants(
  'ENTITY_CREATE',
  'ENTITY_DELETE',
  // READ ENTITIES
  'ENTITIES_READ_REQUEST',
  'ENTITIES_READ_SUCCESS',
  'ENTITIES_READ_FAILURE'
);

const {
  ENTITIES_READ_REQUEST,
  ENTITIES_READ_SUCCESS,
  ENTITIES_READ_FAILURE,
} = types;

export const readServiceCalls = () => ({
  [RSAA]: {
    endpoint: '/service-calls',
    method: 'GET',
    types: [
      ENTITIES_READ_REQUEST,
      ENTITIES_READ_SUCCESS,
      ENTITIES_READ_FAILURE,
    ],
  },
});
