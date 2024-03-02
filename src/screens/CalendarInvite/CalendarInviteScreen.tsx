import { Alert, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import NotifyDropDown from '../../components/NotifyDropDown';
import DisplayProfile from '../../components/DisplayProfile';
import Calendar from './Calendar';
import { event, fetchEvents } from './dummy';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDate } from '../../helpers/SiteUtils';
import { unixToTimeStampYYMMDD } from '../AuthScreen/Util';
import TimeZone from './TimeZone';
import ProgressToZoom from './ProgressToZoom';
import CalendarLayout from './CalendarLayout';

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
  const [progressVal, setProgressVal] = useState(20);
  const [users, setUsers] = useState<UserInfoType[]>([]);
  const [usersWithTimeSlots, setUsersWithTimeSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(formatDate(new Date())); // dd/mm/yy

  useEffect(() => {
    getMatchingTimeSlots();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, selectedDate]);

  const getMatchingTimeSlots = async () => {
    const event_ = await fetchEvents();
    const matchingTimeSlots = users.map((selectedItem) => {
      const matchingCalendarItem = event_.filter((item) => {
        // console.log(
        //   'idhrrrrrr',
        //   unixToTimeStampYYMMDD(item.startTime),
        //   selectedDate,
        //   item?.userId,
        //   selectedItem.id,
        // );
        // console.log(
        //   'selectedDateNE',
        //   item,
        //   selectedItem.id,
        //   unixToTimeStampYYMMDD(item.startTime),
        //   selectedDate,
        // );
        return (
          (item?.userId).includes(selectedItem.id) &&
          unixToTimeStampYYMMDD(item.startTime) === selectedDate
        );
      });

      // convert here without timezone
      if (matchingCalendarItem) {
        return {
          matchingCalendarItem: matchingCalendarItem.map((ev) => ({
            ...ev,
            id: selectedItem.id,
            first_name: selectedItem.first_name,
            last_name: selectedItem.last_name,
            picture: { url: selectedItem?.picture?.url },
          })),
        };
      } else {
        return null;
      }
    });
    let eventt: any[] = [];
    matchingTimeSlots.forEach((item) => {
      if (item?.matchingCalendarItem?.length > 0) {
        eventt = [...eventt, ...item?.matchingCalendarItem];
      }
    });
    setUsersWithTimeSlots(eventt);
  };

  const handleUserIdChange = (info: UserInfoType) => {
    const userExists = users.some((user) => user.id === info.id);
    if (!userExists) {
      setUsers((prevUsers: any) => [...prevUsers, info]);
    } else {
      Alert.alert('user already exist');
    }
  };

  // how do i clear selected user
  return (
    <ScrollView style={{ flex: 1, overflow: 'scroll' }}>
      <ProgressToZoom
        progressVal={progressVal}
        setProgressVal={setProgressVal}
      />
      <NotifyDropDown
        title={'Select To invite'}
        handleUserId={handleUserIdChange}
        error={''}
      />
      <TimeZone />

      <DisplayProfile setSelectedUsers={setUsers} selectedUsers={users} />
      {/* 
      <Calendar
        userData={users}
        setUsers={setUsers}
        users={usersWithTimeSlots}
        setNewDataSlot={setUsersWithTimeSlots}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        getMatchingTimeSlots={getMatchingTimeSlots}
        progressVal={progressVal}
      /> */}
      <CalendarLayout />
    </ScrollView>
  );
};

export default CalendarInviteScreen;
