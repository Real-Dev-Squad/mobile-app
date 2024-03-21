import {
  Alert,
  AppState,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import NotifyDropDown from '../../components/NotifyDropDown';
import DisplayProfile from '../../components/DisplayProfile';
import {
  disconnectInactiveUsers,
  fetchEvents,
  getLastLoggedInTime,
  getLastUserPosition,
  getLiveUserInfoInRealtime,
  getLiveUsers,
  postIdsWithTimeStamp,
  postLiveUsers,
  postPositionWithId,
  removeOfflineUser,
  removePositionWithId,
} from './dummy';
import { ScrollView } from 'react-native-gesture-handler';
import {
  abc,
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
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import Button_ from '../../components/Button_';
import LayoutHeader from '../../components/Calendar/LayoutHeader';
import { compact, remove } from 'lodash';
import { fromUnixTime, format } from 'date-fns';
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
const tempData = {
  company: 'Temporary company',
  created_at: 1710420200205,
  designation: 'Faltu ka kaam',
  discordId: '728932416059867216',
  discordJoinedAt: '2022-01-02T08:17:42.704000+00:00',
  first_name: 'temp',
  github_created_at: 1581850563000,
  github_display_name: 'Temporary',
  github_id: 'shreya-mishra',
  github_user_id: '61110378',
  id: 'H5PtL5x0q38MoOWTN92w',
  incompleteUserDetails: false,
  instagram_id: 'shreya1mishra_',
  last_name: 'User',
  linkedin_id: 'shreyamishra04',
  picture: {
    publicId: 'profile/T7IL7MB8YriniTw4bt39/kecskmedeh7ktl2mnd6c',
    url: '',
  },
  profileStatus: 'BLOCKED',
  profileURL: 'https://shreya-profile-service.onrender.com',
  roles: {
    archived: false,
    in_discord: true,
    member: true,
  },
  status: 'active',
  twitter_id: 'shreya1mishra',
  updated_at: 1710420200105,
  username: 'shreya',
  website: 'https://shreya-portfolio.vercel.app/',
  yoe: 2,
};

const CalendarInviteScreen = () => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [progressVal, setProgressVal] = useState(20);
  const [users, setUsers] = useState<UserInfoType[]>([]);
  const [liveUsers, setLiveUsers] = useState<UserInfoType[]>([]);
  const [liveIds, setLiveIds] = useState([]);
  const [usersWithTimeSlots, setUsersWithTimeSlots] = useState<any[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); // dd/mm/yy
  const [multiModeOn, setMultimodeOn] = useState(false);
  const { loggedInUserData } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState<UserInfoType>([]);
  const isFocused = useIsFocused();
  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const [prevLiveUserId, setPrevLiveUserId] = useState({});
  const [lastActiveUser, setLastActiveUser] = useState();
  const [proof, setProof] = useState([]);
  const [displayTime, setDisplayTime] = useState();
  const [scrollTime, setScrollTime] = useState(0);
  const [latestTimeStamp, setLatestTimeStamp] = useState();
  console.log('🚀 ~ CalendarInviteScreen ~ latestTimeStamp:', latestTimeStamp);
  const [autoScrollVal, setAutoScrollVal] = useState();

  const minHourSelectedDate =
    new Date(selectedDate).setHours(0, 0, 0, 0) / 1000;
  // TODO: (move to useEffect later , check date change)
  const liveUsersRef = firebase.app().database().ref('liveUsers');

  useEffect(() => {
    fetchData();
    getLiveUserInfoInRealtime(
      setProof,
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
  }, [isFocused, proof, liveIds, latestTimeStamp]);

  const fetchData = async () => {
    const allUser = await getAllUsers(loggedInUserData?.token);
    setAllUsers([tempData, ...allUser]);
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

  useEffect(() => {
    let apiCallInterval: string | number | NodeJS.Timeout | undefined;
    if (isFocused) {
      // TODO: get focused when you are on screen not after scroll
      apiCallInterval = setInterval(() => {
        // getLiveUsers_();
        // getLastUserPosition_();
        postLiveUsers(loggedInUserData?.id);
        postIdsWithTimeStamp(loggedInUserData?.id, prevLiveUserId);
      }, 10000); // 5 minutes in milliseconds
    } else {
      removeOfflineUser(loggedInUserData?.id);
    }
    return () => {
      clearInterval(apiCallInterval);
    };
  }, [multiModeOn, isFocused]);

  const getLastUserPosition_ = () => {
    console.log('PROOOOOOOOOOOOOOOOOOOOOOOFFFFFFFFFFFFFFFFFFF', proof);
    const lastUser_ = allUsers.filter(
      (user: UserInfoType) => proof.id === user.id,
    );
    console.log('🚀 ~ CalendarInviteScreen ~ lastUser_:', lastUser_);
    setLastActiveUser(lastUser_[0]);
    let newVal = proof?.position;

    if (proof === null || proof === undefined) {
      newVal = minHourSelectedDate;
    }
    if (typeof newVal === 'number') {
      let sTime = abc(newVal);
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
    handleScrollToLastUserPosition(convertToOffsetVal, date);
  };

  const getLiveUsers_ = () => {
    console.log('livIDSSSSSSSS>>>', liveIds);
    const newArray: Array<UserInfoType> = liveIds.filter(
      (value) => value !== null,
    );
    const filteredLiveUsers = newArray
      .map((id) => allUsers.find((user: any) => user.id === id))
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
    console.log('🚀 ~ getData ~ data:', data);
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
    console.log('🚀 ~ filteredData ~ filteredData:', filteredData);
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
    console.log('🚀 ~ getData ~ fSortedData:', fSortedData);
    if (users.length === 0) {
      setUsersWithTimeSlots([]);
      return;
    }
    setUsersWithTimeSlots(fSortedData);
  };
  const getMatchingTimeSlots = async () => {
    const event_ = await fetchEvents();
    console.log('🚀 ~ getMatchingTimeSlots ~ event_:', event_);
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
    // postLiveUsers('AAM0MZxZXEfWKmfdYOUp');
    // return;
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
    // autoscroll / user scroll
    // call ->

    if (multiModeOn && scrollViewRef.current) {
      setIsAutoScroll(true);
      // setSelectedDate(formatDate(date));
      let totalVal = val / ((120 * progressVal) / 50);
      let transformTime = transformTime_(selectedDate, decimalToTime(totalVal));
      console.log('🚀 ~ calculateOffsetVal ~ transformTime:', transformTime);
      // let sTime = epocToDateTime(transformTime).split('T')[1];
      // console.log('🚀 ~ calculateOffsetVal ~ sTime:', sTime);
      // setScrollTime(sTime);
      scrollViewRef?.current.scrollTo({
        x: 0,
        y: val,
        animated: true,
      });
      setTimeout(() => setIsAutoScroll(false), 1000);
    }
  };
  const calculateOffsetVal = (scrollOffsetVal: number) => {
    let totalVal = scrollOffsetVal / ((120 * progressVal) / 50);
    let transformTime = transformTime_(selectedDate, decimalToTime(totalVal));
    console.log('🚀 ~ calculateOffsetVal ~ transformTime:', transformTime);
    let sTime = abc(transformTime);
    // let sTime = epocToDateTime(transformTime).split('T')[1];
    setScrollTime(sTime);
    setDisplayTime(sTime);

    return transformTime;
  };
  return (
    <>
      <FloatingButton_ handleButtonPress={handleAddEvent} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        scrollEventThrottle={50}
        onScrollEndDrag={(event) => {
          if (!isAutoScroll) {
            let timeStamp = calculateOffsetVal(
              event.nativeEvent.contentOffset.y,
            );
            console.log('-----SCROLL TIMESTAMP VALUE------', timeStamp);
            console.log('-------ONSCROLL CONDITION--------', {
              timeStamp,
              autoScrollVal,
              stringiFiedTimestamp: timeStamp.toString(),
            });
            timeStamp &&
              autoScrollVal !== timeStamp &&
              timeStamp.toString() !== 'NaN' &&
              postPositionWithId(
                loggedInUserData?.id,
                timeStamp,
                prevLiveUserId,
                selectedDate,
              );
          } else {
            console.log('--------AUTO-SCROLL-DETECTED-------');
          }
        }}
        style={{ flex: 1, overflow: 'scroll' }}
        stickyHeaderIndices={[0]}
        ref={scrollViewRef}
      >
        <View style={{ backgroundColor: 'white' }}>
          <View
            style={{ position: 'relative', top: 0, backgroundColor: 'white' }}
          >
            <ProgressToZoom
              progressVal={progressVal}
              setProgressVal={setProgressVal}
            />
            <View style={styles.flexView}>
              <View style={{ width: '60%', zIndex: 999 }}>
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
            {/* // TODO: to show last active user green */}
            <DisplayProfile
              setSelectedUsers={multiModeOn ? setLiveUsers : setUsers}
              selectedUsers={
                multiModeOn
                  ? [
                      lastActiveUser,
                      ...liveUsers.filter(
                        (user) => user.id !== lastActiveUser?.id,
                      ),
                    ]
                  : users
              }
              multiModeOn={multiModeOn}
              latestTimeStamp={latestTimeStamp}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              zIndex: -1,
              backgroundColor: 'white',
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                height: 40,
                width: 50,
                // borderWidth: 2,
                backgroundColor: '#3994f8',
                padding: 4,
                marginHorizontal: 4,
              }}
              onPress={() => {
                const date = new Date(selectedDate);
                date.setDate(date.getDate() - 1);
                setSelectedDate(date);
              }}
            >
              <Text
                style={{ textAlign: 'center', color: 'white', marginTop: 4 }}
              >
                -
              </Text>
            </TouchableOpacity>
            <View style={{ flex: 2, flexDirection: 'row' }}>
              <LayoutHeader
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </View>
            <TouchableOpacity
              style={{
                flex: 1,
                height: 40,
                width: 50,
                // borderWidth: 2,
                padding: 4,
                backgroundColor: '#3994f8',
                marginHorizontal: 4,
              }}
              onPress={() => {
                const date = new Date(selectedDate);
                date.setDate(date.getDate() + 1);
                setSelectedDate(date);
              }}
            >
              <Text
                style={{ textAlign: 'center', color: 'white', marginTop: 4 }}
              >
                +
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{ borderWidth: 1, color: 'black', marginTop: 2, zIndex: -1 }}
          />
          {/* TODO: fix hardcoded style */}
          <View
            style={{
              position: 'absolute',
              top:
                users.length > 0 || (liveUsers.length > 0 && multiModeOn)
                  ? 256
                  : 206,
              right: 0,
              borderWidth: 1,
              backgroundColor: 'black',
            }}
          >
            <Text style={{ color: 'white' }}>
              {scrollTime && multiModeOn ? scrollTime : displayTime}
            </Text>
          </View>
        </View>

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
