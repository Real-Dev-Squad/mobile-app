import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Modal,
  Platform,
  Pressable,
} from 'react-native';
import {ScreenViewContainer} from '../../styles/GlobalStyle';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Strings from '../../i18n/en';
import {profileScreenStyles} from './styles';
import withHeader from '../../helpers/withHeader';
import ButtonWidget from '../../components/ButtonWidget';
import Avatar from '../../components/Avatar';

const PLACEHOLDER_IMAGE =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png';
// 'https://cdn.pixabay.com/photo/2016/08/31/11/54/user-1633249_960_720.png';

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

  const takePicture = async () => {
    try {
      if (Platform.OS === 'ios') {
        launchCamera(
          {
            saveToPhotos: true,
            mediaType: 'photo',
            includeBase64: false,
          },
          setResponse,
        );
      }

      let granted;
      if (Platform.OS === 'android') {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'App Camera Permission',
            message: 'App needs access to your camera ',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );

        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission given');
          launchCamera(
            {
              saveToPhotos: true,
              mediaType: 'photo',
              includeBase64: false,
            },
            setResponse,
          );
        } else {
          console.log('Camera permission denied');
        }
      }
      closeModal();
    } catch (err) {
      console.warn(err);
      closeModal();
    }
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
            <ButtonWidget title={'Camera'} onPress={takePicture} />
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
        {showDefaultAvatar() && <Avatar uri={PLACEHOLDER_IMAGE} size={100} />}
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
