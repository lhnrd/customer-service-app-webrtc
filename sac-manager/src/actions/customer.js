import { getJSON, RSAA } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import createConstants from 'src/utils/create-constants';
import * as schema from 'src/schemas';

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
      {
        type: ENTITIES_READ_SUCCESS,
        payload: (action, state, res) =>
          getJSON(res).then(json => normalize(json, [schema.serviceCall])),
      },
      ENTITIES_READ_FAILURE,
    ],
  },
});
