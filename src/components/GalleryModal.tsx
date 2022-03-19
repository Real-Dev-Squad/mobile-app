import React from 'react';
import {Modal, Pressable, View} from 'react-native';
import Images from '../constants/images/Image';
import takePicture from '../helpers/LaunchCamera';
import uploadImage from '../helpers/LaunchGallery';
import {profileScreenStyles} from '../screens/ProfileScreen/styles';
import ButtonWidget from './ButtonWidget';

type props = {
  response: any;
  setResponse: (res: any) => void;
  closeModal: () => void;
  removePicture: () => void;
  modalVisible: boolean;
};
const UploadImageModalView: React.FC<props> = ({
  modalVisible,
  response,
  setResponse,
  closeModal,
  removePicture,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Pressable onPress={closeModal} style={profileScreenStyles.centeredView}>
        <View style={profileScreenStyles.modalView}>
          <ButtonWidget
            title={'Camera'}
            icon={Images.cameraIcon}
            onPress={() => takePicture(setResponse, closeModal)}
          />
          <ButtonWidget
            title={'Gallery'}
            icon={Images.galleryIcon}
            onPress={() => uploadImage(setResponse, closeModal)}
          />
          {response.hasOwnProperty('assets') && (
            <ButtonWidget
              title={'Remove'}
              icon={Images.remove}
              onPress={removePicture}
            />
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

export default UploadImageModalView;
