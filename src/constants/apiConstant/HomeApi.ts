import { featureFlagState } from '../../reducers/featureFlag.reducer';

export const HomeApi = {
  GET_USER_STATUS: `${featureFlagState.API_BASE_URL}users/status/self`,
  UPDATE_STATUS: `${featureFlagState.API_BASE_URL}users/status/self?userStatusFlag=true`,
};
