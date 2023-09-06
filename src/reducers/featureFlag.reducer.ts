export const featureFlagState = {
  API_BASE_URL: 'https://api.realdevsquad.com/',
};

const localFeatureFlag = (state = featureFlagState, action: any) => {
  switch (action.type) {
    case 'STAGING':
      return {
        ...state,
        API_BASE_URL: 'https://staging-api.realdevsquad.com/',
      };
    case 'PRODUCTION':
      return { ...state, API_BASE_URL: 'https://api.realdevsquad.com/' };
    case 'DEV':
      return {
        ...state,
        API_BASE_URL: 'https://api.realdevsquad.com/',
      };
    default:
      return state;
  }
};

export default localFeatureFlag;
