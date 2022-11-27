import { getJSON, RSAA } from 'redux-api-middleware';
import { normalize } from 'normalizr';

import createConstants from 'src/utils/create-constants';
import * as schema from 'src/schemas';

import { types as socketTypes } from './socket';

const createServiceCallConstants = createConstants('@@service-call/');

export const types = createServiceCallConstants(
  'ENTITY_CREATE',
  'ENTITY_DELETE',
  'ENTITY_UPDATE',

  // READ ENTITIES
  'ENTITIES_READ_REQUEST',
  'ENTITIES_READ_SUCCESS',
  'ENTITIES_READ_FAILURE'
);

const {
  ENTITY_UPDATE,

  ENTITIES_READ_REQUEST,
  ENTITIES_READ_SUCCESS,
  ENTITIES_READ_FAILURE,
} = types;

export const readServiceCalls = () => ({
  [RSAA]: {
    endpoint: `/service-calls?filter=${JSON.stringify({
      eager: {
        customer: true,
      },
      order: 'startedAt desc, updatedAt desc',
    })}`,
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

export const updateServiceCall = data => ({
  [socketTypes.RSSA]: {
    event: ENTITY_UPDATE,
    message: { data },
  },
});
