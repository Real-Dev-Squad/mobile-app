import { PermissionsAndroid, Platform } from 'react-native';
import { ImagePickerResponse, launchCamera } from 'react-native-image-picker';

const takePicture = async (
  setResponse: (res: ImagePickerResponse) => void,
  closeModal: () => void,
) => {
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
        launchCamera(
          {
            quality: 0.5,
            maxWidth: 400,
            maxHeight: 400,
            mediaType: 'photo',
            saveToPhotos: false,
          },
          setResponse,
        );
      } else {
        // TODO: add toast to notify user
        // console.log('Camera permission denied');
      }
    }
    closeModal();
  } catch (err) {
    console.warn(err);
    closeModal();
  }
};

export default takePicture;
