import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchUsers } from '../../utils/Api';
import { UserInfoType } from '../../context/type';
import DropDown from '../../components/DropDown';
import TimeZone from '../../components/CalendarSpecificComp/TimeZone';
import DisplayProfile from '../../components/CalendarSpecificComp/DisplayProfile';
import { windowHeight } from '../../helpers/CalendarInviteHelpers';

const CalendarInviteScreen = () => {
  const { loggedInUserData } = useContext(AuthContext);
  const [users, setUsers] = useState<UserInfoType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfoType[]>([]);

  useEffect(() => {
    loggedInUserData && fetchUsers(loggedInUserData?.token, setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserIdChange = (info: UserInfoType) => {
    const userExists = users.some((user: UserInfoType) => user.id === info.id);
    if (!userExists) {
      setSelectedUser((prevUsers: UserInfoType[]) => [...prevUsers, info]);
    } else {
      Alert.alert('user already exist');
    }
  };
  return (
    <>
      {/* Floating button */}
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollContainer}
        stickyHeaderIndices={[0]}
      >
        <View style={styles.topHeader}>
          {/* zoom-scale */}
          <View style={styles.flexView}>
            <View style={styles.dropdown}>
              <DropDown
                title={'Select To invite'}
                handleUserId={handleUserIdChange}
                error={''}
                disabled={false}
              />
            </View>
            {/* checkbox */}
          </View>

          <TimeZone />
          <DisplayProfile
            setSelectedUsers={setSelectedUser}
            selectedUsers={selectedUser}
            multiModeOn={false}
          />
        </View>
        <View style={{ height: '100%' }} />
      </ScrollView>
    </>
  );
};

export default CalendarInviteScreen;
const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    overflow: 'scroll',
    backgroundColor: 'white',
    height: windowHeight,
  },
  flexView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: { width: '70%' },
  topHeader: { position: 'relative', top: 0, backgroundColor: 'white' },
});
