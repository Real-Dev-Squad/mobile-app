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
import { useSelector, useDispatch } from 'react-redux';
import All from './TaskScreens/All';
// import Note from './UserDataV2/NoteWorthy';
import { Tabs } from 'react-native-collapsible-tab-view';

import { useFocusEffect } from '@react-navigation/native';
import { fetchActiveTasks } from '../AuthScreen/Util';
import DisplayContribution from '../../components/DisplayContribution';
import UserData from './User Data/UserData';

const dummyData = [
  {
    id: '0CZnoSLruyIihibT1F6m',
    percentCompleted: 100,
    endsOn: 1689206400,
    isNoteworthy: true,
    lossRate: { dinero: 250, neelam: 0 },
    type: 'feature',
    priority: 'HIGH',
    completionAward: { dinero: 4000, neelam: 0 },
    title: 'Test feature Test Test feature Test ',
    createdAt: 1676944234,
    createdBy: 'ankush',
    assignee: 'shreya',
    startedOn: 1676944233.827,
    status: 'ASSIGNED',
    updatedAt: 1702051343,
    assigneeId: 'T7IL7MB8YriniTw4bt39',
  },
];
export const ActiveScreen = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTasks, setActiveTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { loggedInUserData } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      (async () => {
        const token = loggedInUserData?.token;

        const tasksRes = await fetchActiveTasks(token);
        const dummyTasks = [...tasksRes, ...dummyData];
        const activeTaskRes = dummyTasks.filter(
          (item) => item.status !== 'COMPLETED',
        );
        setActiveTasks(activeTaskRes);
        setLoading(false);
      })();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loggedInUserData?.token]),
  );
  return (
    <View style={styles.profile}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <DisplayContribution tasks={activeTasks} expand={false} />
      )}
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

const ProfileScreen2: React.FC = ({ navigation }) => {
  return (
    <Tabs.Container renderHeader={ProfileScreen}>
      <Tabs.Tab name="Active">
        <Tabs.ScrollView style={{ flex: 1 }}>
          <ActiveScreen navigation={navigation} />
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

const styles = StyleSheet.create({
  profile: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    marginTop: 20,
  },
  loadingText: {
    color: 'black',
  },
});

export default ProfileScreen2;
