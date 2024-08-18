import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const checkApplicationPermission = async () => {
  if (Platform.OS === 'android') {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
    } catch (error) {
      console.error(error);
    }
  }
};

const RemoteNotification = () => {
  useEffect(() => {
    checkApplicationPermission();
    // Using this function as we are rendering local notification so without this function we will receive multiple notification for same notification
    // We have same channelID for every FCM test server notification.
    PushNotification.getChannels(function (channel_ids) {
      channel_ids.forEach((id) => {
        PushNotification.deleteChannel(id);
      });
    });
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        const { message, title, id } = notification;
        let strTitle: string = JSON.stringify(title).split('"').join('');
        let strBody: string = JSON.stringify(message).split('"').join('');
        const key: string = JSON.stringify(id).split('"').join('');
        PushNotification.createChannel(
          {
            channelId: key, // (required & must be unique)
            channelName: 'remote messasge', // (required)
            channelDescription: 'Notification for remote message', // (optional) default: undefined.
            importance: 4, // (optional) default: 4. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
          },
          (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
        PushNotification.localNotification({
          channelId: key, //this must be same with channelId in createchannel
          title: strTitle,
          message: strBody,
        });
        console.log(
          'REMOTE NOTIFICATION ==>',
          title,
          message,
          id,
          notification,
        );
        // process the notification here
      },
      // Android only: GCM or FCM Sender ID
      senderID: '1234567890',
      popInitialNotification: true,
      requestPermissions: true,
    });
  }, []);
  return null;
};
export default RemoteNotification;
