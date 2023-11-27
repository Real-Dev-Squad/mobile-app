import { githubConfig } from '../../../config/config';

export const urls = {
  GITHUB_AUTH: `https://github.com/login/oauth/authorize?client_id=${githubConfig.clientId}`,
  API_ENDPOINT: 'https://api.realdevsquad.com/',
  REDIRECT_URL: 'https://www.realdevsquad.com/goto',
  GET_USERS_DATA: 'https://api.realdevsquad.com/users/self',
  GET_USER_DATA: 'https://api.realdevsquad.com/users?id=',
  GET_CONTRIBUTIONS: 'https://api.realdevsquad.com/contributions/',
  GET_ACTIVE_TASKS:
    'https://api.realdevsquad.com/tasks?dev=true&status=IN_PROGRESS&assignee=',
  GET_TASK_DETAIL: 'https://api.realdevsquad.com/tasks/',
  GET_TASK_PROGRESS_DETAIL: 'https://api.realdevsquad.com/progresses?taskId=',
  POST_TASK_PROGRESS: 'https://api.realdevsquad.com/progresses',
  GITHUB: 'https://github.com/',
  TWITTER: 'https://twitter.com',
  LINKEDIN: 'https://www.linkedin.com/in/',
};
