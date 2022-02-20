import { PermissionsAndroid, Platform} from "react-native";
import { launchCamera } from "react-native-image-picker";

const takePicture = async (setResponse: any, closeModal: any) => {
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

export default takePicture;