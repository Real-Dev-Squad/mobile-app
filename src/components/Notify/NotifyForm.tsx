import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Keyboard,
} from 'react-native';
import Colors from '../../constants/colors/Colors';
import StyleConfig from '../../utils/StyleConfig';
import { scale } from '../../utils/utils';
import {
  getAllUsers,
  postFcmToken,
  sendNotification,
} from '../../screens/AuthScreen/Util';
import { AuthContext } from '../../context/AuthContext';
import { firebase } from '@react-native-firebase/messaging';

const NotifyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isDropDownSelected, setIsDropDownSelected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInUserData } = useContext(AuthContext);
  const token = loggedInUserData?.token;

  const selectDropDown = () => {
    Keyboard.dismiss();
    setIsDropDownSelected(!isDropDownSelected);
  };

  const handleDropDownPress = (item: any) => {
    setSelectedUser(item);
    setIsDropDownSelected(false);
  };

  const getFCMToken = async () => {
    const fcmToken_ = await firebase.messaging().getToken();
    console.log('🚀 ~ getFCMToken ~ fcmToken_:', fcmToken_);

    await postFcmToken(fcmToken_, token);
  };
  const handleButtonPress = async () => {
    // Handle the button press and perform necessary actions (e.g., send notification)

    console.log('setSelected User', {
      title,
      description,
      notifyTo: selectedUser?.id,
    });
    await sendNotification(title, description, selectedUser?.id, token);
  };

  useEffect(() => {
    const fetchData = async () => {
      const allUser = await getAllUsers(loggedInUserData?.token);
      setAllUsers(allUser);
      setIsLoading(false);
    };
    fetchData();
    getFCMToken();
  }, [loggedInUserData?.token]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Enter title"
        placeholderTextColor={'black'}
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Enter description"
        placeholderTextColor={'black'}
        multiline
      />

      <Text style={styles.label}>Notify To:</Text>
      <View>
        <TouchableOpacity
          testID="dropdown"
          style={[styles.dropDownSelector, styles.pickerContainer]}
          onPress={selectDropDown}
        >
          <Text
            style={{
              color:
                selectedUser === ''
                  ? StyleConfig.colors.placeholderText
                  : StyleConfig.colors.darkGrey,
            }}
          >
            {selectedUser === '' ? 'Select User' : selectedUser?.username}
          </Text>
        </TouchableOpacity>
        {isDropDownSelected ? (
          <View testID="user-container" style={styles.dropDownArea}>
            <TextInput
              style={styles.searchBar}
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              maxLength={200}
              placeholder="Search User"
              placeholderTextColor={StyleConfig.colors.placeholderText}
            />
            {isLoading ? (
              <Text>Loading...</Text>
            ) : (
              <FlatList
                nestedScrollEnabled
                data={allUsers?.filter(
                  (item) =>
                    item?.username
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    item?.first_name
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    item?.last_name
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()) ||
                    item?.github_id
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase()),
                )}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleDropDownPress(item)}
                      style={styles.userDetails}
                    >
                      {item?.picture && item?.picture.url ? (
                        <Image
                          source={{ uri: item?.picture.url }}
                          style={styles.userImageDropDown}
                        />
                      ) : (
                        <View style={styles.defaultImageContainer}>
                          <Text style={styles.defaultImageText}>
                            {item?.username
                              ? item?.username?.charAt(0)
                              : item?.first_name?.charAt(0)}{' '}
                            {item?.last_name?.charAt(0)}
                          </Text>
                        </View>
                      )}
                      <Text style={styles.userNameDropDown}>
                        {item?.username
                          ? item?.username
                          : item?.first_name + item?.last_name}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            )}
          </View>
        ) : null}
      </View>
      <View style={{ marginTop: 16 }}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: Colors.Primary_Color }]}
          onPress={handleButtonPress}
        >
          <Text style={{ color: 'white' }}>{'Notify'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
  },
  label: {
    color: 'black',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    color: 'black',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  picker: {
    width: '100%',
    height: 50,
    color: 'black',
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 2,
    // overflow: 'hidden',
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  dropDownSelector: {
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropDownIcon: {
    width: 20,
    height: 20,
  },
  dropDownArea: {
    height: scale(250),
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 8,
  },
  userNameDropDown: {
    padding: 20,
    borderBottomColor: 'white',
    width: '90%',
    alignSelf: 'center',
    color: StyleConfig.colors.darkGrey,
  },
  userDetails: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
  },
  userImageDropDown: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  defaultImageContainer: {
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    backgroundColor: StyleConfig.colors.placeholderText,
    borderRadius: 50,
  },
  error: {
    color: 'red',
    fontSize: 10,
  },
  searchBar: {
    marginBottom: scale(20),
    marginHorizontal: 5,
    borderBottomWidth: 0.5,
    fontSize: scale(12),
    color: StyleConfig.colors.darkGrey,
  },
  inputStyle: {
    padding: scale(10),
    borderRadius: 8,
    backgroundColor: StyleConfig.colors.whiteInput,
    fontSize: scale(12),
    borderWidth: 0.5,
    color: StyleConfig.colors.darkGrey,
  },
});

export default NotifyForm;
