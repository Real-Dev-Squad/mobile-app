import React, {useState, useCallback, useEffect, useContext} from 'react';
import {View, Text} from 'react-native';
import {ScreenViewContainer} from '../../styles/GlobalStyle';
import * as Keychain from 'react-native-keychain';
import UserAgent from 'react-native-user-agent';
import axios from 'axios';
import Strings from '../../i18n/en';
import {profileScreenStyles} from './styles';
import withHeader from '../../helpers/withHeader';
import ButtonWidget from '../../components/ButtonWidget';
import Avatar from '../../components/Avatar';
import Images from '../../constants/images/Image';
import UploadImageModalView from '../../components/GalleryModal';
import {AuthContext} from '../../context/AuthContext';

const ProfileScreen = () => {
  const [response, setResponse] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const {loggedInUserData} = useContext(AuthContext);
  const [userName, setUserName] = useState('User');
  const [profileImg, setProfileImg] = useState(Images.DEFAULT_IMAGE);

  const openModal = useCallback(() => {
    setModalVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const removePicture = () => {
    setResponse({});
    closeModal();
  };

  const showDefaultAvatar = () => {
    if (response?.assets) {
      return false;
    }
    return true;
  };

  return (
    <View style={ScreenViewContainer.container}>
      <UploadImageModalView
        closeModal={closeModal}
        modalVisible={modalVisible}
        removePicture={removePicture}
        response={response}
        setResponse={setResponse}
      />
      <View style={profileScreenStyles.mainview}>
        {response?.assets &&
          response.assets.map(({uri}: {uri: string}) => (
            <Avatar key={uri} uri={uri} size={100} />
          ))}
        {showDefaultAvatar() && (
          <Avatar uri={loggedInUserData.profileUrl} size={100} />
        )}
        <Text style={profileScreenStyles.titleText}>
          {loggedInUserData.name}
        </Text>
        <ButtonWidget title={'Update'} onPress={openModal} />
      </View>
    </View>
  );
};

export default withHeader(ProfileScreen);
