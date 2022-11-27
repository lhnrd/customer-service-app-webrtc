import produce from 'immer';
import { types as serviceCallTypes } from 'src/actions/service-call';

export const STATE_KEY = 'customers';

export const initialState = {
  allIds: [],
  byId: {},
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case serviceCallTypes.ENTITIES_READ_SUCCESS: {
      const { entities } = payload;
      draft.byId = { ...entities.customers };
      break;
    }
    // no default
  }
}, initialState);
