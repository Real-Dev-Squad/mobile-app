import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
} from 'react-native';
import {ScreenViewContainer} from '../../styles/GlobalStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import Strings from '../../i18n/en';
import {profileScreenStyles} from './styles';
import withHeader from '../../helpers/withHeader';
import takePicture from '../../helpers/LaunchCamera';
import ButtonWidget from '../../components/ButtonWidget';
import Avatar from '../../components/Avatar';
import Images from '../../constants/images/Image';

const ProfileScreen = () => {
  const [response, setResponse] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const uploadImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
    closeModal();
  };

  const removePicture = () => {
    setResponse({});
    closeModal();
  };

  const UploadImageModalView = () => {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={profileScreenStyles.centeredView}>
          <Pressable onPress={closeModal} style={profileScreenStyles.modalView}>
            <ButtonWidget title={'Camera'} onPress = {() => takePicture(setResponse, closeModal)} />
            <View style={{padding: '5%'}}></View>
            <ButtonWidget title={'Gallery'} onPress={uploadImage} />
            {response.hasOwnProperty('assets') && (
              <ButtonWidget title={'Remove'} onPress={removePicture} />
            )}
          </Pressable>
        </View>
      </Modal>
    );
  };

  const showDefaultAvatar = () => {
    if (response?.assets) {
      return false;
    }
    return true;
  };

  return (
    <View style={ScreenViewContainer.container}>
      <UploadImageModalView />
      <View style={profileScreenStyles.mainview}>
        {!response.hasOwnProperty('assets') && (
          <Text style={profileScreenStyles.subTitleText}>
            {Strings.Img_Upload_Text}
          </Text>
        )}
        {response?.assets &&
          response.assets.map(({uri}: {uri: string}) => (
            <Avatar key={uri} uri={uri} size={100} />
          ))}
        {showDefaultAvatar() && (
          <Avatar uri={Images.DEFAULT_IMAGE} size={100} />
        )}
        <Text style={profileScreenStyles.titleText}>{Strings.Greet_User}</Text>
        <ButtonWidget
          title={response?.assets ? 'Change' : 'Upload'}
          onPress={openModal}
        />
      </View>
    </View>
  );
};

export default withHeader(ProfileScreen);
