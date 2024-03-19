import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserInfoType } from '../screens/CalendarInvite/CalendarInviteScreen';
import { FlatList } from 'react-native-gesture-handler';
import Profile from './Profile';
import {
  getLastLoggedInTime,
  getTimeStampFromId,
} from '../screens/CalendarInvite/dummy';
import Toast from 'react-native-toast-message';
import { epocToDateTime } from '../helpers/SiteUtils';
import { compact } from 'lodash';

const DisplayProfile = ({
  selectedUsers,
  setSelectedUsers,
  multiModeOn = false,
  latestTimeStamp,
  lastActiveUser,
}: {
  selectedUsers: UserInfoType[];
  setSelectedUsers: Dispatch<SetStateAction<UserInfoType[]>>;
  multiModeOn: boolean;
  latestTimeStamp: { id: string };
  lastActiveUser: UserInfoType;
}) => {
  console.log('🚀 ~ lastActiveUser:', lastActiveUser, selectedUsers);

  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    multiModeOn &&
      Animated.timing(animation, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setSelectedUsers((prevList) => {
          const newList = prevList.filter(
            (item) => item?.id !== lastActiveUser.id,
          );
          return compact([lastActiveUser, ...newList]);
        });
        animation.setValue(0);
      });
  }, [lastActiveUser, multiModeOn]);
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

  const renderAvatarTiles = ({ item, index }) => {
    const animatedStyles = {
      transform: [
        {
          translateX: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [
              0,
              index === 0 && lastActiveUser !== null
                ? selectedUsers.length * 50
                : 0,
            ],
          }),
        },
      ],
    };

    return (
      <TouchableOpacity
        onPress={() =>
          multiModeOn ? getScrollTime(item.id) : handleRemoveUser(item.id)
        }
      >
        {multiModeOn && (
          <Animated.View
            style={[{ display: 'flex', flexDirection: 'row' }, animatedStyles]}
          >
            <Profile
              selectedUser={item}
              multimodeOn={multiModeOn}
              index={index}
              key={index}
            />
          </Animated.View>
        )}
        {!multiModeOn && selectedUsers.length > 0 && (
          <Profile
            selectedUser={item}
            multimodeOn={multiModeOn}
            index={index}
          />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={selectedUsers}
        horizontal={true}
        renderItem={({ item, index }) => {
          return (
            <View style={{ flex: 1, backgroundColor: 'red' }}>
              {renderAvatarTiles({ item, index })}
            </View>
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
    flex: 1,
    backgroundColor: 'yellow',
  },
});
