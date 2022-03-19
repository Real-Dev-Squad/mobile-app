import {launchImageLibrary} from 'react-native-image-picker';

const uploadImage = (setResponse: any, closeModal: any) => {
  launchImageLibrary(
    {
      quality: 0.5,
      maxWidth: 400,
      maxHeight: 400,
      mediaType: 'photo',
    },
    res => {
      console.log(res);
      setResponse(res);
    },
  );
  closeModal();
};

export default uploadImage;
