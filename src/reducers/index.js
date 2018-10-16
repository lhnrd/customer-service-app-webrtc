import { actions } from 'src/constants';

const { START_CALL } = actions;

const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case [START_CALL]:
      console.log('started call');
      return state;
    default:
      return state;
  }
};

export default rootReducer;
