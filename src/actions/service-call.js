import { RSSA } from 'src/constants';
import createConstants from 'src/utils/create-constants';

export const types = createConstants('@@service-call/')(
  'ENTITY_CREATE',
  'ENTITY_DELETE',
  'ENTITY_UPDATE',
  'SERVICE_CALL_SET_ACTIVE'
);

const {
  ENTITY_CREATE,
  ENTITY_DELETE,
  ENTITY_UPDATE,
  SERVICE_CALL_SET_ACTIVE,
} = types;

export const createServiceCall = ({ customerId }) => dispatch =>
  dispatch({
    [RSSA]: {
      event: ENTITY_CREATE,
      message: { data: { customerId } },
      ack: (_, entity) => {
        dispatch({ type: ENTITY_CREATE, payload: { entity } });
        dispatch({
          type: SERVICE_CALL_SET_ACTIVE,
          payload: { serviceCallId: entity.id },
        });
      },
    },
  });

export const updateServiceCall = data => ({
  [RSSA]: {
    event: ENTITY_UPDATE,
    message: { data },
  },
});

export const deleteServiceCall = ({ serviceCallId }) => ({
  [RSSA]: {
    event: ENTITY_DELETE,
    message: { data: { serviceCallId } },
  },
});
