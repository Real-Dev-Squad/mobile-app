const githubConfig = {
  //! if making any change to redirectUrl then make the necessary changes to android/app/build.gradle file as well for appAuthRedirectScheme variable
  //* Authorization callback URL will be same as the redirectUrl
  redirectUrl: 'x-realdevsquad-rdsapp://oauth2/authorize',
  clientId: '<client-id>',
  clientSecret: '<client-secret>',
  scopes: ['notifications', 'user', 'identity'],
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint:
      'https://github.com/settings/connections/applications/969f022b19e148218c41',
  },
};

export { githubConfig };
