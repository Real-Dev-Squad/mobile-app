import { githubConfig } from '../../../config/config';
import { featureFlagState } from '../../reducers/featureFlag.reducer';

export const urls = {
  GITHUB_AUTH: `https://github.com/login/oauth/authorize?client_id=${githubConfig.clientId}`,
  API_ENDPOINT: `${featureFlagState.API_BASE_URL}`,
  REDIRECT_URL: 'https://www.realdevsquad.com/goto',
  GET_USERS_DATA: `${featureFlagState.API_BASE_URL}users/self`,
  GET_USER_DATA: `${featureFlagState.API_BASE_URL}users?id=`,
  GET_CONTRIBUTIONS: `${featureFlagState.API_BASE_URL}contributions/`,
  GITHUB: 'https://github.com/',
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://www.linkedin.com/in/',
};
