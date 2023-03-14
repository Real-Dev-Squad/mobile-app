import { GITHUB_OAUTH_CLIENT_ID } from '@env';
import { useCallback, useState } from 'react';
import { authorize } from 'react-native-app-auth';
import login from '../utils/api/login';
import { setSecureValue } from '../utils/setSecureValue';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function loginWithGithub(config: Config) {
  try {
    const result = await authorize(config);
    return result;
  } catch (err) {
    console.log(err);
  }
}

export default function useSignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = useCallback(async () => {
    setIsLoading(true);
    const config = {
      clientId: GITHUB_OAUTH_CLIENT_ID,
      redirectUrl: 'com.mobileclient.auth://oauth',
      scopes: ['read:user'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        tokenEndpoint: 'https://github.com/login/oauth/access_token',
        revocationEndpoint: `https://github.com/settings/connections/applications/${GITHUB_OAUTH_CLIENT_ID}`,
      },
      skipCodeExchange: true,
      usePKCE: true,
    };
    const result = await loginWithGithub(config);
    const loginResponse = await login(result?.authorizationCode || '');
    await setSecureValue(
      'ACCESS_TOKEN',
      loginResponse?.data?.data?.accessToken || '',
    );
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify(loginResponse?.data?.data?.user || ''),
    );
    setIsLoading(false);
  }, []);

  return { isLoading, handleSignIn };
}
