import { GITHUB_OAUTH_CLIENT_ID } from '@env';
import { useCallback, useContext } from 'react';
import { authorize } from 'react-native-app-auth';
import login from '../utils/api/login';
import { setSecureValue } from '../utils/keychain';
import { AuthContext } from '../context/AuthContext';
import { storeData } from '../utils/dataStore';

async function authorizeUser(config: Config) {
  try {
    const result = await authorize(config);
    return result;
  } catch (err) {
    console.log(err);
  }
}

export default function useSignIn() {
  const { setIsLoading, setLoggedInUserData } = useContext(AuthContext);

  const handleSignIn = useCallback(async () => {
    setIsLoading();
    const config = {
      clientId: GITHUB_OAUTH_CLIENT_ID,
      redirectUrl: 'com.rdsapp.auth://oauth',
      scopes: ['read:user'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_OAUTH_CLIENT_ID}`,
      },
      skipCodeExchange: true,
      usePKCE: true,
    };
    const result = await authorizeUser(config);
    const loginResponse = await login(result?.authorizationCode || '');
    await setSecureValue(
      'ACCESS_TOKEN',
      loginResponse?.data?.data?.accessToken || '',
    );
    await storeData(
      'userData',
      JSON.stringify(loginResponse?.data?.data?.user || ''),
    );
    setLoggedInUserData(loginResponse?.data?.data?.user || null);
    setIsLoading();
  }, [setIsLoading, setLoggedInUserData]);

  return { handleSignIn };
}
