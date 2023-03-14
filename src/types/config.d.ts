type Config = {
  clientId: string;
  redirectUrl: string;
  scopes: string[];
  serviceConfiguration: {
    authorizationEndpoint: string;
    tokenEndpoint: string;
    revocationEndpoint: string;
  };
  skipCodeExchange: boolean;
  usePKCE: boolean;
};
