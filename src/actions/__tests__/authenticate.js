import configureMockStore from 'redux-mock-store';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import * as actions from '../authenticate';

const middlewares = [thunk, apiMiddleware];
const mockStore = configureMockStore(middlewares);

describe('[actions] authenticate', () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  it('should dispatch AUTH_REQUEST and AUTH_SUCCESS when authenticate is called', () => {
    const store = mockStore({});
    const user = {
      email: 'admin@sac.com',
      password: '123456',
    };

    fetchMock.postOnce('/auth', {
      body: user,
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: actions.AUTH_REQUEST },
      { type: actions.AUTH_SUCCESS, payload: user },
    ];
    return store.dispatch(actions.authenticate({ ...user })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
