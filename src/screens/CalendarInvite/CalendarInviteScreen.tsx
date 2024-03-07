import { Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import NotifyDropDown from '../../components/NotifyDropDown';
import DisplayProfile from '../../components/DisplayProfile';
import { fetchEvents } from './dummy';
import { ScrollView } from 'react-native-gesture-handler';
import { getSortedEvents } from '../../helpers/SiteUtils';
import TimeZone from './TimeZone';
import ProgressToZoom from './ProgressToZoom';
import CalendarLayout from './CalendarLayout';
import FloatingButton_ from '../../components/Calendar/FloatingButton_';
import Toast from 'react-native-toast-message';
import { firebase } from '@react-native-firebase/database';

export const getProgressVal = () => {
  return firebase
    .app()
    .database()
    .ref('progressVal')
    .once('value')
    .then((snapshot: any) => {
      return snapshot.val().progressVal;
    })
    .catch((err) => console.log('Error b ho skti h', err));
};
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
  const [showInviteForm, setShowInviteForm] = useState(false);

  const [progressVal, setProgressVal] = useState(20);
  const [users, setUsers] = useState<UserInfoType[]>([]);
  const [usersWithTimeSlots, setUsersWithTimeSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // dd/mm/yy

  useEffect(() => {
    const fetchData = async () => {
      await getData();
      await getVal();
      const progressValRef = firebase.app().database().ref('progressVal');
      progressValRef.on('value', (snapshot: any) => {
        const newProgressVal = snapshot.val()?.progressVal || 20;
        setProgressVal(newProgressVal);
      });

      return () => {
        // Clean up the listener when the component unmounts
        progressValRef.off('value');
      };
    };

    fetchData();
    // fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users, selectedDate, progressVal]);

  const getVal = async () => {
    const progressVal_ = await getProgressVal();
    console.log('🚀 ~ getVal ~ progressVal_:', progressVal_);
    setProgressVal(progressVal_ || 20);
    return progressVal_;
  };
  const getData = async () => {
    const data = await getMatchingTimeSlots();
    const sortedEvents = data;
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
    const filteredData = sortedEvents.filter((event: any) => {
      return (
        event.startTime >= todayTimestamp && event.startTime < tomorrowTimestamp
        //   ||
        // (event.endTime >= todayTimestamp && event.endTime < tomorrowTimestamp)
      );
    });
    // end time check
    let fData = [];
    for (const event of filteredData) {
      let users_ = [];
      for (const user of users) {
        if (event.userId.includes(user.id)) {
          users_.push(user);
        }
      }
      if (users_.length === 0) {
        fData.push({ users_ });
      } else {
        fData.push({ ...event, users_ });
      }
    }
    const fSortedData = getSortedEvents(fData);
    if (users.length === 0) {
      setUsersWithTimeSlots([]);
      return;
    }
    setUsersWithTimeSlots(fSortedData);
  };
  const getMatchingTimeSlots = async () => {
    const event_ = await fetchEvents();
    return [...event_];
  };

  const handleUserIdChange = (info: UserInfoType) => {
    const userExists = users.some((user) => user.id === info.id);
    if (!userExists) {
      setUsers((prevUsers: any) => [...prevUsers, info]);
    } else {
      Alert.alert('user already exist');
    }
  };
  const handleAddEvent = () => {
    if (users.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please Select User to create event',
        position: 'bottom',
      });
    } else {
      setShowInviteForm((prev) => !prev);
    }
  };
  return (
    <>
      <FloatingButton_ handleButtonPress={handleAddEvent} />
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
          setShowInviteForm={setShowInviteForm}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          progressVal={progressVal}
          usersWithTimeSlots={usersWithTimeSlots}
          getMatchingTimeSlots={getData}
          userData={users}
          showInviteForm={showInviteForm}
        />
      </ScrollView>
    </>
  );
};

export default CalendarInviteScreen;
