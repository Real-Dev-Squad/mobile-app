import {
  Alert,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';
import React, { useEffect, useState } from 'react';
import {
  Table,
  Row,
  Rows,
  TableWrapper,
  Cell,
} from 'react-native-table-component';
import DatePicker from 'react-native-date-picker';
import UserDesc from './UserDesc';
import { calendarData, postInvite } from './dummy';
import { has } from 'lodash';
import Profile from '../../components/Profile';
import {
  formatDate,
  formatTimeSlotDate,
  formatTimeSlotTime,
  screenHeight,
} from '../../helpers/SiteUtils';
import InviteForm from './InviteForm';
import { profileScreenStyles } from '../ProfileScreen/styles';
import { unixToTimeStampYYMMDD } from '../AuthScreen/Util';

const Time_Slots = [
  '00:00',
  '01:00',
  '02:00',
  '03:00',
  '04:00',
  '05:00',
  '06:00',
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
  '23:00',
];

const Calendar = ({ users, setNewDataSlot, setUsers, userData }) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(formatDate(date)); // dd/mm/yy
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [widthArr, setWidthArr] = useState([80, windowWidth - 80]);
  const [showSelectedUsersDetails, setShowSelectedUsersDetails] =
    useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date().toISOString());
  const [showClock, setShowClock] = useState(false);
  const [refreshKey, setRefreshKey] = useState(Math.random());

  useEffect(() => {
    generateTableData();
  }, [users]);

  const generateTableData = () => {
    console.log('users>>>>', users);
    // console.log('SELECTED DATE', selectedDate, typeof selectedDate); //23/02/24

    const tableData = Time_Slots.map((slot) => {
      const matchingUsers = users.filter((user) => {
        console.log(
          'Date checking >>>>>',
          // new Date(user.startTime),
          // formatTimeSlotTime(user.startTime).split(':')[0],
          // unixToTimeStampYYMMDD(user.startTime),
          // selectedDate,
          slot.split(':')[0],
          user.startTime,
          formatTimeSlotTime(user.startTime).split(':')[0], // yy/mm/dd
          unixToTimeStampYYMMDD(user.startTime),
          selectedDate, //23/02/24
        );
        const [dd, mm, yy] = selectedDate.split('/');
        return (
          // 8 === formatTimeSlotTime(1677245400).split(':')[0]&&
          //formatTimeSlotDate(1677245400) === 23/02/24

          slot.split(':')[0] ===
            formatTimeSlotTime(user.startTime).split(':')[0] &&
          unixToTimeStampYYMMDD(user.startTime) === selectedDate
        );
      });
      return [slot, ...matchingUsers];
    });
    console.log('🚀 ~ tableData ~ tableData:', tableData);

    return tableData;
  };

  const handleInviteForm = () => {
    setShowInviteForm((prev) => !prev);
  };
  const handleDateChange = () => {
    setIsDatePickerVisible((prev) => !prev);
  };
  const element = (data, index) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedSlots(data);
          setShowSelectedUsersDetails((prev) => !prev);
        }}
      >
        <View style={styles.btn}>
          <Profile selectedUser={data} profileHeight={40} />
        </View>
      </TouchableOpacity>
    );
  };

  const cellElement = (cellData) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedTime(cellData);
          setShowInviteForm((prev) => !prev);
        }}
      >
        <View style={styles.btn}>
          <Text style={{ color: 'black', textAlign: 'center' }}>
            {cellData}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  const tranformObj = (mergedData) => {
    console.log('🚀 ~ tranformObj ~ mergedData:', mergedData);
    // mergedData=[{"endTime": 1708389172, "eventName": "test1 event", "eventScheduledBy": "shreya", "eventType": "public", "first_name": "Akansh", "id": "kpBV5NrcHYb88xzgiC0u", "last_name": "Surendran", "picture": {"url": "https://res.cloudinary.com/realdevsquad/image/upload/v1706607105/profile/kpBV5NrcHYb88xzgiC0u/hawogtgm1sysa4zxgqeg.png"}, "startTime": 1708651681}, {"endTime": "167724540", "eventName": "Vv", "eventScheduledBy": "T7IL7MB8YriniTw4bt39", "eventType": "public", "startTime": "167724540", "userId": ["kpBV5NrcHYb88xzgiC0u"]}]

    console.log('Usersss', userData);
    // users = [
    //   {
    //     endTime: 1708389172,
    //     eventName: 'test1 event',
    //     eventScheduledBy: 'shreya',
    //     eventType: 'public',
    //     first_name: 'Akansh',
    //     id: 'kpBV5NrcHYb88xzgiC0u',
    //     last_name: 'Surendran',
    //     picture: {
    //       url: 'https://res.cloudinary.com/realdevsquad/image/upload/v1706607105/profile/kpBV5NrcHYb88xzgiC0u/hawogtgm1sysa4zxgqeg.png',
    //     },
    //     startTime: 1708651681,
    //   },
    // ];

    const userInfoMap = new Map(userData.map((user) => [user.id, user]));
    const newDataArray = [];

    mergedData.forEach((item) => {
      const user = userInfoMap.get(item.id) || {}; // Get user info based on item id

      if (!item.userId) {
        newDataArray.push({ ...item, ...user });
      } else {
        item.userId.forEach((userId) => {
          const userFind = userInfoMap.get(userId) || {};
          newDataArray.push({ ...item, ...userFind });
        });
      }
    });
    // newDataArra -> [{"endTime": 1708389172, "eventName": "test1 event", "eventScheduledBy": "shreya", "eventType": "public", "first_name": "Akansh", "id": "kpBV5NrcHYb88xzgiC0u", "last_name": "Surendran", "picture": {"url": "https://res.cloudinary.com/realdevsquad/image/upload/v1706607105/profile/kpBV5NrcHYb88xzgiC0u/hawogtgm1sysa4zxgqeg.png"}, "startTime": 1708651681}, {"endTime": 1708389172, "eventName": "test1 event", "eventScheduledBy": "shreya", "eventType": "public", "first_name": "Akansh", "id": "kpBV5NrcHYb88xzgiC0u", "last_name": "Surendran", "picture": {"url": "https://res.cloudinary.com/realdevsquad/image/upload/v1706607105/profile/kpBV5NrcHYb88xzgiC0u/hawogtgm1sysa4zxgqeg.png"}, "startTime": 1708651681, "userId": ["kpBV5NrcHYb88xzgiC0u"]}]

    return newDataArray;
  };
  const mergePostInvite = (users, postInvite) => {
    const mergedData = [...users, postInvite];
    const tranform = tranformObj(mergedData);
    console.log('🚀 ~ mergePostInvite ~ tranform:', tranform);
    return tranform;
  };

  // Example usage: Merge postInvite into calendarData
  const handleNewDataSlot = (postInvite_) => {
    setShowInviteForm((prev) => !prev);

    const updatedCalendarData = mergePostInvite(users, postInvite_);
    console.log(
      '🚀 ~ handleNewDataSlot ~ updatedCalendarData:',
      updatedCalendarData,
    );
    setNewDataSlot(updatedCalendarData);

    setTimeout(() => {
      setRefreshKey(Math.random());
    }, 300);
  };
  return (
    <ScrollView horizontal={true}>
      <View>
        {isDatePickerVisible ? (
          <DatePicker
            modal
            mode="date"
            open={isDatePickerVisible}
            date={date}
            onConfirm={(date) => {
              setIsDatePickerVisible(false);
              setDate(date);
              setSelectedDate(formatDate(date));
            }}
            onCancel={() => {
              setIsDatePickerVisible(false);
            }}
          />
        ) : null}
        <TouchableOpacity onPress={handleDateChange}>
          <Table
            key={refreshKey}
            borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}
          >
            <Row
              data={[selectedDate]}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.text}
            />
          </Table>
        </TouchableOpacity>
        <ScrollView style={styles.dataWrapper}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            {generateTableData().map((rowData, index) => (
              <TableWrapper key={index} style={styles.row}>
                {rowData.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={
                      typeof cellData === 'string'
                        ? cellElement(cellData)
                        : has(cellData, 'first_name')
                        ? element(cellData)
                        : ''
                    }
                    style={{
                      width: 80,
                      height: 45,
                    }}
                    textStyle={styles.text}
                  />
                ))}
              </TableWrapper>
            ))}
          </Table>
        </ScrollView>
      </View>
      {showSelectedUsersDetails && (
        <Modal
          transparent={true}
          isVisible={true}
          onBackdropPress={() => setShowSelectedUsersDetails((prev) => !prev)}
          animationType="slide"
          backdropOpacity={0.7}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <View
            style={{
              height: 'auto',
              padding: 20,
              backgroundColor: 'white',
              borderBottomEndRadius: 2,
            }}
          >
            <UserDesc
              selectedSlots={selectedSlots}
              setModalVisible={setShowSelectedUsersDetails}
            />
          </View>
        </Modal>
      )}

      {showClock && (
        <View
          style={{
            height: screenHeight,
            backgroundColor: 'red',
          }}
        >
          <DatePicker
            modal
            mode="time"
            open={selectedTime}
            date={date}
            onConfirm={(time) => {
              setShowClock(false);
              // setDate(date);
              // setSelectedDate(formatDate(date));
              setSelectedTime(time);
              handleNewDataSlot(time);
            }}
            onCancel={() => {
              setIsDatePickerVisible(false);
            }}
          />
        </View>
      )}
      {showInviteForm && (
        <Modal
          transparent={true}
          isVisible={showInviteForm}
          onBackdropPress={handleInviteForm}
          onBackButtonPress={handleInviteForm}
          backdropOpacity={0.7}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={profileScreenStyles.modal}
        >
          <InviteForm
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            handleEventSubmit={handleNewDataSlot}
            users={users}
          />
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '500', color: 'black' },
  dataWrapper: { marginTop: -1 },
  row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
  btn: {
    width: 80,
    height: 40,
    // backgroundColor: '#78B7BB',
    borderRadius: 2,
  },
  modal: {
    height: 250,
  },
  btnText: { textAlign: 'center', color: 'black' },
});

export default Calendar;
