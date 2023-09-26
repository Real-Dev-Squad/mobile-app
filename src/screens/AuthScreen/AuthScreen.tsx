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
import AuthApis from '../../constants/apiConstant/AuthApi';
import { CameraScreen } from 'react-native-camera-kit';
import CustomModal from '../../components/Modal/CustomModal';

const baseUrl = AuthApis.GITHUB_AUTH_API;

const AuthScreen = () => {
  const { setLoggedInUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedUserId, setScannedUserID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const queryParams = {
    sourceUtm: 'rds-mobile-app',
    redirectURL: 'https://realdevsquad.com/',
  };

  function buildUrl(baseUrl, queryParams) {
    const queryString = Object.keys(queryParams)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');

    return `${baseUrl}?${queryString}`;
  }

  const githubAuthUrl = buildUrl(baseUrl, queryParams);
  useEffect(() => {
    Linking.getInitialURL();
    const handleDeepLink = async (event) => {
      const token = event.url.split('token=')[1];
      token && updateUserData(token);
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

  const handleSignIn = () => {
    Linking.openURL(githubAuthUrl);
  };

  const updateUserData = async (token: string) => {
    try {
      const res = await getUserData(token);
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
