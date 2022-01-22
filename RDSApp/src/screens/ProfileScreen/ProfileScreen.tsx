import React, { useState } from 'react';
import { View, Text, Image, PermissionsAndroid, Button, Modal, Pressable } from 'react-native';
import { ScreenViewContainer } from '../../styles/GlobalStyle';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Strings from '../../i18n/en';
import { profileScreenStyles, modalStyles } from './ProfileScreenStyles';

const ProfileScreen = () => {

  const [response, setResponse] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const uploadImage = () => {
    launchImageLibrary({
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    }, setResponse)
    setModalVisible(false)
  }

  const takePicture = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "App Camera Permission",
          message: "App needs access to your camera ",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Camera permission given");
        launchCamera({
          saveToPhotos: true,
          mediaType: 'photo',
          includeBase64: false,
        }, setResponse)
      } else {
        console.log("Camera permission denied");
      }
      setModalVisible(false)
    } catch (err) {
      console.warn(err);
      setModalVisible(false)
    }
  }

  const removePicture = () => {
    setResponse({})
    setModalVisible(false)
  }

  return (
    <View style={ScreenViewContainer.container}>
      <Modal
        animationType="fade"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonOpen]}
              onPress={() => takePicture()}
            >
              <Text style={modalStyles.textStyle}>Camera</Text>
            </Pressable>
            <Pressable
              style={[modalStyles.button, modalStyles.buttonOpen]}
              onPress={() => uploadImage()}
            >
              <Text style={modalStyles.textStyle}>Gallery</Text>
            </Pressable>
            {response && response.assets &&
              <Pressable
                style={[modalStyles.button, modalStyles.buttonOpen]}
                onPress={() => removePicture()}>
                <Text style={modalStyles.textStyle}>Remove</Text>
              </Pressable>
            }
            <Pressable
              style={[modalStyles.button, modalStyles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={modalStyles.textStyle}>Back</Text>
            </Pressable>
          </View>
        </View>
      </Modal >
      <View style={profileScreenStyles.mainview}>

        <Text style={profileScreenStyles.titleText}>{Strings.Greet_User}</Text>
        {!(response.hasOwnProperty('assets')) && <Text style={profileScreenStyles.titleText}>{Strings.Img_Upload_Text}</Text>}

        {
          response && response.assets &&
          (response.assets.map(({ uri }: { uri: any }) => (
            <View key={uri} style={profileScreenStyles.imageView}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={profileScreenStyles.image}
                source={{ uri: uri }}
              />
            </View>
          )))
        }
        <Pressable
          style={[modalStyles.button, modalStyles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <Text style={modalStyles.textStyle}>{response && response.assets ? 'Change' : 'Upload'}</Text>
        </Pressable>
      </View >
    </View >
  );
};

export default ProfileScreen;
