import React, { useState, useCallback, useContext } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { ScreenViewContainer } from '../../styles/GlobalStyle';
import { profileScreenStyles } from './styles';
import ButtonWidget from '../../components/ButtonWidget';
import Avatar from '../../components/Avatar';
import UploadImageModalView from '../../components/GalleryModal';
import { AuthContext } from '../../context/AuthContext';
import { ImagePickerResponse } from 'react-native-image-picker';
import Strings from '../../i18n/en';
import UserData from './User Data/UserData';
import { useSelector, useDispatch } from 'react-redux';
import All from './User Data 2/All';
import Note from './User Data 2/NoteWorthy';
import { Tabs } from 'react-native-collapsible-tab-view';

const ActiveScreen = () => {
  return (
    <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Active task</Text>
    </View>
  );
};

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
      </View>
    </ScrollView>
  );
};

const ProfileScreen2: React.FC = () => {
  return (
    <Tabs.Container renderHeader={ProfileScreen}>
      <Tabs.Tab name="Noteworthy">
        <Tabs.ScrollView style={{ flex: 1 }}>
          <Note />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Active">
        <Tabs.ScrollView style={{ flex: 1 }}>
          <ActiveScreen />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="All">
        <Tabs.ScrollView style={{ flex: 1 }}>
          <All />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default ProfileScreen2;
