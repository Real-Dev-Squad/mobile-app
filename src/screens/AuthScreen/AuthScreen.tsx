import React, { useContext, useEffect, useState } from 'react';
import DeviceInfo from 'react-native-device-info';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  BackHandler,
  StyleSheet,
  Alert,
} from 'react-native';
import Strings from '../../i18n/en';
import { AuthViewStyle } from './styles';
import { AuthScreenButton } from './Button';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AuthContext } from '../../context/AuthContext';
import { getUserData, requestCameraPermission } from './Util';
import { storeData } from '../../utils/dataStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator } from 'react-native';
import Images from '../../constants/images/Image';
import WebView from 'react-native-webview';
import { urls } from '../../constants/appConstant/url';
import AuthApis from '../../constants/apiConstant/AuthApi';
import { CameraScreen } from 'react-native-camera-kit';
import CustomModal from '../../components/Modal/CustomModal';
import Tooltip from 'react-native-walkthrough-tooltip';

const AuthScreen = () => {
  // TODO: will revamp github signIn feature
  const { setLoggedInUserData } = useContext(AuthContext);
  const [githubView, setGithubView] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [scannedUserId, setScannedUserID] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [addressbarURL, setAdressbarURL] = useState<String>('');
  const [key, setKey] = useState(1);
  const [toolTip, setToolTip] = useState(false);

  const activateCamera = async () => {
    try {
      await requestCameraPermission();
      setCameraActive((prev) => !prev); // Set cameraActive state to true

      const backAction = () => {
        console.log('backClicked');
        setCameraActive(false);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );
      return () => backHandler.remove();
    } catch (error: any) {
      Alert.alert('Error requesting camera permission:', error);
    }
  };

  const handleQRCodeScanned = ({ nativeEvent }: any) => {
    setScannedUserID(nativeEvent.codeStringValue);
    setToolTip(true);
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
                  console.log(1, uri);
                  setAdressbarURL(uri);
                  setAdressbarURL(uri);
                  updateUserData(uri);
                  setAdressbarURL(uri);
                  updateUserData(uri);
                } else {
                  console.log(2, url);
                  setAdressbarURL(url);
                  setAdressbarURL(url);
                  updateUserData(url);
                  setAdressbarURL(url);
                  updateUserData(url);
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
    fontSize: 20,
    backgroundColor: '#483d8b',
    marginBottom: 15,
    borderRadius: 20,
    height: 50,
    padding: 10,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
export default AuthScreen;
