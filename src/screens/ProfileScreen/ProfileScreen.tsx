import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  PermissionsAndroid,
  Modal,
  Pressable,
} from 'react-native';
import {ScreenViewContainer} from '../../styles/GlobalStyle';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Strings from '../../i18n/en';
import {profileScreenStyles} from './styles';
import withHeader from '../../helpers/withHeader';

const ProfileScreen = () => {
  const [response, setResponse] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const uploadImage = () => {
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: 'photo',
        includeBase64: false,
      },
      setResponse,
    );
    setModalVisible(false);
  };

  const takePicture = async () => {
    try {
      const granted = await PermissionsAndroid.request(
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
      setModalVisible(false);
    } catch (err) {
      console.warn(err);
      setModalVisible(false);
    }
  };

  const removePicture = () => {
    setResponse({});
    setModalVisible(false);
  };

  const UploadImageModalView = () => {
    return (
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={profileScreenStyles.centeredView}>
          <View style={profileScreenStyles.modalView}>
            <Pressable
              style={[
                profileScreenStyles.button,
                profileScreenStyles.buttonOpen,
              ]}
              onPress={() => takePicture()}>
              <Text style={profileScreenStyles.textStyle}>Camera</Text>
            </Pressable>
            <Pressable
              style={[
                profileScreenStyles.button,
                profileScreenStyles.buttonOpen,
              ]}
              onPress={() => uploadImage()}>
              <Text style={profileScreenStyles.textStyle}>Gallery</Text>
            </Pressable>
            {response.hasOwnProperty('assets') && (
              <Pressable
                style={[
                  profileScreenStyles.button,
                  profileScreenStyles.buttonOpen,
                ]}
                onPress={() => removePicture()}>
                <Text style={profileScreenStyles.textStyle}>Remove</Text>
              </Pressable>
            )}
            <Pressable
              style={[
                profileScreenStyles.button,
                profileScreenStyles.buttonClose,
              ]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={profileScreenStyles.textStyle}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={ScreenViewContainer.container}>
      <UploadImageModalView />
      <View style={profileScreenStyles.mainview}>
        <Text style={profileScreenStyles.titleText}>{Strings.Greet_User}</Text>
        {!response.hasOwnProperty('assets') && (
          <Text style={profileScreenStyles.subTitleText}>
            {Strings.Img_Upload_Text}
          </Text>
        )}

        {response &&
          response.assets &&
          response.assets.map(({uri}: {uri: any}) => (
            <View key={uri} style={profileScreenStyles.imageView}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={profileScreenStyles.image}
                source={{uri: uri}}
              />
            </View>
          ))}

        <Pressable
          style={[profileScreenStyles.button, profileScreenStyles.buttonOpen]}
          onPress={() => setModalVisible(true)}>
          <Text style={profileScreenStyles.textStyle}>
            {response.hasOwnProperty('assets') ? 'Change' : 'Upload'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default withHeader(ProfileScreen);
