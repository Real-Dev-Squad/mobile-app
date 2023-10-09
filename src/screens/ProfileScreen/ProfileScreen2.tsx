import React, { useState, useCallback, useContext } from 'react';
import {
  View,
  StyleSheet,
  ListRenderItem,
  Text,
  ScrollView,
  Pressable,
} from 'react-native';
import { Tabs } from 'react-native-collapsible-tab-view';
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
import { useNavigation } from '@react-navigation/native';
import All from './User Data 2/All';
import Note from './User Data 2/NoteWorthy';
import UserData from './User Data/UserData';

const HEADER_HEIGHT = 150;

const DATA = [0, 1, 2, 3, 4];
const identity = (v: unknown): string => v + '';

const ActiveScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: 'black' }}>Active task</Text>
    </View>
  );
};

const ProfileScreen = () => {
  const { data: userData } = useSelector((store) => store.user);
  const [response, setResponse] = useState<ImagePickerResponse>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [contributionData, setContributionData] = useState([]);
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
        setContributionData(contributionResponse.noteworthy);
      })();
    }, []),
  );

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
          {/* {loggedInUserData?.name} */}
          <UserData userData={userData} />
        </Text>
        <ButtonWidget title={'Update'} onPress={openModal} />
      </View>
    </ScrollView>
  );
};

const Example: React.FC = () => {
  const renderItem: ListRenderItem<number> = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]} />
    );
  }, []);

  return (
    <Tabs.Container
      renderHeader={ProfileScreen}
      // headerHeight={HEADER_HEIGHT}
      containerStyle={{ backgroundColor: '#E4F1FF' }}
    >
      <Tabs.Tab name="All">
        {/* <Tabs.FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={identity}
        /> */}
        <Tabs.ScrollView style={{flex: 1}}>
          <All />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Active tasks">
        <Tabs.ScrollView style={{flex: 1}}>
          {/* <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} /> */}
          <ActiveScreen />
        </Tabs.ScrollView>
      </Tabs.Tab>
      <Tabs.Tab name="Noteworthy">
        <Tabs.ScrollView style={{flex: 1}}>
          {/* <View style={[styles.box, styles.boxA]} />
          <View style={[styles.box, styles.boxB]} /> */}
          <Note />
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: '100%',
  },
  boxA: {
    backgroundColor: 'white',
  },
  boxB: {
    backgroundColor: '#D8D8D8',
  },
  header: {
    height: HEADER_HEIGHT,
    width: '100%',
    backgroundColor: '#2196f3',
    flexWrap: 'wrap',
  },
});

export default Example;
