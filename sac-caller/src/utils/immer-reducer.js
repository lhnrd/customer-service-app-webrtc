import produce from 'immer';

const immerReducer = (actionsMap, defaultState) => (
  state = defaultState,
  { type, payload }
) =>
  produce(state, draft => {
    const action = actionsMap[type];
    action && action(draft, payload); // eslint-disable-line
  });

export default immerReducer;
