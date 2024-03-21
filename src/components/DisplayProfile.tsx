import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { UserInfoType } from '../screens/CalendarInvite/CalendarInviteScreen';
import { FlatList } from 'react-native-gesture-handler';
import Profile from './Profile';

const DisplayProfile = ({
  selectedUsers,
  setSelectedUsers,
}: {
  selectedUsers: UserInfoType[];
  setSelectedUsers: Dispatch<SetStateAction<UserInfoType[]>>;
}) => {
  const handleRemoveUser = (id: string) => {
    setSelectedUsers((prev: any) => prev.filter((item: any) => item.id !== id));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={selectedUsers}
        horizontal={true}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity onPress={() => handleRemoveUser(item.id)}>
              <Profile selectedUser={item} />
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => item.id}
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
