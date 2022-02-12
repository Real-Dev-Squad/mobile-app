import React from 'react';
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
    <ScrollView contentContainerStyle={AuthViewStyle.container}>
      <View style={[AuthViewStyle.imageContainer]}>
        <Image
          source={require('../../../assets/rdsLogo.png')}
          style={AuthViewStyle.logo}
        />
      </View>
      <View style={[AuthViewStyle.constContainer]}>
        <Text style={AuthViewStyle.welcomeMsg}>Welcome to</Text>
        <Text style={AuthViewStyle.cmpnyName}>Real Dev Squad</Text>
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
