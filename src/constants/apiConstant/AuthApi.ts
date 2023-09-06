import { featureFlagState } from '../../reducers/featureFlag.reducer';

const AuthApis = {
  QR_AUTH_API: `${featureFlagState.API_BASE_URL}auth/qr-code-auth`,
};

export default AuthApis;
