import React from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';
import { Styles } from './ErrorPopup.styles';
import Images from '../../constants/images/Image';

interface ErrorPopupProps {
  buttonAction: () => void;
  displayMessage: string;
}

const ErrorPopup = ({ buttonAction, displayMessage }: ErrorPopupProps) => {
  return (
    <Modal transparent={true}>
      <View style={Styles.container}>
        <View style={Styles.subContainer}>
          <View style={Styles.childContainer}>
            <View style={Styles.successIcon}>
              <Image
                source={Images.errorLogo}
                style={Styles.logo}
                width={80}
                height={80}
              />
            </View>
            <Text style={Styles.text}>{displayMessage}</Text>
          </View>
          <Pressable style={Styles.button} onPress={() => buttonAction()}>
            <Text style={Styles.logoutText}>Got it</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorPopup;
