import { RSAA } from 'redux-api-middleware';

import { AUTH_TOKEN_KEY } from 'src/constants';
import els from 'src/utils/expirable-local-storage';

const apiRoot = process.env.REACT_APP_API_ROOT || '';

const authApiMiddleware = () => next => action => {
  const apiAction = action[RSAA];

  if (apiAction) {
    const jwtToken = els.get(AUTH_TOKEN_KEY);
    if (jwtToken) {
      apiAction.headers = {
        Authorization: `Bearer ${jwtToken}`,
      };
    }
    apiAction.endpoint = apiRoot.concat(apiAction.endpoint);
  }

  next(action);
};

export default authApiMiddleware;
