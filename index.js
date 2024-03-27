/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { firebase } from '@react-native-firebase/database';

firebase
  .app()
  .database('https://rds-backend-86606-default-rtdb.firebaseio.com/')
  .ref('/users/123');
AppRegistry.registerComponent(appName, () => App);
