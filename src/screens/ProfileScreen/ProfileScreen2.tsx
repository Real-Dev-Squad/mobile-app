import React, { useState, useCallback, useContext } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ScreenViewContainer } from '../../styles/GlobalStyle';
import { profileScreenStyles } from './styles';
import Avatar from '../../components/Avatar';
import UploadImageModalView from '../../components/GalleryModal';
import { AuthContext } from '../../context/AuthContext';
import { ImagePickerResponse } from 'react-native-image-picker';
import All from './TaskScreens/All';
import { Tabs } from 'react-native-collapsible-tab-view';

import { useFocusEffect } from '@react-navigation/native';
import { fetchActiveTasks } from '../AuthScreen/Util';
import DisplayContribution from '../../components/DisplayContribution';
import UserData from './User Data/UserData';
import Loader from '../../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EllipseComponent from '../../components/EllipseComponent';


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
        const activeTaskRes = tasksRes.filter(
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
        <Loader />
      ) : (
        <DisplayContribution tasks={activeTasks} expand={false} />
      )}
    </View>
  );
};

const ProfileScreen = () => {
  // const dispatch = useDispatch();
  // const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);
  const [response, setResponse] = useState<ImagePickerResponse>({});
  const [modalVisible, setModalVisible] = useState(false);
  const { loggedInUserData, setLoggedInUserData } = useContext(AuthContext);

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
    AsyncStorage.removeItem('userData');
  };

  return (
    <ScrollView contentContainerStyle={ScreenViewContainer.container}>
      {/* <Pressable
        style={profileScreenStyles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={profileScreenStyles.logoutText}>{Strings.LOGOUT}</Text>
      </Pressable> */}
      <EllipseComponent handleLogout={handleLogout} />
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
        <View style={profileScreenStyles.titleText}>
          <UserData userData={loggedInUserData} />
        </View>
        {/* <ButtonWidget title={'Update'} onPress={openModal} /> */}
        {/* TODO: Below we should do for admin not for all users */}
        {/* <ButtonWidget
          title={isProdEnvironment ? 'Switch to DEV' : 'Switch to Prod'}
          onPress={() => {
            isProdEnvironment
              ? dispatch({ type: 'DEV' })
              : dispatch({ type: 'PROD' });
          }}
        /> */}
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
});

export default ProfileScreen2;
