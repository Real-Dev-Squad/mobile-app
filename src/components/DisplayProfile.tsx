import { StyleSheet, View } from 'react-native';
import React from 'react';
import { UserInfoType } from '../screens/CalendarInvite/CalendarInviteScreen';
import { FlatList } from 'react-native-gesture-handler';
import Profile from './Profile';

const DisplayProfile = ({
  selectedUsers,
}: {
  selectedUsers: UserInfoType[];
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={selectedUsers}
        horizontal={true}
        renderItem={({ item }) => {
          console.log('item', item);
          return <Profile selectedUser={item} />;
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
