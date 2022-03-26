// import {githubConfig} from '../../../config/config'; // you can include client id from readme file in config

import {githubConfig} from '../../../config/config.sample';

export const urls = {
  GITHUB_AUTH: `https://github.com/login/oauth/authorize?client_id=${githubConfig.clientId}`,
  API_ENDPOINT: 'https://api.realdevsquad.com/',
};
