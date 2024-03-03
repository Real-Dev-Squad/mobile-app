import { Alert, View } from 'react-native';
import React, { useEffect, useState } from 'react';

import NotifyDropDown from '../../components/NotifyDropDown';
import DisplayProfile from '../../components/DisplayProfile';
import Calendar from './Calendar';
import { event, fetchEvents } from './dummy';
import { ScrollView } from 'react-native-gesture-handler';
import { formatDate, getSortedEvents } from '../../helpers/SiteUtils';
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
  const [selectedDate, setSelectedDate] = useState(new Date()); // dd/mm/yy

  useEffect(() => {
    getData();
    // fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, selectedDate]);
  const getData = async () => {
    console.log('111111111');
    const data = await getMatchingTimeSlots();
    console.log('🚀 ~ getData ~ data:', data);
    const sortedEvents = getSortedEvents(data);
    console.log('🚀 ~ getData ~ sortedEvents:', sortedEvents);
    // filter by date
    let today = new Date(selectedDate);
    let tomorrow = new Date(selectedDate);
    tomorrow.setDate(today.getDate() + 1);
    let tomorrow_ = tomorrow.setUTCHours(0, 0, 0, 0);
    let today_ = today.setUTCHours(0, 0, 0, 0);

    // Get today's and tomorrow's timestamps in seconds
    const todayTimestamp = Math.floor(today_ / 1000);
    const tomorrowTimestamp = Math.floor(tomorrow_ / 1000);

    console.log({ todayTimestamp, tomorrowTimestamp });

    // Filter the sortedData based on today's timestamp and startTime
    const filteredData = sortedEvents[0].filter(
      (event) =>
        event.startTime >= todayTimestamp &&
        event.startTime < tomorrowTimestamp,
    );
    console.log('🚀 ~ filteredData ~ filteredData:', filteredData);
    setUsersWithTimeSlots(filteredData);
  };
  const getMatchingTimeSlots = async () => {
    const event_ = await fetchEvents();
    console.log('🚀 ~ getMatchingTimeSlots ~ event_:', event_);
    const matchingTimeSlots = users.map((selectedItem) => {
      return event_.filter((item) => {
        return (item?.userId).includes(selectedItem.id);
      });
    });
    return [...matchingTimeSlots];
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
      <CalendarLayout
        // selectedUsers={users}

        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        progressVal={progressVal}
        usersWithTimeSlots={usersWithTimeSlots}
        getMatchingTimeSlots={getMatchingTimeSlots}
        userData={users}
      />
    </ScrollView>
  );
};

export default CalendarInviteScreen;
