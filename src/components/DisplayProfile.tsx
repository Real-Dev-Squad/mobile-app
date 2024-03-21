import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { UserInfoType } from '../screens/CalendarInvite/CalendarInviteScreen';
import { FlatList } from 'react-native-gesture-handler';
import Profile from './Profile';
import {
  getLastLoggedInTime,
  getTimeStampFromId,
} from '../screens/CalendarInvite/dummy';
import Toast from 'react-native-toast-message';
import { epocToDateTime } from '../helpers/SiteUtils';

const DisplayProfile = ({
  selectedUsers,
  setSelectedUsers,
  multiModeOn = false,
  latestTimeStamp,
}: {
  selectedUsers: UserInfoType[];
  setSelectedUsers: Dispatch<SetStateAction<UserInfoType[]>>;
  multiModeOn: boolean;
  latestTimeStamp: { id: string };
}) => {
  // console.log('🚀 ~ latestTimeStamp:', latestTimeStamp);
  const handleRemoveUser = (id: string) => {
    setSelectedUsers((prev: any) => prev.filter((item: any) => item.id !== id));
  };

  // latestTimeStamp
  const getScrollTime = (id: string) => {
    // TODO: time calculation issue
    getTimeStampFromId(id).then((res) => {
      console.log('Time stamp >>>>>>>', res, latestTimeStamp);
      Toast.show({
        type: 'success',
        text1: `Last Scroll Time: ${epocToDateTime(res, true).split('T')[1]}`,
        text2: `Last Active Time: ${
          epocToDateTime(getLastLoggedInTime(id, latestTimeStamp), true).split(
            'T',
          )[1]
        }`,
        position: 'bottom',
      });
    });
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={selectedUsers}
        horizontal={true}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() =>
                multiModeOn ? getScrollTime(item.id) : handleRemoveUser(item.id)
              }
            >
              <Profile
                selectedUser={item}
                multimodeOn={multiModeOn}
                index={index}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item?.id}
      />
    </View>
  );
};

export default DisplayProfile;
const styles = StyleSheet.create({
  container: {
    margin: 4,
  },
});
