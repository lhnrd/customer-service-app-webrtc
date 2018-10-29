import produce from 'immer';
import { types } from 'src/actions/service-call';

const { ENTITY_CREATE, ENTITY_DELETE, ENTITIES_READ_SUCCESS } = types;

export const STATE_KEY = 'serviceCalls';

export const initialState = {
  allIds: [],
  byId: {},
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case ENTITY_CREATE: {
      const { entity } = payload;
      const { entityId } = entity;

      draft.allIds.unshift(entityId);
      draft.byId[entityId] = entity;
      break;
    }
    case ENTITY_DELETE: {
      const { entity } = payload;
      const { entityId } = entity;

      draft.allIds.splice(
        draft.allIds.findIndex(svcId => svcId === entityId),
        1
      );
      delete draft.byId[entityId];
      break;
    }
    case ENTITIES_READ_SUCCESS: {
      const { entities, result } = payload;
      draft.allIds = result;
      draft.byId = { ...entities.serviceCalls };
      break;
    }
    // no default
  }
}, initialState);
