import {
  APP_PATH,
  DASHBOARD_PATH,
  LOGIN_PATH,
  SERVICE_CALL_PATH,
} from './paths';

export const appUrl = () => APP_PATH;
export const dashboardUrl = () => DASHBOARD_PATH;
export const loginUrl = () => LOGIN_PATH;

export const serviceCallUrl = serviceCallId =>
  SERVICE_CALL_PATH.replace(':serviceCallId', serviceCallId);
