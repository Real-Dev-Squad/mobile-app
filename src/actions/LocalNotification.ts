import PushNotification from 'react-native-push-notification';

const LocalNotification = () => {
  const key = Date.now().toString(); // Key must be unique everytime
  PushNotification.createChannel(
    {
      channelId: key, // (required)
      channelName: 'Local messasge', // (required)
      channelDescription: 'Notification for Local message', // (optional) default: undefined.
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.localNotification({
    channelId: key, //this must be same with channelid in createchannel
    title: 'Local Message',
    message: 'Local message !!',
  });
};

export default LocalNotification;
