import Config from 'react-native-config';
const AuthApis = {
  USER_DETAIL: `${Config.BASE_URL}/users/userId/`,
  QR_AUTH_API: `${Config.BASE_URL}/auth/qr-code-auth`,
  GITHUB_AUTH_API: 'https://api.realdevsquad.com/auth/github/login',
};

export default AuthApis;
