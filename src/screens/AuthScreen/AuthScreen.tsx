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

const AuthScreen = () => {
  // TODO: will revamp github signIn feature
  const { setLoggedInUserData } = useContext(AuthContext);
  const [githubView, setGithubView] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedUserId, setScannedUserID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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
    // NOTE: toast until sign in with Github is implemented
    Toast.show({
      type: 'info',
      text1: 'Sign in with GitHub coming soon...',
      position: 'bottom',
      bottomOffset: 80,
    });
  };

  const updateUserData = async (url: string) => {
    try {
      const res = await getUserData(url);
      console.log('respponse', url, res);
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
    //    {"data": {"authorization_status": "NOT_INIT", "device_id": "389e089e7e6feb38", "device_info": "Shreya", "user_id": "T7IL7MB8YriniTw4bt39"}, "message": "Authentication document retrieved successfully."}
    try {
      const userInfo = await fetch(url);
      const userInfoJson = await userInfo.json();
      console.log('userInfoJson', userInfoJson);

      if (!userInfoJson.token) {
        const userDetailsInfo = await fetch(
          `https://api.realdevsquad.com/users/userId/${scannedUserId}`,
        );
        const userDetailsInfoJson = await userDetailsInfo.json();
        console.log('userDetailsInfoJson', userDetailsInfoJson);
        await storeData('userData', JSON.stringify(userDetailsInfoJson.user));
        const {picture,id,username,status} = userDetailsInfoJson.user
        setLoggedInUserData({
          id: id,
          name: username,
          profileUrl: picture.url,
          status: status,
        });
      }
    } catch (err) {
      console.error(err);
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
    console.log('device info', deviceInfo);
    console.log('device id', deviceId);
    console.log('userID', scannedUserId);
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

      // {"message": "User Device Info added successfully!", "userDeviceInfoData": {"authorization_status": "NOT_INIT", "device_id": "389e089e7e6feb38", "device_info": "Shreya", "user_id": "T7IL7MB8YriniTw4bt39"}}

      if (data.ok) {
        const dataJson = await data.json();
        console.log('Post call successful', dataJson);
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
        console.log('data in else', dataJson.message);
        Toast.show({
          type: 'error',
          text1: 'Something went wrong, please try again',
          position: 'bottom',
          bottomOffset: 80,
        });
      }
    } catch (err) {
      console.error(err);
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

  if (githubView) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
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
              if (url === urls.REDIRECT_URL) {
                setAdressbarURL(url);
                updateUserData(url);
              } else if (url.indexOf('?') > 0) {
                let uri = url.substring(0, url.indexOf('?'));
                setAdressbarURL(uri);
                updateUserData(uri);
              } else {
                setAdressbarURL(url);
                updateUserData(url);
              }
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
      </SafeAreaView>
    );
  }
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
