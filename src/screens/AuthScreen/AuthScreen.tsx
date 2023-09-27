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
import { getUserData, requestCameraPermission } from './Util';
import { storeData } from '../../utils/dataStore';
import AuthApis from '../../constants/apiConstant/AuthApi';
import { CameraScreen } from 'react-native-camera-kit';
import CustomModal from '../../components/Modal/CustomModal';
import Tooltip from 'react-native-walkthrough-tooltip';
import LoadingScreen from '../../components/LoadingScreen';

const baseUrl = AuthApis.GITHUB_AUTH_API;

const AuthScreen = () => {
  const { setLoggedInUserData } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedUserId, setScannedUserID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [toolTip, setToolTip] = useState(false);

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
      await requestCameraPermission();
      setCameraActive((prev) => !prev); // Set cameraActive state to true
    } catch (error: any) {
      Alert.alert('Error requesting camera permission:', error);
    }
  };

  const handleQRCodeScanned = ({ nativeEvent }: any) => {
    setScannedUserID(nativeEvent.codeStringValue);
    setToolTip(true);
  };

  const handleSignIn = () => {
    Linking.openURL(githubAuthUrl);
  };

  const updateUserData = async (token: string) => {
    try {
      setLoading(true);
      const res = await getUserData(token);
      await storeData('userData', JSON.stringify(res));
      setLoggedInUserData({
        id: res?.id,
        name: res?.name,
        profileUrl: res?.profileUrl,
        status: res?.status,
      });
      setLoading(false);
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
          `${AuthApis.USER_DETAIL}${scannedUserId}`,
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
        await data.json();
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
              <Image
                source={require('../../../assets/githublogo.png')}
                height={190}
                width={190}
              />
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

      {cameraActive && (
        <View>
          <Tooltip
            isVisible={toolTip}
            content={
              <Text style={styles.toolTip}>Go to my-site & scan QR code</Text>
            }
            placement="top"
            onClose={() => setToolTip(false)}
          >
            <TouchableOpacity onPress={() => setToolTip(true)}>
              <Text style={styles.toolButton}>What To Do </Text>
            </TouchableOpacity>
          </Tooltip>
        </View>
      )}

      {modalVisible && (
        <CustomModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          qrCodeLogin={qrCodeLogin}
        />
      )}

      {loading && <LoadingScreen />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  toolTip: {
    color: 'blue',
    fontSize: 14,
    fontWeight: 'bold',
  },
  toolButton: {
    fontSize: 16,
    backgroundColor: '#483d8b',
    color: '#fff',
    marginBottom: 15,
    borderRadius: 20,
    height: 50,
    padding: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
    margin: 8,
  },
});
export default AuthScreen;
