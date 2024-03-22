import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { UserInfoType } from '../../context/type';
import Profile from './Profile';

const DisplayProfile = ({
  selectedUsers,
  setSelectedUsers,
  multiModeOn = false,
}: {
  selectedUsers: UserInfoType[];
  setSelectedUsers: Dispatch<SetStateAction<UserInfoType[]>>;
  multiModeOn: boolean;
}) => {
  const handleRemoveUser = (id: string) => {
    setSelectedUsers((prev: any) => prev.filter((item: any) => item.id !== id));
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={selectedUsers}
        horizontal={true}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => !multiModeOn && handleRemoveUser(item.id)}
            >
              <Profile
                selectedUser={item}
                multimodeOn={multiModeOn}
                index={index}
              />
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
