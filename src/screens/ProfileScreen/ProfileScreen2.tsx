import React, { useState, useCallback, useContext } from 'react';
import { View, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { ScreenViewContainer } from '../../styles/GlobalStyle';
import { profileScreenStyles } from './styles';
import Avatar from '../../components/Avatar';
import UploadImageModalView from '../../components/GalleryModal';
import { AuthContext } from '../../context/AuthContext';
import { ImagePickerResponse } from 'react-native-image-picker';
import All from './TaskScreens/All';
import { Tabs } from 'react-native-collapsible-tab-view';
import UserData from './User Data/UserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EllipseComponent from '../../components/EllipseComponent';
import ActiveScreen from './TaskScreens/ActiveTask';

const ProfileScreen = () => {
  const [response, setResponse] = useState<ImagePickerResponse>({});
  const [modalVisible, setModalVisible] = useState(false);
  const { loggedInUserData, setLoggedInUserData } = useContext(AuthContext);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

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
    <ScrollView
      contentContainerStyle={ScreenViewContainer.container}
      // onPress={handleDropdown}
    >
      <EllipseComponent
        handleLogout={handleLogout}
        isDropdownVisible={isDropdownVisible}
        handleDropDown={handleDropdown}
      />
      <UploadImageModalView
        closeModal={closeModal}
        modalVisible={modalVisible}
        removePicture={removePicture}
        response={response}
        setResponse={setResponse}
      />
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
