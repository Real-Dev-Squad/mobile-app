import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import WebView from 'react-native-webview';
import { urls } from '../../constants/app-constants/url';
import { AuthContext } from '../../context/AuthContext';
import Images from '../../constants/images';
import { storeData } from '../../utils/dataStore';
import Strings from '../../i18n/en';
import { AuthViewStyle } from './styles';
import { getUserData } from './utils';

const AuthScreen = () => {
  const { setLoggedInUserData } = useContext(AuthContext);
  const [githubView, setGithubView] = useState(false);
  const [addressbarURL, setAdressbarURL] = useState<String>('');
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(1);

  const handleSignIn = () => {
    setGithubView(true);
  };

  if (githubView) {
    return (
      <ScrollView contentContainerStyle={AuthViewStyle.container}>
        <View style={AuthViewStyle.addressBarStyle}>
          {loading ? (
            <ActivityIndicator
              style={{ marginLeft: 5 }}
              size={25}
              color="#fff"
            />
          ) : (
            <TouchableOpacity onPress={() => setGithubView(false)}>
              <Text style={AuthViewStyle.addressBarCancel}>Cancel</Text>
            </TouchableOpacity>
          )}
          <Text style={AuthViewStyle.addressBarLink}>{addressbarURL}</Text>
          {loading ? null : (
            <TouchableOpacity onPress={() => setKey(key + 1)}>
              <Image
                source={Images.refreshIcon}
                style={AuthViewStyle.addressBarIcon}
              />
            </TouchableOpacity>
          )}
        </View>
        <WebView
          key={key}
          onNavigationStateChange={({ url }) => {
            (async function () {
              if (url === urls.REDIRECT_URL) {
                setAdressbarURL(url);
                try {
                  const res = await getUserData(url);
                  await storeData('userData', JSON.stringify(res));

                  setLoggedInUserData({
                    id: res?.id,
                    name: res?.name,
                    profileUrl: res?.profileUrl,
                    status: res?.status,
                  });
                } catch (err) {
                  setLoggedInUserData(null);
                }
              } else if (url.indexOf('?') > 0) {
                let uri = url.substring(0, url.indexOf('?'));
                setAdressbarURL(uri);
              } else {
                setAdressbarURL(url);
              }
            })();
          }}
          style={AuthViewStyle.webViewStyles}
          source={{
            uri: urls.GITHUB_AUTH,
          }}
          onLoadStart={() => {
            setLoading(true);
          }}
          onLoadEnd={() => {
            setLoading(false);
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
