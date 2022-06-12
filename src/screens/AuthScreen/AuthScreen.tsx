import React, { useContext, useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import WebView from 'react-native-webview';
import { urls } from '../../constants/appConstant/url';
import { AuthContext } from '../../context/AuthContext';
import { DataStoreHook } from '../../hooks/dataStoreHook';
import Strings from '../../i18n/en';
import { AuthViewStyle } from './styles';
import { getUserData } from './Util';

const AuthScreen = () => {
  const { setLoggedInUserData } = useContext(AuthContext);
  const [githubView, setGithubView] = useState(false);

  const handleSignIn = () => {
    setGithubView(true);
  };

  if (githubView) {
    return (
      <ScrollView contentContainerStyle={AuthViewStyle.container}>
        <WebView
          onNavigationStateChange={({ url }) => {
            getUserData(url)
              .then((res) => {
                if (res) {
                  DataStoreHook('userData', JSON.stringify(res));
                  setLoggedInUserData({
                    id: res?.id,
                    name: res?.name,
                    profileUrl: res?.profileUrl,
                    status: res?.status,
                  });
                } else {
                  setLoggedInUserData(res);
                }
              })
              .catch(() => setLoggedInUserData(null));
          }}
          style={AuthViewStyle.webViewStyles}
          source={{
            uri: urls.GITHUB_AUTH,
          }}
        />
      </ScrollView>
    );
  }
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
