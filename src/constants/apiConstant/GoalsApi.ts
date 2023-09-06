import { featureFlagState } from '../../reducers/featureFlag.reducer';

const GoalsApi = {
  MEMBERS_API: `${featureFlagState.API_BASE_URL}members`,
  GET_TODO_S: 'https://backend-goals-production.up.railway.app/goal/',
};

export default GoalsApi;
