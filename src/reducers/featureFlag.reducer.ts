import { urls } from '../constants/appConstant/url';

const prodUrl: string = urls.PROD_BASE_URL;
const stageUrl: string = urls.STAGE_BASE_URL;

// TODO: by default read from env file
export const featureFlagState = {
  API_BASE_URL: prodUrl,
};

const localFeatureFlag = (state = featureFlagState, action: any) => {
  switch (action.type) {
    case 'STAGING':
      return {
        ...state,
        API_BASE_URL: stageUrl,
      };
    case 'PRODUCTION':
      return { ...state, API_BASE_URL: prodUrl };
    case 'DEV':
      return {
        ...state,
        API_BASE_URL: prodUrl,
      };
    default:
      return state;
  }
};

export default localFeatureFlag;
