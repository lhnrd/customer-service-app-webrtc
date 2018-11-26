import produce from 'immer';
import { types } from 'src/actions/service-call';

const {
  ENTITY_CREATE,
  ENTITY_DELETE,
  ENTITY_UPDATE,
  ENTITIES_READ_SUCCESS,
} = types;

export const STATE_KEY = 'serviceCalls';

export const initialState = {
  allIds: [],
  byId: {},
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case ENTITY_CREATE: {
      const { entity } = payload;
      const { id: entityId } = entity;

      draft.allIds.unshift(entityId);
      draft.byId[entityId] = entity;
      break;
    }
    case ENTITY_DELETE: {
      const { entity } = payload;
      const { id: entityId } = entity;

      draft.allIds.splice(
        draft.allIds.findIndex(svcId => svcId === entityId),
        1
      );
      delete draft.byId[entityId];
      break;
    }
    case ENTITY_UPDATE: {
      const { entity } = payload;
      const { id: entityId } = entity;
      Object.entries(entity).forEach(([key, value]) => {
        draft.byId[entityId][key] = value;
      });
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
