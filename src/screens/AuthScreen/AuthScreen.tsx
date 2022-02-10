import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {authorize} from 'react-native-app-auth';
import withHeader from '../../helpers/withHeader';
import Strings from '../../i18n/en';
import {AuthViewStyle} from './styles';

import {githubConfig} from '../../../config/config';

const AuthScreen = () => {
  const handleSignIn = async () => {
    try {
      const authState = await authorize(githubConfig);
      // set updateAuthStatus to true
      // set loggedInUserData to authState
      console.log(authState);
    } catch (error) {
      console.log('error', error);
      Alert.alert('Unable to login at the moment');
    }
  };

  return (
    <View style={AuthViewStyle.container}>
      <TouchableOpacity onPress={handleSignIn}>
        <Text style={AuthViewStyle.oooBtn}>Sign In with Github</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
