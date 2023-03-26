import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import Strings from '../../i18n/en';
import { AuthViewStyle } from './styles';
import { AuthScreenButton } from './Button';
import { OtpModal } from './OtpModal';
import useSignIn from '../../hooks/useSignIn';

const AuthScreen = () => {
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpModalVisible, setOtpModalVisible] = useState<boolean>(false);
  const { handleSignIn } = useSignIn();

  const closeModal = () => {
    setOtpModalVisible(false);
    setOtpCode('');
  };
  const openModal = () => setOtpModalVisible(true);
  const setCode = (code: string) => setOtpCode(code);
  //TODO: add to constants
  const maxLength = 4;

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
        <AuthScreenButton text={Strings.SIGN_IN_WITH_WEB} onPress={openModal} />
      </View>
      {otpModalVisible && (
        <OtpModal
          title={Strings.ENTER_4_DIGIT_OTP}
          testId="otpModal"
          visible={otpModalVisible}
          code={otpCode}
          maxLength={maxLength}
          setCode={setCode}
          closeModal={closeModal}
        />
      )}
    </ScrollView>
  );
};

export default AuthScreen;
