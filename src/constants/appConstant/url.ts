import { githubConfig } from '../../../config/config';
import { baseStoreState } from '../../reducers/store';

export const urls = {
  PROD_BASE_URL: 'https://api.realdevsquad.com/',
  STAGE_BASE_URL: 'https://staging-api.realdevsquad.com/',
  GITHUB_AUTH: `https://github.com/login/oauth/authorize?client_id=${githubConfig.clientId}`,
  API_ENDPOINT: `${baseStoreState.localFeatureFlag.API_BASE_URL}`,
  REDIRECT_URL: 'https://www.realdevsquad.com/goto',
  GET_USERS_DATA: `${baseStoreState.localFeatureFlag.API_BASE_URL}users/self`,
  GET_USER_DATA: `${baseStoreState.localFeatureFlag.API_BASE_URL}users?id=`,
  GET_CONTRIBUTIONS: `${baseStoreState.localFeatureFlag.API_BASE_URL}contributions/`,
  GITHUB: 'https://github.com/',
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://www.linkedin.com/in/',
};
