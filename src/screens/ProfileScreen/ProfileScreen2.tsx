import React, { useState, useCallback, useContext } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet } from 'react-native';
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
import All from './UserDataV2/All';
import Note from './UserDataV2/NoteWorthy';
import { Tabs } from 'react-native-collapsible-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { fetchContribution } from '../AuthScreen/Util';
import DisplayContribution from '../../components/DisplayContribution';

const ActiveScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTasks, setActiveTasks] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const userName = loggedInUserData?.username;
        const contributionResponse = await fetchContribution(userName);
        setActiveTasks(
          contributionResponse.all.filter(
            (item) => item.task.status === 'ACTIVE',
          ),
        );
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  return (
    <View style={{ justifyContent: 'flex-start', alignItems: 'center' }}>
      <DisplayContribution tasks={activeTasks} />
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

  const handleLogout = () => {
    setLoggedInUserData(null);
  };

  return (
    <ScrollView contentContainerStyle={ScreenViewContainer.container}>
      <Pressable
        style={profileScreenStyles.logoutButton}
        onPress={handleLogout}
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
        <Tabs.ScrollView>
          <Note />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Active">
        <Tabs.ScrollView>
          <ActiveScreen />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="All">
        <Tabs.ScrollView>
          <All />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

export default ProfileScreen2;
