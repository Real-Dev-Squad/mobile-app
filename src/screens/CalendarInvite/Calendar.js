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
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';

import DatePicker from 'react-native-date-picker';
import UserDesc from './UserDesc';
import { calendarData, fetchEvents, postInvite } from './dummy';
import { has } from 'lodash';
import Profile from '../../components/Profile';
import {
  Time_Slots,
  formatDate,
  formatTimeSlotDate,
  formatTimeSlotTime,
  randomColor,
  screenHeight,
  screenWidth,
  transformedArrFunc,
} from '../../helpers/SiteUtils';
import InviteForm from './InviteForm';
import { profileScreenStyles } from '../ProfileScreen/styles';
import { unixToTimeStampYYMMDD } from '../AuthScreen/Util';
import CalendarTable from './CalendarTable';

const Calendar = ({
  getMatchingTimeSlots,
  users,
  setNewDataSlot,
  setUsers,
  userData,
  selectedDate,
  setSelectedDate,
}) => {
  const [showInviteForm, setShowInviteForm] = useState(false);
  const windowWidth = Dimensions.get('window').width;
  const [date, setDate] = useState(new Date());
  // const [selectedDate, setSelectedDate] = useState(formatDate(date)); // dd/mm/yy
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [widthArr] = useState([80, windowWidth - 80]);
  const [showSelectedUsersDetails, setShowSelectedUsersDetails] =
    useState(false);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(new Date().toISOString());
  const [refreshKey, setRefreshKey] = useState(Math.random());
  const [showClock, setShowClock] = useState(false);

  useEffect(() => {
    generateTableData();
  }, [users]);

  const generateTableData = () => {
    const tableData = Time_Slots.map((slot) => {
      const matchingUsers = users?.filter((user) => {
        return (
          (slot.split(':')[0] ===
            formatTimeSlotTime(user.startTime).split(':')[0] ||
            slot.split(':')[0] ===
              formatTimeSlotTime(user.endTime).split(':')[0]) &&
          unixToTimeStampYYMMDD(user.startTime) === selectedDate
        );
      });
      let transformArr = transformedArrFunc(matchingUsers);
      return [slot, ...transformArr];
    });

    return tableData;
  };

  const handleInviteForm = () => {
    setShowInviteForm((prev) => !prev);
  };
  const handleDateChange = () => {
    setIsDatePickerVisible((prev) => !prev);
  };

  const element = (data, index, j) => {
    const { picture, first_name, last_name, startTime, endTime } = data;
    console.log('DATA START TIME END TIME AND J', startTime, endTime, j);

    // [6 - 7 , 6:30 - 7:00 ]
    // [6,6:30,7,7]

    // when j = 6 (time 6)
    // [6-6:30 , 6:15 - 7:15]
    // [6(solid),6:15(grey),6:30] 7:15

    // when j=7
    // [6:15 - 7:15]
    //
    let timePairs = [];

    for (let i = 0; i < startTime.length; i++) {
      timePairs.push([startTime[i], endTime[i]]);
    }
    console.log('🚀 ~ element ~ resultArray:', timePairs);
    const resultArray = timePairs.map((pair) => {
      const startHour = new Date(pair[0] * 1000).getHours();
      const endHour = new Date(pair[1] * 1000).getHours();
      const startMinutes = new Date(pair[0] * 1000).getMinutes();

      const endMinutes = new Date(pair[1] * 1000).getMinutes();
      return [startHour, startMinutes, endHour, endMinutes];
    });
    console.log('🚀 ~ resultArray ~ resultArray:', resultArray);

    const displayName = (picture, resultArray) => {
      const condition = [];
      // [[4, 15, 4, 30], [4, 20, 4, 35],[4,30,4,40],[4,35,5,0],[4,45,5,0]] => 4.30>4:20

      for (let i = 0; i < resultArray.length - 1; i++) {
        if (
          resultArray[i + 1][0] * 60 + resultArray[i + 1][1] <
          resultArray[i][2] * 60 + resultArray[i][3]
        ) {
          condition.push(resultArray[i]);
        }
        // condition.push(resultArray[i][0] * 60 + resultArray[i][1]);
        // condition.push(resultArray[i][2] * 60 + resultArray[i][3]);
      }
      condition.sort();
      if (condition.length > 0) {
        console.log(
          '~~~~~~~~~~~~condition',
          condition,
          2 * (condition[0][3] - condition[0][1]) + condition[0][1] * 2,
        );
      }
      //[4, 15, 4, 30, 4, 20, 4, 35, 4, 30, 4, 40, 4, 35, 5, 0, 4, 45, 5, 0]
      return (
        <View>
          {picture.map((item, i) => {
            const randomCol = 'black';
            return (
              <View
                style={[
                  styles.dashedLine,
                  {
                    height:
                      j !== resultArray[i][2]
                        ? 100
                        : 2 * (resultArray[i][3] - resultArray[i][1]), //calculated
                    width: 80,
                    position: 'absolute',
                    top: j !== resultArray[i][0] ? 0 : resultArray[i][1] * 2,
                    borderWidth: 1,
                    borderColor: randomCol,
                    borderStyle:
                      condition.length > 0 &&
                      resultArray[i][3] === condition[0][3]
                        ? 'dashed'
                        : 'solid',
                    // borderColor: 'white',
                    borderBottomColor:
                      condition.length > 0 &&
                      resultArray[i][2] === condition[0][2] &&
                      resultArray[i][3] === condition[0][3]
                        ? 'red'
                        : randomCol,
                  },
                ]}
              >
                {condition.length > 0 && resultArray[i][3] === condition[0][3] && (
                  <View
                    style={{
                      bottom: 0,
                      // top:
                      //   j !== resultArray[i][2]
                      //     ? 100
                      //     : 2 * (resultArray[i][3] - resultArray[i][1]), //calculated
                      zIndex: 10,
                      position: 'absolute',
                      borderStyle: 'dashed',
                      borderColor: 'white',
                      borderBottomColor: 'red',
                      borderWidth: 2,
                    }}
                  >
                    {/* <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                      --------------
                    </Text> */}
                  </View>
                )}

                {j === resultArray[i][2] && (
                  <Profile
                    selectedUser={{
                      picture: item,
                      first_name: first_name[i],
                      last_name: last_name[i],
                    }}
                    profileHeight={30}
                    profileWidth={30}
                  />
                )}
              </View>
            );
          })}
          {condition.map((ele, k) => (
            <View
              style={{
                position: 'absolute',
                top: ele[3] * 2,
                zIndex: 10,
                width: 180,
              }}
            >
              {/* <Text style={{ color: 'grey', fontWeight: 'bold' }}>
                --------------
              </Text> */}
            </View>
          ))}
        </View>
      );
    };
    return picture.url === 'string' ? (
      <Profile
        selectedUser={{
          picture: picture,
          first_name: first_name,
          last_name: last_name,
        }}
        profileHeight={20}
        profileWidth={20}
      />
    ) : (
      picture.length > 0 && (
        <Cell
          data={displayName(picture, resultArray)}
          textStyle={styles.text}
          style={{
            width: 100,
            position: 'absolute',
            top: 0,
          }}
          borderStyle={
            {
              // borderWidth: 1,
              // borderColor: 'white',
            }
          }
        />
      )
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

    return newDataArray;
  };
  const mergePostInvite = (users, postInvite) => {
    const mergedData = [...users, postInvite];
    const tranform = tranformObj(mergedData);
    return tranform;
  };
  const toggleForm = () => {
    setShowInviteForm((prev) => !prev);
  };

  const handleNewDataSlot = (postInvite_) => {
    getMatchingTimeSlots();
    //here
    // setNewDataSlot(updatedCalendarData);
    // setTimeout(() => {
    //   setRefreshKey(Math.random());
    // }, 300);
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
        <ScrollView>
          <Table
            borderStyle={{
              borderWidth: 1,
            }}
          >
            {generateTableData().map((rowData, index) => (
              <TableWrapper
                key={index}
                style={[
                  styles.row,
                  { height: rowData[1].startTime.length > 0 ? 120 : 80 },
                ]}
              >
                {rowData.map((cellData, cellIndex) => {
                  return (
                    <Cell
                      key={cellIndex}
                      data={
                        typeof cellData === 'string'
                          ? cellElement(cellData)
                          : has(cellData, 'first_name')
                          ? element(cellData, cellIndex, index)
                          : ''
                      }
                      style={
                        {
                          // display: 'flex',
                          // height: has(cellData, 'first_name') ? 200 : 80,
                          // height: 15, //to mention specific
                          // color: 'black',
                          // flexDirection: 'column',
                          // backgroundColor: has(cellData, 'first_name')
                          //   ? 'red'
                          //   : '',
                        }
                      }
                      borderStyle={{
                        borderWidth: has(cellData, 'first_name') ? 0 : 1,
                      }}
                      textStyle={styles.text}
                    />
                  );
                })}
              </TableWrapper>
            ))}

            {/* <TableWrapper>
              <Col
                data={generateTableData()}
                heightArr={[28, 28]}
                textStyle={styles.text}
              />
            </TableWrapper> */}
          </Table>
        </ScrollView>
      </View>
      {/* <TouchableOpacity
        onPress={() => {
          setSelectedSlots(data);
          setShowSelectedUsersDetails((prev) => !prev);
        }}
      > */}
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
            userData={userData}
            setIsDatePickerVisible={setIsDatePickerVisible}
            setSelectedTime={setSelectedTime}
            toggleForm={toggleForm}
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
  row: { flexDirection: 'row', backgroundColor: 'white' },
  btn: {
    width: 80,
    height: 30,
    // backgroundColor: '#78B7BB',
    borderRadius: 2,
  },
  modal: {
    height: 250,
  },
  btnText: { textAlign: 'center', color: 'black' },
  dashedLine: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'dashed',
    // Adjust width, margin, or padding as needed
  },
});

export default Calendar;
