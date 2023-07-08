import React, { useState, useCallback, useContext } from 'react';
import { View, Text, Pressable } from 'react-native';
import { ScreenViewContainer } from '../../styles/GlobalStyle';
import { profileScreenStyles } from './styles';
import withHeader from '../../helpers/withHeader';
import ButtonWidget from '../../components/ButtonWidget';
import Avatar from '../../components/Avatar';
import UploadImageModalView from '../../components/GalleryModal';
import { AuthContext } from '../../context/AuthContext';
import { ImagePickerResponse } from 'react-native-image-picker';
import Strings from '../../i18n/en';
import { fetchContribution } from '../AuthScreen/Util';
import { useFocusEffect } from '@react-navigation/native';

import { useSelector } from 'react-redux';

const ProfileScreen = () => {
  const { data: userData } = useSelector((store) => store.user);
  const [response, setResponse] = useState<ImagePickerResponse>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [contributionData, setContributionData] = useState({
    allData: [],
    noteworthy: [],
  });
  const { loggedInUserData, setLoggedInUserData } = useContext(AuthContext);

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

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const userName = 'ankush';
        const contributionResponse = await fetchContribution(userName);
        setContributionData(contributionResponse);
      })();
    }, []),
  );

  return (
    <View style={ScreenViewContainer.container}>
      <Pressable
        style={profileScreenStyles.logoutButton}
        onPress={() => {
          setLoggedInUserData(null);
        }}
      >
        <Text style={profileScreenStyles.logoutText}>{Strings.LOGOUT}</Text>
      </Pressable>

      <UploadImageModalView
        closeModal={closeModal}
        modalVisible={modalVisible}
        removePicture={removePicture}
        response={response}
        setResponse={setResponse}
      />
      <View style={profileScreenStyles.mainview}>
        {response?.assets &&
          response.assets.map(({ uri }) => (
            <Avatar key={uri} uri={uri || ''} size={100} />
          ))}
        {showDefaultAvatar() && (
          <Avatar uri={loggedInUserData?.profileUrl || ''} size={100} />
        )}
        <Text style={profileScreenStyles.titleText}>
          {loggedInUserData?.name}
        </Text>
        <ButtonWidget title={'Update'} onPress={openModal} />
      </View>
    </View>
  );
};

export default withHeader(ProfileScreen);
