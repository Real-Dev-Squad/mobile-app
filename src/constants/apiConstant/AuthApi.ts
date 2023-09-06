import { baseStoreState } from '../../reducers/store';

const AuthApis = {
  QR_AUTH_API: `${baseStoreState.localFeatureFlag.API_BASE_URL}auth/qr-code-auth`,
};

export default AuthApis;
