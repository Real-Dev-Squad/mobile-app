import React from 'react';
import {Text, View, TouchableOpacity, Alert} from 'react-native';
import {authorize} from 'react-native-app-auth';
import {githubConfig} from '../../../config/config.sample';
import Strings from '../../i18n/en';
import {AuthViewStyle} from './styles';

const AuthScreen = () => {
  const handleSignIn = async () => {
    try {
      const authState = await authorize(githubConfig);
      console.log(authState);
    } catch (error) {
      Alert.alert(Strings.SIGN_IN_ERROR);
    }
  };

  return (
    <View style={AuthViewStyle.container}>
      <TouchableOpacity onPress={handleSignIn}>
        <Text style={AuthViewStyle.oooBtn}>{Strings.SIGN_IN_BUTTON_TEXT}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthScreen;
