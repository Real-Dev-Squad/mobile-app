import { StyleSheet, View } from 'react-native';
import React, { useContext } from 'react';
import NotifyButton from '../../components/Notify/NotifyButton';
import Colors from '../../constants/colors/Colors';
import LocalNotification from '../../actions/LocalNotification';
import RemoteNotification from '../../actions/RemoteNotification';
import { firebase } from '@react-native-firebase/messaging';
import { AuthContext } from '../../context/AuthContext';
import { postFcmToken } from '../AuthScreen/Util';
import NotifyForm from '../../components/Notify/NotifyForm';

const NotifyScreen = () => {
  const { loggedInUserData } = useContext(AuthContext);

  const notifyHandler = () => {
    LocalNotification();
    getFCMToken();
  };
  const getFCMToken = async () => {
    const fcmToken_ = await firebase.messaging().getToken();
    console.log('🚀 ~ getFCMToken ~ fcmToken_:', fcmToken_);
    const token = loggedInUserData?.token;

    await postFcmToken(fcmToken_, token);
  };
  return (
    <View style={styles.container}>
      <View>
        <NotifyForm />
      </View>
      <NotifyButton
        onPress={notifyHandler}
        title={'Notify'}
        buttonStyle={{ backgroundColor: Colors.Primary_Color }}
        textStyle={{ color: 'white' }}
      />
    </View>
  );
};

export default NotifyScreen;
const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
});
