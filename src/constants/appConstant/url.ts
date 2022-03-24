import {githubConfig} from '../../../config/config';

export const urls = {
  GITHUB_AUTH: `https://github.com/login/oauth/authorize?client_id=${githubConfig.clientId}`,
  API_ENDPOINT: 'https://api.realdevsquad.com/',
};
