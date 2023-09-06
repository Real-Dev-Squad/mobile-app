import { baseStoreState } from '../../reducers/store';

const GoalsApi = {
  MEMBERS_API: `${baseStoreState.localFeatureFlag.API_BASE_URL}members`,
  GET_TODO_S: 'https://backend-goals-production.up.railway.app/goal/',
};

export default GoalsApi;
