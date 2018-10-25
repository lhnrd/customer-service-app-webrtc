import { normalize, schema } from 'normalizr';
import { types } from 'src/actions/service-call';
import immerReducer from 'src/utils/immer-reducer';

const { READ_ENTITIES_SUCCESS } = types;

export const STATE_KEY = 'serviceCalls';

export const schemas = {};
schemas.serviceCall = new schema.Entity('serviceCalls');
schemas.serviceCallList = new schema.Array(schemas.serviceCall);

export const initialState = {
  allIds: [],
  byId: {},
};

const reducer = immerReducer(
  {
    [READ_ENTITIES_SUCCESS]: (state, payload) => {
      const { entities, result } = normalize(payload, schemas.serviceCallList);
      state.byId = entities.serviceCalls;
      state.allIds = result;
    },
  },
  initialState
);

export default reducer;
