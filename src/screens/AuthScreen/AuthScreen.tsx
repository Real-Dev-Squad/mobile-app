import React, { useContext, useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
  Linking,
} from 'react-native';
import Strings from '../../i18n/en';
import { AuthViewStyle } from './styles';
import { AuthScreenButton } from './Button';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AuthContext } from '../../context/AuthContext';
import { getUserData } from './Util';
import { storeData } from '../../utils/dataStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import Images from '../../constants/images/Image';
import WebView from 'react-native-webview';
import { urls } from '../../constants/appConstant/url';
import AuthApis from '../../constants/apiConstant/AuthApi';
import { CameraScreen } from 'react-native-camera-kit';
import CustomModal from '../../components/Modal/CustomModal';
import { clientId, githubConfig } from '../../../config/config';

// responseType = "code",
// redirectUri = "http://localhost:3000/auth/github/callback",
// scope = "user:email",
// state = "",
// clientId = defaultClientId,

const baseUrl = 'http://192.168.0.109:3000/auth/github/login';
// const baseUrl =
//   'https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97';

const linking = {
  prefixes: [
    /* your linking prefixes */
  ],
  config: {
    /* configuration for matching screens with paths */
  },
};

const AuthScreen = () => {
  // TODO: will revamp github signIn feature
  const { setLoggedInUserData } = useContext(AuthContext);
  const [githubView, setGithubView] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedUserId, setScannedUserID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const queryParams = {
    sourceUtm: 'rds-mobile-app',
    redirectURL: 'https://realdevsquad.com/',
    // Add other query parameters as needed
  };

  // Create a function to build the complete URL
  function buildUrl(baseUrl, queryParams) {
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');

    return `${baseUrl}?${queryString}`;
  }

  // Call the buildUrl function to create the final URL
  const githubAuthUrl = buildUrl(baseUrl, queryParams);
  useEffect(() => {
    console.log('inside useEffect');
    Linking.getInitialURL();
    const handleDeepLink = async (event) => {
      console.log('handleDeep linksss', event); // event.url
      console.log('our awaited url', event.url);
      console.log('our token', event.url.split('token=')[1]);
      if (event.url.startsWith('app://deeplink')) {
        const url = new URL(event.url);
        const authorizationCode = url.searchParams.get('code');
        if (authorizationCode) {
          // Call a function to exchange the code for an access token
          githubConfig(authorizationCode);
        }
      }
    };
    Linking.addEventListener('url', handleDeepLink);
    return () => {
      Linking.removeEventListener('url', handleDeepLink);
    };
  });

  const activateCamera = async () => {
    try {
      // await Camera.requestCameraPermission(); // Request camera permission
      setCameraActive(true); // Set cameraActive state to true
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const handleQRCodeScanned = ({ nativeEvent }: any) => {
    setScannedUserID(nativeEvent.codeStringValue);
  };

  //TODO: add to constants
  const handleSignIn = () => {
    Linking.openURL(githubAuthUrl);
  };

  const updateUserData = async (url: string) => {
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
  };

  const qrCodeLogin = async () => {
    const deviceId = await DeviceInfo.getUniqueId();

    const url = `${AuthApis.QR_AUTH_API}?device_id=${deviceId}`;
    try {
      const userInfo = await fetch(url);
      const userInfoJson = await userInfo.json();
      if (userInfoJson.data.token) {
        const userDetailsInfo = await fetch(
          `https://api.realdevsquad.com/users/userId/${scannedUserId}`,
        );
        const userDetailsInfoJson = await userDetailsInfo.json();
        await storeData('userData', JSON.stringify(userDetailsInfoJson.user));
        const { picture, id, username, status } = userDetailsInfoJson.user;
        setLoggedInUserData({
          id: id,
          name: username,
          profileUrl: picture?.url,
          status: status,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Please authorize from my-site by giving confirmations',
          position: 'bottom',
          bottomOffset: 80,
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong, please try again later',
        position: 'bottom',
        bottomOffset: 80,
      });
    }
  };

  const getAuthStatus = async () => {
    const deviceInfo = await DeviceInfo.getDeviceName();
    const deviceId = await DeviceInfo.getUniqueId();
    setLoading(true);
    try {
      const data = await fetch(AuthApis.QR_AUTH_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_info: deviceInfo,
          user_id: scannedUserId,
          device_id: deviceId,
        }),
      });

      if (data.ok) {
        const dataJson = await data.json();
        Alert.alert('Please Confirm', dataJson.message, [
          {
            text: 'Cancel',
            onPress: () => setCameraActive(false),
          },
          {
            text: 'OK',
            onPress: () => {
              setCameraActive(false);
              setModalVisible(true);
            },
          }, // ok -> Modal (press done button once you verify yourself from mysite) -> Done > loader? -> get call implementation =?> userdata => autorize -> if fail ? toast msgs  ? homscreen
        ]);
      } else {
        const dataJson = await data.json();
        Toast.show({
          type: 'error',
          text1: 'Something went wrong, please try again',
          position: 'bottom',
          bottomOffset: 80,
        });
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Something went wrong, please try again later',
        position: 'bottom',
        bottomOffset: 80,
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    getAuthStatus();
    /* eslint-disable */
  }, [scannedUserId]);

  //TODO: fix layout change on otp input
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
        <View style={AuthViewStyle.btnContainer}>
          <TouchableOpacity
            onPress={handleSignIn}
            style={AuthViewStyle.btnView}
          >
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
        <AuthScreenButton
          text={Strings.SIGN_IN_WITH_WEB}
          onPress={activateCamera}
        />
      </View>

      {cameraActive && (
        <CameraScreen
          style={StyleSheet.absoluteFill}
          showFrame
          scanBarcode={true}
          onReadCode={handleQRCodeScanned}
          frameColor={'white'}
          laserColor={'white'}
        />
      )}

      {modalVisible && (
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          qrCodeLogin={qrCodeLogin}
        />
      )}
    </ScrollView>
  );
};

export default AuthScreen;
