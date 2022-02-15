import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';
import {authorize} from 'react-native-app-auth';
import {githubConfig} from '../../../config/config';
import AuthContext from '../../context/AuthContext';
import RootContext from '../../context/RootContext';
import Strings from '../../i18n/en';
import {AuthViewStyle} from './styles';

const AuthScreen = () => {
  const {updateAuthStatus} = useContext(AuthContext);
  const {updateLoggedInUserData, setIsLoading} = useContext(RootContext);

  const handleSignIn = async () => {
    try {
      setIsLoading(true);
      const authState = await authorize(githubConfig);
      updateAuthStatus(true);
      updateLoggedInUserData(authState);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Alert.alert(Strings.SIGN_IN_ERROR);
    }
  };

  return (
    <ScrollView contentContainerStyle={AuthViewStyle.container}>
      <View style={[AuthViewStyle.imageContainer]}>
        <Image
          source={require('../../../assets/rdsLogo.png')}
          style={AuthViewStyle.logo}
        />
      </View>
      <View style={[AuthViewStyle.constContainer]}>
        <Text style={AuthViewStyle.welcomeMsg}>{Strings.WELCOME_TO}</Text>
        <Text style={AuthViewStyle.cmpnyName}>{Strings.REAL_DEV_SQUAD}</Text>
      </View>
      <View style={AuthViewStyle.btnContainer}>
        <TouchableOpacity onPress={handleSignIn} style={AuthViewStyle.btnView}>
          <View style={AuthViewStyle.githubLogo}>
            <Image source={require('../../../assets/github_logo.png')} />
          </View>
          <View style={AuthViewStyle.signInTxtView}>
            <Text style={AuthViewStyle.signInText}>
              {Strings.SIGN_IN_BUTTON_TEXT}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AuthScreen;
