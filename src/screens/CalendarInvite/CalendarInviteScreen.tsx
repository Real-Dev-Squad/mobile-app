import { Alert, AppState, StyleSheet, View } from 'react-native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import NotifyDropDown from '../../components/NotifyDropDown';
import DisplayProfile from '../../components/DisplayProfile';
import {
  disconnectInactiveUsers,
  fetchEvents,
  getLastUserPosition,
  getLiveUsers,
  postLiveUsers,
  postPositionWithId,
  removeOfflineUser,
  removePositionWithId,
} from './dummy';
import { ScrollView } from 'react-native-gesture-handler';
import {
  decimalToTime,
  epocToDateTime,
  formatDate,
  getSortedEvents,
  screenHeight,
  transformTime_,
} from '../../helpers/SiteUtils';
import TimeZone from './TimeZone';
import ProgressToZoom from './ProgressToZoom';
import CalendarLayout from './CalendarLayout';
import FloatingButton_ from '../../components/Calendar/FloatingButton_';
import Toast from 'react-native-toast-message';
import { firebase } from '@react-native-firebase/database';
import Checkbox from '../../components/Checkbox';
import { AuthContext } from '../../context/AuthContext';
import { getAllUsers } from '../AuthScreen/Util';
import { useIsFocused } from '@react-navigation/native';
import Button_ from '../../components/Button_';

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
  const [liveUsers, setLiveUsers] = useState<UserInfoType[]>([]);
  const [usersWithTimeSlots, setUsersWithTimeSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // dd/mm/yy
  const [multiModeOn, setMultimodeOn] = useState(false);
  const { loggedInUserData } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const isFocused = useIsFocused();
  const [prevLiveUserId, setPrevLiveUserId] = useState({});

  const fetchData = async () => {
    const allUser = await getAllUsers(loggedInUserData?.token);
    setAllUsers(allUser);
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        getLiveUsers_();
      } else {
        removeOfflineUser(loggedInUserData?.id);
        removePositionWithId(loggedInUserData?.id);
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  // call post api call in every 5 min and check live users should go, and duplicacy should not be there
  useEffect(() => {
    let apiCallInterval: string | number | NodeJS.Timeout | undefined;
    if (isFocused) {
      apiCallInterval = setInterval(() => {
        postLiveUsers(loggedInUserData?.id);
        getLiveUsers_();
      }, 5000); // 5 minutes in milliseconds
    } else {
      removeOfflineUser(loggedInUserData?.id);
      removePositionWithId(loggedInUserData?.id);
    }
    return () => {
      clearInterval(apiCallInterval);
    };
  }, [multiModeOn, isFocused]);

  useEffect(() => {
    fetchData();
    getLiveUsers_();
    // if (multiModeOn) {
    //   getLastUserPosition_();
    // }
  }, []);

  const getLastUserPosition_ = (lastUser: { id: string }) => {
    getLastUserPosition(lastUser?.id)
      .then((val) => {
        // convertEpochTime to normal date and time
        const dStr = epocToDateTime(val);
        const date = dStr.split('T')[0];
        const time = dStr.split('T')[1];
        const [hr, min, sec] = time.split(':');
        var totalMinutes = Number(hr) * 60 + Number(min); //28504681000
        let convertToOffsetVal = (totalMinutes / 60) * progressVal * 2.4 + 40;
        return { convertToOffsetVal, date };
      })
      .then(({ convertToOffsetVal, date }) =>
        handleScrollToLastUserPosition(convertToOffsetVal, date),
      );
  };

  const getLiveUsers_ = () => {
    // TODO: it should not show my profile
    getLiveUsers()
      .then((userIds) => {
        const newArray = [...userIds].filter((value) => value !== null);
        const filteredLiveUsers = newArray.map((id) =>
          allUsers.find((user) => user.id === id),
        );

        if (filteredLiveUsers?.length > 0) {
          // Set the filteredLiveUsers to liveUsers
          setLiveUsers(filteredLiveUsers);
          return filteredLiveUsers;
        } else {
          console.log('No live users found');
          // Handle the case when no live users are found
          // multiModeOn &&
          //   Toast.show({
          //     type: 'error',
          //     text1: 'No live users found',
          //     position: 'bottom',
          //   });
        }
      })

      .then(
        (filteredLiveUsers: any) =>
          multiModeOn &&
          getLastUserPosition_(filteredLiveUsers[filteredLiveUsers.length - 1]),
      )

      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
      await getVal();
      await getLiveUsers_();
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
  }, [users, selectedDate, progressVal]);

  const getVal = async () => {
    const progressVal_ = await getProgressVal();

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
    // Filter the sortedData based on today's timestamp and startTime
    const filteredData = sortedEvents.filter((event: any) => {
      return (
        (event.startTime >= todayTimestamp &&
          event.startTime < tomorrowTimestamp) ||
        (event.endTime >= todayTimestamp && event.endTime < tomorrowTimestamp)
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
      if (users_.length > 0) {
        fData.push({ ...event, users_ });
      } else {
        console.log('users not there');
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

  const scrollViewRef = useRef();
  const handleScrollToLastUserPosition = (val, date) => {
    if (multiModeOn && scrollViewRef.current) {
      setSelectedDate(formatDate(date));
      scrollViewRef?.current.scrollTo({
        x: 0,
        y: val,
        animated: true,
      });
    }
  };

  const calculateOffsetVal = (scrollOffsetVal: number) => {
    if (scrollOffsetVal > 40) {
      // *******************************

      let totalVal = (scrollOffsetVal - 40) / ((120 * progressVal) / 50);
      let transformTime = transformTime_(selectedDate, decimalToTime(totalVal));
      return transformTime;
    }
  };
  return (
    <>
      <FloatingButton_ handleButtonPress={handleAddEvent} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={50}
        onScroll={(event) => {
          let timeStamp = calculateOffsetVal(event.nativeEvent.contentOffset.y);
          postPositionWithId(loggedInUserData?.id, timeStamp, prevLiveUserId);
        }}
        style={{ flex: 1, overflow: 'scroll' }}
        stickyHeaderIndices={[0]}
        ref={scrollViewRef}
      >
        <View
          style={{ position: 'relative', top: 0, backgroundColor: 'white' }}
        >
          <ProgressToZoom
            progressVal={progressVal}
            setProgressVal={setProgressVal}
          />
          <View style={styles.flexView}>
            <View style={{ width: '60%' }}>
              <NotifyDropDown
                title={'Select To invite'}
                handleUserId={handleUserIdChange}
                error={''}
                disabled={multiModeOn}
              />
            </View>
            <View style={{ marginTop: 20, padding: 10 }}>
              <Checkbox
                onHandleChange={() => setMultimodeOn((prev) => !prev)}
              />
            </View>
          </View>
          <TimeZone />
          <DisplayProfile
            setSelectedUsers={multiModeOn ? setLiveUsers : setUsers}
            selectedUsers={multiModeOn ? [...liveUsers].reverse() : users}
            multiModeOn={multiModeOn}
            // lastUser={liveUsers[liveUsers.length - 1]}
          />
        </View>

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

const styles = StyleSheet.create({
  flexView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
