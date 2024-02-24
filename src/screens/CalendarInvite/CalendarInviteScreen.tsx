import { Alert, Button, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import NotifyDropDown from '../../components/NotifyDropDown';
import DisplayProfile from '../../components/DisplayProfile';
import Calendar from './Calendar';
import { calendarData, event } from './dummy';
import { ScrollView } from 'react-native-gesture-handler';

export type UserInfoType = {
  created_at: number;
  discordId: string;
  first_name: string;
  github_created_at: number;
  github_display_name: null;
  github_id: string;
  github_user_id: string;
  id: string;
  incompleteUserDetails: boolean;
  last_name: string;
  picture: {
    publicId: string;
    url: string;
  };
  roles: { archived: boolean; in_discord: boolean };
  updated_at: number;
  username: string;
};
const CalendarInviteScreen = () => {
  const [users, setUsers] = useState<UserInfoType[]>([]);
  const [usersWithTimeSlots, setUsersWithTimeSlots] = useState<any[]>([]);
  const [data, setData] = useState(calendarData);
  useEffect(() => {
    getMatchingTimeSlots();
  }, [users]);
  const getMatchingTimeSlots = () => {
    const matchingTimeSlots = users.map((selectedItem) => {
      const matchingCalendarItem = event.find(
        (item) => item?.userId === selectedItem.id,
      );
      // convert here without timezone
      if (matchingCalendarItem) {
        const {
          userId,
          endTime,
          startTime,
          eventName,
          eventScheduledBy,
          eventType,
        } = matchingCalendarItem;

        return {
          id: userId,
          first_name: selectedItem.first_name,
          last_name: selectedItem.last_name,
          picture: { url: selectedItem?.picture?.url },
          startTime,
          endTime,
          eventName,
          eventScheduledBy,
          eventType,
        };
      } else {
        return null;
      }
    });
    // setUsersWithTimeSlots(matchingTimeSlots);

    setUsersWithTimeSlots(() =>
      matchingTimeSlots.filter((item) => item !== null),
    );
  };

  const handleUserIdChange = (info: UserInfoType) => {
    console.log('🚀 ~ handleUserIdChange ~ info:', info);
    const userExists = users.some((user) => user.id === info.id);

    if (!userExists) {
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
      setUsers((prevUsers: any) => [...prevUsers, info]);
    } else {
      Alert.alert('user already exist');
    }
  };
  // how do i clear selected user
  return (
    <ScrollView>
      <NotifyDropDown
        title={'Select To invite'}
        handleUserId={handleUserIdChange}
        error={''}
      />
      <DisplayProfile selectedUsers={users} />

      {/* <Calendar /> */}
      <Calendar
        userData={users}
        users={usersWithTimeSlots}
        setUsers={setUsers}
        setNewDataSlot={setUsersWithTimeSlots}
      />
    </ScrollView>
  );
};

export default CalendarInviteScreen;
