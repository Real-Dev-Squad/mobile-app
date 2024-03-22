import {
  Alert,
  AppState,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { AuthContext } from '../../context/AuthContext';
import {
  fetchEvents,
  fetchUsers,
  getLiveUserInfoInRealtime,
  postIdsWithTimeStamp,
  postLiveUsers,
  removeOfflineUser,
} from '../../utils/Api';
import { UserInfoType } from '../../context/type';
import DropDown from '../../components/DropDown';
import TimeZone from '../../components/CalendarSpecificComp/TimeZone';
import DisplayProfile from '../../components/CalendarSpecificComp/DisplayProfile';
import {
  decimalToTime,
  epocToDateTime,
  getSortedEvents,
  minHourSelectedDate,
  timestampToUnix,
  transformTime_,
  windowHeight,
} from '../../helpers/CalendarInviteHelpers';
import LayoutHeader from '../../components/CalendarSpecificComp/TableHeader';
import FloatingButton_ from '../../components/FloatingButton_';
import Toast from 'react-native-toast-message';
import CalendarLayout from '../../components/CalendarSpecificComp/CalendarLayout';
import ProgressToZoom from '../../components/CalendarSpecificComp/ProgressToZoom';
import { useProgressVal } from '../../hooks/useProgressVal';
import Checkbox from '../../components/CalendarSpecificComp/Checkbox';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { find, compact } from 'lodash';

const CalendarInviteScreen = () => {
  const { loggedInUserData } = useContext(AuthContext);
  const [users, setUsers] = useState<UserInfoType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserInfoType[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [flag, setFlag] = useState(false);
  let smallestTs = minHourSelectedDate(selectedDate);
  const [scrollTime, setScrollTime] = useState(timestampToUnix(smallestTs));
  const scrollViewRef = useRef();
  const [eventsInSlot, setEventsInSlot] = useState([]);
  const { progressVal } = useProgressVal();
  const [multimode, setMultimode] = useState(false);
  const [lastScrolledId, setLastScrolledId] = useState();
  const [liveIds, setLiveIds] = useState([]);
  const [latestTimeStamp, setLatestTimeStamp] = useState();
  const isFocused = useIsFocused();
  const [autoScrollVal, setAutoScrollVal] = useState();
  const [lastActiveUser, setLastActiveUser] = useState();
  const [liveUsers, setLiveUsers] = useState([]);

  useEffect(() => {
    fetchUsers(loggedInUserData?.id, setUsers);
    getLiveUserInfoInRealtime(
      setLastScrolledId,
      setLiveIds,
      setLatestTimeStamp,
      selectedDate,
    );
  }, []);
  useFocusEffect(
    useCallback(() => {
      getLastUserPosition_();
      postLiveUsers(loggedInUserData?.id);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>MOUNTING');
      return () => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>UNMOUNTING');
        removeOfflineUser(loggedInUserData?.id);
      };
    }, []),
  );

  useEffect(() => {
    getLastUserPosition_();
    getLiveUsers_();
    return () => {
      // removeOfflineUser(loggedInUserData?.id);
      // liveUsersRef.off('value');
    };
  }, [isFocused, lastScrolledId, liveIds, latestTimeStamp]);

  useEffect(() => {
    loggedInUserData && fetchUsers(loggedInUserData?.token, setUsers);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUserIdChange = (info: UserInfoType) => {
    const userExists = selectedUser.some(
      (user: UserInfoType) => user.id === info.id,
    );
    if (!userExists) {
      setSelectedUser((prevUsers: UserInfoType[]) => [...prevUsers, info]);
    } else {
      Alert.alert('user already exist');
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        getLiveUsers_();
        // getLastLoggedInTime_(loggedInUserData?.id);
        getLastUserPosition_();
      } else {
        removeOfflineUser(loggedInUserData?.id);
        // liveUsersRef.off('value');
      }
    });
    return () => {
      subscription.remove();
    };
  }, []);
  const getLastUserPosition_ = () => {
    console.log('PROOOOOOOOOOOOOOOOOOOOOOOFFFFFFFFFFFFFFFFFFF', lastScrolledId);
    const lastUser_ = users.filter(
      (user: UserInfoType) => lastScrolledId.id === user.id,
    );
    console.log('🚀 ~ CalendarInviteScreen ~ lastUser_:', lastUser_);
    setLastActiveUser(lastUser_[0]);
    let newVal = lastScrolledId?.position;

    if (lastScrolledId === null || lastScrolledId === undefined) {
      newVal = minHourSelectedDate;
    }
    if (typeof newVal === 'number') {
      let sTime = timestampToUnix(newVal);
      console.log('🚀 ~ CalendarInviteScreen ~ sTime:', sTime);

      setScrollTime(sTime);
    }
    const dStr = epocToDateTime(newVal, false, false);
    const date = dStr.split('T')[0];
    console.log('🚀 ~ .then ~ date:', date);
    const time = dStr.split('T')[1];
    const [hr, min, sec] = time.split(':');
    //TODO:
    let dTime = `${hr}:${min}`;
    console.log('🚀 ~ .then ~ dTime:', dTime);
    var totalMinutes = Number(hr) * 60 + Number(min); //28504681000
    let convertToOffsetVal = (totalMinutes / 60) * progressVal * 2.4;
    console.log(
      '🚀 ~ CalendarInviteScreen ~ convertToOffsetVal:',
      convertToOffsetVal,
    );
    setAutoScrollVal(convertToOffsetVal);
    // handleScrollToLastUserPosition(convertToOffsetVal, date);
  };

  const getLiveUsers_ = () => {
    console.log('livIDSSSSSSSS>>>', liveIds, users);
    const newArray: Array<UserInfoType> = liveIds.filter(
      (value) => value !== null,
    );
    const filteredLiveUsers = newArray
      .map((id) => users?.find((user: any) => user.id === id))
      .filter((item) => item !== undefined) as unknown as Array<UserInfoType>;
    console.log(
      '🚀 ~ CalendarInviteScreen ~ filteredLiveUsers:',
      filteredLiveUsers,
    );
    if (filteredLiveUsers?.length > 0) {
      setLiveUsers(filteredLiveUsers);
      return filteredLiveUsers;
    } else {
      console.log('No live users found');
    }
  };
  useEffect(() => {
    let apiCallInterval: string | number | NodeJS.Timeout | undefined;
    if (isFocused) {
      // TODO: get focused when you are on screen not after scroll
      apiCallInterval = setInterval(() => {
        // getLiveUsers_();
        // getLastUserPosition_();
        postLiveUsers(loggedInUserData?.id);
        postIdsWithTimeStamp(loggedInUserData?.id);
      }, 10000); // 5 minutes in milliseconds
    } else {
      removeOfflineUser(loggedInUserData?.id);
    }
    return () => {
      clearInterval(apiCallInterval);
    };
  }, [multimode, isFocused]);
  const handleAddEvent = () => {
    if (selectedUser.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Please Select User to create event',
        position: 'bottom',
      });
    } else {
      setFlag((prev) => !prev);
    }
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
      setEventsInSlot([]);
      return;
    }
    setEventsInSlot(fSortedData);
  };
  const getMatchingTimeSlots = async () => {
    const event_ = await fetchEvents();
    return [...event_];
  };
  const calculateOffsetVal = (scrollOffsetVal: number) => {
    if (scrollOffsetVal === 0) {
      let newS = timestampToUnix(smallestTs);
      setScrollTime(newS);
    } else {
      let totalVal;
      totalVal = scrollOffsetVal / ((120 * progressVal) / 50);

      let transformTime = transformTime_(selectedDate, decimalToTime(totalVal));
      let sTime = timestampToUnix(transformTime);
      setScrollTime(sTime);

      return transformTime;
    }
  };
  const onScrollHandler = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    let scrollVal = calculateOffsetVal(event.nativeEvent.contentOffset.y);
    // return calculateOffsetVal(scrollVal);
  };

  const onToggleFlag = () => {
    setMultimode((prev: boolean) => !prev);
  };

  return (
    <>
      <FloatingButton_ handleButtonPress={handleAddEvent} />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={50}
        onScrollEndDrag={onScrollHandler}
        stickyHeaderIndices={[0]}
        ref={scrollViewRef}
        style={styles.scrollContainer}
      >
        <View style={styles.topHeader}>
          {/* zoom-scale */}
          <ProgressToZoom />
          <View style={styles.flexView}>
            <View style={styles.dropdown}>
              <DropDown
                title={'Select To invite'}
                handleUserId={handleUserIdChange}
                error={''}
                disabled={multimode}
              />
            </View>
            {/* checkbox */}
            <View style={{ marginTop: 20, padding: 10 }}>
              <Checkbox onHandleChange={onToggleFlag} />
            </View>
          </View>

          <TimeZone />
          <DisplayProfile
            key={liveUsers.length}
            setSelectedUsers={multimode ? setLiveUsers : setSelectedUser}
            selectedUsers={
              multimode
                ? [
                    find(liveUsers, (user) => user.id === lastActiveUser?.id)
                      ? lastActiveUser
                      : null,
                    ...liveUsers.filter(
                      (user) => user.id !== lastActiveUser?.id,
                    ),
                  ]
                : compact(selectedUser)
            }
            multiModeOn={multimode}
          />

          <View style={styles.tableHeader}>
            <LayoutHeader
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </View>
          <View style={styles.border} />

          <View style={styles.displayTime}>
            <Text style={styles.textColor}>{scrollTime}</Text>
          </View>
        </View>

        <CalendarLayout
          setShowInviteForm={setFlag}
          showInviteForm={flag}
          selectedDate={selectedDate}
          usersWithTimeSlots={eventsInSlot}
          getMatchingTimeSlots={getData}
          selectedUserData={selectedUser}
        />
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
  dropdown: { width: '65%' },
  topHeader: { position: 'relative', top: 0, backgroundColor: 'white' },
  tableHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    zIndex: -1,
    backgroundColor: 'white',
  },
  displayTime: {
    position: 'absolute',
    top: 202, //TODO: calculate via header ht
    right: 0,
    borderWidth: 1,
    backgroundColor: 'black',
  },
  border: { borderWidth: 1, color: 'black', marginTop: 2, zIndex: -1 },
  textColor: { color: 'white' },
});
