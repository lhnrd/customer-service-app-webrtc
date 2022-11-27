/* eslint-disable */
export const getActiveServiceCall = state => {
  const serviceCallId = state.ui.activeServiceCall;
  const serviceCall = state.entities.serviceCalls.byId[serviceCallId];

  return serviceCall;
};
