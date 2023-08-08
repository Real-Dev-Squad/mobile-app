import React, { useContext, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import { Text, View, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import Strings from '../../i18n/en';
import { AuthViewStyle } from './styles';
import { AuthScreenButton } from './Button';
import { OtpModal } from './OtpModal';
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
import {
  Camera,
  Frame,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { useSharedValue } from 'react-native-reanimated';
import { Camera, CameraScreen } from 'react-native-camera-kit';

const AuthScreen = () => {
  // TODO: will revamp github signIn feature
  const { setLoggedInUserData } = useContext(AuthContext);
  const [githubView, setGithubView] = useState<boolean>(false);
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpModalVisible, setOtpModalVisible] = useState<boolean>(false);
  const [addressbarURL, setAdressbarURL] = useState<String>('');
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(1);
  const [cameraActive, setCameraActive] = useState(false);

  const newCameraPermission = () => Camera.requestCameraPermission();
  // const newMicrophonePermission = Camera.requestMicrophonePermission();

  // const devices = useCameraDevices();
  // const device = devices.back;

  // const detectorResult = useSharedValue('');



  const activateCamera = async () => {
    try {
      // await Camera.requestCameraPermission(); // Request camera permission
      setCameraActive(true); // Set cameraActive state to true
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const handleQRCodeScanned = ({ nativeEvent }: any) => {
    console.log('nativeEvent.codeStringValue', nativeEvent.codeStringValue);
    // setScanResult(nativeEvent.codeStringValue);
    // navigation.navigate('Result', { data: nativeEvent.codeStringValue });
  };

  const closeModal = () => {
    setOtpModalVisible(false);
    setOtpCode('');
  };

  const openModal = () => setOtpModalVisible(true);
  const setCode = (code: string) => setOtpCode(code);
  //TODO: add to constants
  const maxLength = 4;
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

  const getAuthStatus = async () => {
    setLoading(true);
    const deviceInfo = await DeviceInfo.getDeviceName();
    const deviceId = await DeviceInfo.getUniqueId();

    try {
      const data = await fetch(AuthApis.QR_AUTH_API, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_info: deviceInfo,
          user_id: 'BE9a4sGXFLDwxZU3DSiq', //TODO: replace with scanner results
          device_id: deviceId,
        }),
      });

      if (data.ok) {
        console.log('patch call successfull');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Somethin went wrong, please try again',
          position: 'bottom',
          bottomOffset: 80,
        });
      }
    } catch (err) {
      console.error(err);
      Toast.show({
        type: 'error',
        text1: 'Somethin went wrong, please try again later',
        position: 'bottom',
        bottomOffset: 80,
      });
    }
    setLoading(false);
  };

  // TODO: trigger on qr code scan
  React.useEffect(() => {
    getAuthStatus();
  }, []);

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
        <AuthScreenButton text={Strings.SIGN_IN_WITH_WEB} onPress={activateCamera} />
      </View>

      {cameraActive && <CameraScreen
        style={StyleSheet.absoluteFill}
      showFrame
      scanBarcode={true}
      onReadCode={handleQRCodeScanned}
      frameColor={'white'}
      laserColor={'white'}
    />}
    
    </ScrollView>
  );
};

export default AuthScreen;