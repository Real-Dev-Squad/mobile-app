import {
  FlatList,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { TextInput } from 'react-native-paper';
import StyleConfig from '../utils/StyleConfig';
import { scale } from '../utils/utils';
import { AuthContext } from '../context/AuthContext';
import { getAllUsers } from '../screens/AuthScreen/Util';
import Images from '../constants/images/Image';
import { UserInfoType } from '../context/type';

const DropDown = ({
  handleUserId,
  error,
  title = 'Notify To',
  disabled, // multimode = true disabled true
}: {
  handleUserId: (info: any) => void;
  error: string;
  title: string;
  disabled: boolean;
}) => {
  const [isDropDownSelected, setIsDropDownSelected] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState<UserInfoType | ''>('');
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInUserData } = useContext(AuthContext);

  const selectDropDown = () => {
    Keyboard.dismiss();
    setIsDropDownSelected(!isDropDownSelected);
  };

  const handleDropDownPress = (item: UserInfoType) => {
    setSelectedUser(item);
    handleUserId(item);
    setIsDropDownSelected(false);
    setSelectedUser('');
  };
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const allUser = await getAllUsers(loggedInUserData?.token);
    setAllUsers(allUser);
    setIsLoading(false);
  };
  // TODO: refactor dropdown
  // TODO: Move styling
  // TODO: show discord groups as well for group notification
  return (
    <View
      style={{
        marginHorizontal: 10,
        position: 'relative',
      }}
    >
      {error ? (
        <Text style={[styles.titles, { color: 'red' }]}>{error}</Text>
      ) : (
        <Text style={styles.titles}>{title}</Text>
      )}
      <TouchableOpacity
        testID="dropdown"
        style={[
          styles.dropDownSelector,
          styles.inputStyle,
          {
            borderColor: disabled ? 'grey' : 'black',
            borderWidth: disabled ? 1 : 1.5,
          },
        ]}
        onPress={selectDropDown}
        disabled={disabled}
      >
        <Text
          style={{
            color:
              selectedUser === ''
                ? StyleConfig.colors.placeholderText
                : StyleConfig.colors.darkGrey,
          }}
        >
          {selectedUser === '' ? 'Select User' : selectedUser?.first_name}
        </Text>
        {!isDropDownSelected ? (
          <Image source={Images.dropdown} style={styles.dropDownIcon} />
        ) : (
          <Image source={Images.dropup} style={styles.dropDownIcon} />
        )}
      </TouchableOpacity>
      {isDropDownSelected ? (
        <View
          testID="user-container"
          style={[
            styles.dropDownArea,
            {
              position: 'absolute',
              zIndex: 9999,
              top: 60,
              backgroundColor: 'white',
            },
          ]}
        >
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
              data={allUsers.filter(
                (item: UserInfoType) =>
                  item.first_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.last_name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  item.github_id
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()),
              )}
              renderItem={({
                item,
                index,
              }: {
                item: UserInfoType;
                index: number;
              }) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleDropDownPress(item)}
                    style={styles.userDetails}
                  >
                    {item?.picture && item.picture.url ? (
                      <Image
                        source={{ uri: item.picture.url }}
                        style={styles.userImageDropDown}
                      />
                    ) : (
                      <View style={styles.defaultImageContainer}>
                        <Text
                        // style={styles.defaultImageText}
                        >
                          {item.first_name.charAt(0)} {item.last_name.charAt(0)}
                        </Text>
                      </View>
                    )}
                    <Text style={styles.userNameDropDown}>
                      {item.first_name} {item.last_name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      ) : null}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  titles: {
    fontSize: scale(12),
    marginBottom: scale(4),
    // marginTop: scale(20),
    color: StyleConfig.colors.greyLabel,
  },
  dropDownSelector: {
    padding: 10,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    // borderColor: 'black',
  },
  dropDownIcon: {
    width: 20,
    height: 20,
  },
  searchBar: {
    marginBottom: scale(20),
    marginHorizontal: 5,
    borderBottomWidth: 0.5,
    fontSize: scale(12),
    color: StyleConfig.colors.darkGrey,
  },
  dropDownArea: {
    height: scale(250),
    borderWidth: 0.5,
    marginTop: 10,
    borderRadius: 8,
    elevation: 10,
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
  inputStyle: {
    padding: scale(10),
    borderRadius: 8,
    backgroundColor: StyleConfig.colors.whiteInput,
    fontSize: scale(12),
    borderWidth: 0.5,
    color: StyleConfig.colors.darkGrey,
  },
});
