import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, {
  FirebaseMessagingTypes,
  firebase,
} from '@react-native-firebase/messaging';

export async function requestUserPermission() {
  const authStatus = await firebase.messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFCMToken();
  }
}
async function getFCMToken() {
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  try {
    if (!fcmtoken) {
      const fcmToken_ = await firebase.messaging().getToken();
      await AsyncStorage.setItem('fcmtoken', fcmToken_);
    } else {
      //
      console.log('inside else');
    }
  } catch (error) {
    console.log(error, 'error in fcm token');
  }
}

export const notificationListener = () => {
  messaging().onMessage((notification) => {
    if (notification) {
      const { title, body } = notification;

      console.log('msg here', { title, body });
    }
  });
  messaging().onNotificationOpenedApp((remoteMessage) => {
    console.log('inside on notification open app');
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });
  messaging()
    .getInitialNotification()
    .then((remoteMessage) => {
      if (remoteMessage) {
        console.log(
          'notification caused app to open from quit state',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async (remoteMessage) => {
    console.log('notification on foreground state.....', remoteMessage);
  });
  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('msg handled in the background', remoteMessage);
  });
};
