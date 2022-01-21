import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, PermissionsAndroid, Button } from 'react-native';
import { ScreenViewContainer } from '../styles/GlobalStyle';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = () => {
  type ResponseObj = {
    fileName: string
    fileSize: number
    height: number
    type: string
    uri: string
    width: number
  }
  type Response = null | { assets: ResponseObj[] }
  const [response, setResponse] = useState<any>(null);

  const uploadImage = () => launchImageLibrary({
    selectionLimit: 1,
    mediaType: 'photo',
    includeBase64: false,
  }, setResponse)

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
    } catch (err) {
      console.warn(err);
    }
  }
  const submitPicture = () => {
    console.log(response)
  }
  const removePicture = () => {
    setResponse(null)
  }

  return (
    <View style={ScreenViewContainer.container}>
      {/* <Text style={ScreenViewContainer.text_view}>Profile Screen</Text> */}
      <View style={styles.mainview}>

        <Text style={styles.titleText}>Hello User</Text>
        <Text style={styles.titleText}>Upload your Profile Image</Text>

        <View style={styles.buttonGroup}>
          <View style={styles.button}>
            <Button
              title="Camera"
              onPress={takePicture}
            />
          </View>
          <View style={styles.button}>
            <Button
              title="Gallery"
              onPress={uploadImage}
            />
          </View>
        </View>
        {
          response && response.assets &&
          (response.assets.map(({ uri }: { uri: any }) => (
            <View key={uri} style={styles.imageView}>
              <Image
                resizeMode="cover"
                resizeMethod="scale"
                style={styles.image}
                source={{ uri: uri }}
              />
              <View >
                <View style={styles.button}>
                  <Button
                    title="Remove"
                    onPress={removePicture}
                  />
                </View>
                <View >
                  <Button
                    title="Submit"
                    onPress={submitPicture}
                  />
                </View>
              </View>
            </View>
          )))
        }
      </View >
    </View>
  );
};

const styles = StyleSheet.create({
  mainview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#041484',

  },
  imageView: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200
  },
  buttonGroup: {
    flexDirection: "row"
  },
  button: {
    padding: 15
  }
})

export default ProfileScreen;
