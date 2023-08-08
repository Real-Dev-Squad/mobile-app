import React, { useContext, useEffect, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
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
import {
  Camera,
  Frame,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { useSharedValue } from 'react-native-reanimated';

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

  const devices = useCameraDevices();
  const device = devices.back;

  const detectorResult = useSharedValue('');

  const activateCamera = async () => {
    try {
      await Camera.requestCameraPermission(); // Request camera permission
      setCameraActive(true); // Set cameraActive state to true
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  const labelImage = async (frame) => {
    const model = await tf.loadModel('path/to/model');
    const image = tf.image.decodePng(frame);
    const predictions = model.predict(image);
    const labels = [];
    for (const prediction of predictions) {
      const label = prediction.classLabel;
      const confidence = prediction.confidence;
      labels.push({
        label,
        confidence,
      });
    }
    return labels;
  };
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const imageLabels = labelImage(frame);

    console.log('Image labels:', imageLabels);
    detectorResult.value = imageLabels[0]?.label;
  }, []);

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
      {cameraActive && device && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
      )}
    </ScrollView>
  );
};

export default AuthScreen;
