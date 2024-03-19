import { Alert, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { fetchUsers } from '../../utils/Api';
import { UserInfoType } from '../../context/type';
import DropDown from '../../components/DropDown';

const CalendarInviteScreen = () => {
  const { loggedInUserData } = useContext(AuthContext);
  const [users, setUsers] = useState<UserInfoType[]>([]);

  useEffect(() => {
    loggedInUserData && fetchUsers(loggedInUserData?.token, setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserIdChange = (info: UserInfoType) => {
    const userExists = users.some((user: UserInfoType) => user.id === info.id);
    if (!userExists) {
      setUsers((prevUsers: any[]) => [...prevUsers, info]);
    } else {
      Alert.alert('user already exist');
    }
  };
  return (
    <View style={styles.flexView}>
      <View style={styles.dropdown}>
        <DropDown
          title={'Select To invite'}
          handleUserId={handleUserIdChange}
          error={''}
          disabled={false}
        />
      </View>
    </View>
  );
};

export default CalendarInviteScreen;
const styles = StyleSheet.create({
  flexView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dropdown: { width: '70%' },
});
