/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { firebase } from '@react-native-firebase/database';

const reference = firebase
  .app()
  .database('https://rds-backend-86606-default-rtdb.firebaseio.com/')
  .ref('/users/123');

// getting the data from realtime db
// const db = firebase
//   .app()
//   .database()
//   .ref('progressVal')
//   .once('value')
//   .then((snapshot) => {
//     console.log('User data: ', snapshot.val());
//   });
// console.log('🚀 ~ db:', db);
// console.log('🚀 ~ reference:', reference);
// // writing data to db
firebase
  .app()
  .database()
  .ref('progressVal')
  .set({
    progressVal: 20,
  })
  .then(() => console.log('Data set'));

AppRegistry.registerComponent(appName, () => App);
