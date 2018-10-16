import createConstants from './utils/create-constants';

export const AUTH_TOKEN_KEY = 'jwt_token'; // eslint-disable-line
export const FSA = '@@socket-middleware/FSA';
export const RSSA = '@@socket-middleware/RSSA';

export const actions = createConstants()('START_CALL', 'CANCEL_CALL');
