import {githubConfig} from '../../../config/config';
// you can include client id from readme file in config and import it as above.

//import {githubConfig} from '../../../config/configSample';

export const urls = {
  GITHUB_AUTH: `https://github.com/login/oauth/authorize?client_id=${githubConfig.clientId}`,
  API_ENDPOINT: 'https://api.realdevsquad.com/',
  REDIRECT_URL: 'https://www.realdevsquad.com/goto',
  GET_USERS_DATA: `https://api.realdevsquad.com/users/self`,
};
