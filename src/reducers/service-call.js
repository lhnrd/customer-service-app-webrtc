import produce from 'immer';
import { normalize, schema } from 'normalizr';
import { types } from 'src/actions/service-call';

const { GET_SUCCESS } = types;

export const STATE_KEY = 'serviceCalls';

export const schemas = {};
schemas.serviceCall = new schema.Entity('serviceCalls');
schemas.serviceCallList = new schema.Array(schemas.serviceCall);

export const state = {};

const reducer = produce((draft, { type, payload }) => {
  switch (type) {
    case GET_SUCCESS: {
      const {
        entities: { serviceCalls },
      } = normalize(payload, schemas.serviceCallList);
      Object.entries(serviceCalls).forEach(([id, serviceCall]) => {
        draft[id] = serviceCall;
      });
    }
    // no default
  }
}, state);

export default reducer;
