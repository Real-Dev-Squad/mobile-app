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
import RootContext from '../../context/RootContext';

const ProfileScreen = () => {
  const [response, setResponse] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

  const {loggedInUserData} = useContext(RootContext);
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

  const fetchUserInfo = async () => {
    try {
      const githubLoginInfo = await Keychain.getGenericPassword();

      if (!githubLoginInfo || !githubLoginInfo.password) {
        return;
      }

      const data = JSON.parse(githubLoginInfo.password);

      const {accessToken} = data;

      const userAgent = await UserAgent.getWebViewUserAgent();

      axios.defaults.headers.common['User-Agent'] = userAgent;

      const res = await axios.get('https://api.github.com/user', {
        headers: {
          'User-Agent': `${userAgent}`,
          Authorization: `token ${accessToken}`,
        },
      });

      console.log('data', JSON.stringify(res.data));
      setUserName(res.data.login);
      setProfileImg(res.data.avatar_url);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [loggedInUserData]);

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
          <Avatar uri={profileImg} size={100} />
        )}
        <Text style={profileScreenStyles.titleText}>{userName}</Text>
        <ButtonWidget
          title={response?.assets ? 'Change' : 'Update'}
          onPress={openModal}
        />
      </View>
    </View>
  );
};

export default withHeader(ProfileScreen);
