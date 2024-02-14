import { Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import Form from '../../components/Form';
import { AuthContext } from '../../context/AuthContext';
import { postFcmToken } from '../AuthScreen/Util';

const NotifyScreen = () => {
  const { loggedInUserData } = useContext(AuthContext);
  console.log('🚀 ~ NotifyScreen ~ loggedInUserData:', loggedInUserData.id);

  useEffect(() => {
    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    try {
      const token = loggedInUserData?.token;
      const fcmToken = '123';
      postFcmToken(token, fcmToken);
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
