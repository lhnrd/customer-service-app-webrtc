import { createSelector } from 'reselect';

export const serviceCallsAllIdsSelector = state =>
  state.entities.serviceCalls.allIds;
export const serviceCallsByIdSelector = state =>
  state.entities.serviceCalls.byId;

export const serviceCallsSelector = createSelector(
  [serviceCallsAllIdsSelector, serviceCallsByIdSelector],
  (allIds, byId) => allIds.map(id => byId[id])
);

export const endedServiceCallsSelector = createSelector(
  serviceCallsSelector,
  serviceCalls => serviceCalls.filter(serviceCall => !!serviceCall.endedAt)
);

export const ratedServiceCallsSelector = createSelector(
  serviceCallsSelector,
  serviceCalls =>
    serviceCalls.filter(
      serviceCall => !!serviceCall.callRating && !!serviceCall.serviceRating
    )
);

export const avgCallRatingSelector = createSelector(
  ratedServiceCallsSelector,
  serviceCalls =>
    !serviceCalls.length
      ? 0
      : serviceCalls.reduce(
          (sum, serviceCall) => sum + serviceCall.callRating,
          0
        ) / serviceCalls.length
);

export const avgServiceRatingSelector = createSelector(
  ratedServiceCallsSelector,
  serviceCalls =>
    !serviceCalls.length
      ? 0
      : serviceCalls.reduce(
          (sum, serviceCall) => sum + serviceCall.serviceRating,
          0
        ) / serviceCalls.length
);

export const solvedServiceCallsSelector = createSelector(
  ratedServiceCallsSelector,
  serviceCalls => serviceCalls.filter(serviceCall => serviceCall.isSolved)
);

export const notSolvedServiceCallsSelector = createSelector(
  ratedServiceCallsSelector,
  serviceCalls => serviceCalls.filter(serviceCall => !serviceCall.isSolved)
);

export const solvedStatisticsSelector = createSelector(
  [
    solvedServiceCallsSelector,
    notSolvedServiceCallsSelector,
    endedServiceCallsSelector,
  ],
  (solved, notSolved, ended) => ({
    solvedCalls: solved.length,
    notSolvedCalls: notSolved.length,
    notAnsweredCalls: ended.length - solved.length + notSolved.length,
  })
);

export const serviceCallSelector = (state, id) =>
  state.entities.serviceCalls.byId[id];

export const serviceCallCustomerSelector = (state, customerId) =>
  state.entities.customers.byId[customerId];
