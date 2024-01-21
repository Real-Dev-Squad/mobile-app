import React, { useState, useCallback, useContext } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

import { View, TouchableWithoutFeedback, ScrollView, Text } from 'react-native';
import { profileScreenStyles } from './styles';
import Avatar from '../../components/Avatar';
import { AuthContext } from '../../context/AuthContext';
import { ImagePickerResponse } from 'react-native-image-picker';
import All from './TaskScreens/All';
import { Tabs } from 'react-native-collapsible-tab-view';
import { useFocusEffect } from '@react-navigation/native';
import { fetchActiveTasks } from '../AuthScreen/Util';
import DisplayContribution from '../../components/DisplayContribution';
import UserData from './User Data/UserData';
import EllipseComponent from '../../components/EllipseComponent';
import ActiveScreen from './TaskScreens/ActiveTask';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';

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
  const [response] = useState<ImagePickerResponse>({});
  const { loggedInUserData, setLoggedInUserData } = useContext(AuthContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdown = () => {
    setDropdownVisible((prev) => !prev);
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
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity style={styles.optionsButton} onPress={handleDropdown}>
          <Text style={styles.verticalEllipse}>...</Text>
        </TouchableOpacity>
      </View>
      {isDropdownVisible && (
        <Modal
          isVisible={isDropdownVisible}
          onBackdropPress={handleDropdown}
          onBackButtonPress={handleDropdown}
          backdropOpacity={0.7}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={profileScreenStyles.modal}
        >
          <EllipseComponent
            handleLogout={handleLogout}
            isDropdownVisible={isDropdownVisible}
            handleDropDown={handleDropdown}
          />
        </Modal>
      )}
      {/* <UploadImageModalView
        closeModal={closeModal}
        modalVisible={modalVisible}
        removePicture={removePicture}
        response={response}
        setResponse={setResponse}
      /> */}
      <TouchableWithoutFeedback
        style={profileScreenStyles.mainview}
        onPress={handleDropdown}
      >
        <>
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
        </>
      </TouchableWithoutFeedback>
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

export default ProfileScreen2;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  optionsButton: {
    padding: 4,
  },
  verticalEllipse: {
    color: 'black',
    fontSize: 24,
    marginTop: 4,
    fontWeight: 'bold',
    transform: [{ rotate: '90deg' }],
  },
});
