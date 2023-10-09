// TODO: we wil remove this once we start using userData and contributionData
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useCallback, useContext } from 'react';
import {
  View,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Button,
  TouchableOpacity,
} from 'react-native';
import { ScreenViewContainer } from '../../styles/GlobalStyle';
import { profileScreenStyles } from './styles';
import withHeader from '../../helpers/withHeader';
import ButtonWidget from '../../components/ButtonWidget';
import Avatar from '../../components/Avatar';
import UploadImageModalView from '../../components/GalleryModal';
import { AuthContext } from '../../context/AuthContext';
import { ImagePickerResponse } from 'react-native-image-picker';
import Strings from '../../i18n/en';
import AllContributionsDropdown from './User Data/UserContributions/AllContributions';
import NoteworthyContributionsDropdown from './User Data/UserContributions/NoteWorthyContributions';
import ActiveTaskDropDown from './User Data/UserContributions/ActiveTask';
import UserData from './User Data/UserData';
import { useSelector, useDispatch } from 'react-redux';
import { AuthViewStyle } from '../AuthScreen/styles';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);
  const [response, setResponse] = useState<ImagePickerResponse>({});
  const [modalVisible, setModalVisible] = useState(false);
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

  const handleLogout = () => {
    // please remove the token
  };
  return (
    <ScrollView contentContainerStyle={ScreenViewContainer.container}>
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
          <UserData userData={loggedInUserData} />
        </Text>
        <ButtonWidget title={'Update'} onPress={openModal} />
        <ButtonWidget
          title={isProdEnvironment ? 'Switch to DEV' : 'Switch to Prod'}
          onPress={() => {
            isProdEnvironment
              ? dispatch({ type: 'DEV' })
              : dispatch({ type: 'PROD' });
          }}
        />
        <ScrollView style={AuthViewStyle.container}>
          <NoteworthyContributionsDropdown />
          <ActiveTaskDropDown />
          <AllContributionsDropdown />
          <Pressable
            style={profileScreenStyles.logoutButton}
            onPress={() => {
              setLoggedInUserData(null);
            }}
          >
            <Text style={profileScreenStyles.logoutText} onPress={handleLogout}>
              {Strings.LOGOUT}
            </Text>
          </Pressable>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default withHeader(ProfileScreen);
