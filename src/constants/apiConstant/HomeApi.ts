import { baseStoreState } from '../../reducers/store';

export const HomeApi = {
  GET_USER_STATUS: `${baseStoreState.localFeatureFlag.API_BASE_URL}users/status/self`,
  UPDATE_STATUS: `${baseStoreState.localFeatureFlag.API_BASE_URL}users/status/self?userStatusFlag=true`,
};
