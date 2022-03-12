import React, {useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import {ScreenViewContainer} from '../../styles/GlobalStyle';
import Strings from '../../i18n/en';
import {profileScreenStyles} from './styles';
import withHeader from '../../helpers/withHeader';
import ButtonWidget from '../../components/ButtonWidget';
import Avatar from '../../components/Avatar';
import Images from '../../constants/images/Image';
import UploadImageModalView from '../../components/GalleryModal';

const ProfileScreen = () => {
  const [response, setResponse] = useState<any>({});
  const [modalVisible, setModalVisible] = useState(false);

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
        {!response.hasOwnProperty('assets') && (
          <Text style={profileScreenStyles.subTitleText}>
            {Strings.Img_Upload_Text}
          </Text>
        )}
        {response?.assets &&
          response.assets.map(({uri}: {uri: string}) => (
            <Avatar key={uri} uri={uri} size={100} />
          ))}
        {showDefaultAvatar() && (
          <Avatar uri={Images.DEFAULT_IMAGE} size={100} />
        )}
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
