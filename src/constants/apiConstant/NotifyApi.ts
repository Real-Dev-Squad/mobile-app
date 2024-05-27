import { PROD_BASE_URL } from './BaseUrl';

export const NotifyApi = {
  POST_FCM: `${PROD_BASE_URL}/v1/fcm-tokens`,
  GET_NOTFICATION: `${PROD_BASE_URL}/v1/notifications`,
};
