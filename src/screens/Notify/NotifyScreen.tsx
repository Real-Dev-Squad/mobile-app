import { Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import Form from '../../components/Form';
import { AuthContext } from '../../context/AuthContext';
import { postFcmToken } from '../AuthScreen/Util';

const NotifyScreen = () => {
  const { loggedInUserData } = useContext(AuthContext);

  useEffect(() => {
    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    try {
      const token = loggedInUserData?.token;
      const fcmToken = '123';
      const res = await postFcmToken(token, fcmToken);
      console.log('🚀 ~ getFCMToken ~ res:', res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View>
      <Text>NotifyScreen</Text>
      <Form />
    </View>
  );
};

export default NotifyScreen;
