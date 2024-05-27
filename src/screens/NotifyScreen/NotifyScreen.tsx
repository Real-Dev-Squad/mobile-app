import { StyleSheet, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import NotifyButton from '../../components/Notify/NotifyButton';
import Colors from '../../constants/colors/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { notificationListener, requestUserPermission } from './PushController';
import { NotifyApi } from '../../constants/apiConstant/NotifyApi';
import { AuthContext } from '../../context/AuthContext';

const NotifyScreen = () => {
  useEffect(() => {
    callFcmToken();
    requestUserPermission();
    notificationListener();
  }, []);
  const { loggedInUserData } = useContext(AuthContext);

  const token = loggedInUserData?.token;

  const callFcmToken = async () => {
    let fcmtoken = await AsyncStorage.getItem('fcmtoken');
    console.log('fcmToken', fcmtoken);
    var myHeaders = new Headers();
    myHeaders.append('Cookie', `rds-session=${token}`);

    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      fcmToken: fcmtoken,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
    };
    fetch(NotifyApi.POST_FCM, requestOptions)
      .then((response) => JSON.stringify(response))
      .then((result) => console.log('res of [posting fcm token', result))
      .catch((error) => console.log('error', error));
  };

  const onNotifyHandler = () => {
    return;
    var myHeaders = new Headers();
    myHeaders.append('Cookie', `rds-session=${token}`);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      title: 'testing',
      body: 'Helloo world',
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(NotifyApi.GET_NOTFICATION, requestOptions)
      .then((response) => JSON.stringify(response))
      .then((result) => console.log('resss', result))
      .catch((error) => console.log('errorr in second api', error));
  };
  return (
    <View style={styles.container}>
      <NotifyButton
        onPress={onNotifyHandler}
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
    padding: 20,
  },
});
