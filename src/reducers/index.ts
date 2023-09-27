import { combineReducers } from 'redux';
import user from './user.reducer';

const reducers = combineReducers({ user });

export default reducers;
