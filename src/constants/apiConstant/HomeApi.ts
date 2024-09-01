import Config from 'react-native-config';

export const HomeApi = {
  GET_USER_STATUS: `${Config.BASE_URL}/users/status/self`,
  UPDATE_STATUS: `${Config.BASE_URL}/users/status/self?userStatusFlag=true`,
  GET_ALL_USERS: `${Config.BASE_URL}/users`,
  GET_ALL_MEMBERS: `${Config.BASE_URL}/users?roles=member`,
};
