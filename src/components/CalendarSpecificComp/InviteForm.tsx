import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import {
  formatDate,
  formatToSend,
  getColonTime,
  toUnix,
  windowWidth,
} from '../../helpers/CalendarInviteHelpers';
import { postEvent } from '../../utils/Api';
import InputBox from '../InputBox';
import Button_ from '../Button_';

function getDateObject(dateStr, time) {
  var [hours, minutes] = time.split(':');
  dateStr.setHours(Number(hours), Number(minutes));
  return dateStr;
}
const InviteForm = ({
  userData,
  selectedDate,
  handleEventSubmit,
  setSelectedTime,
  toggleForm,
}: any) => {
  const [isStartDatePickerVisible, setIsStartDatePickerVisible] =
    useState(false);
  const [startDate, setStartDate] = useState(selectedDate);
  const [isEndDatePickerVisible, setIsEndDatePickerVisible] = useState(false);
  const [endDate, setEndDate] = useState(selectedDate);
  const [eventTitle, setEventTitle] = useState('');
  const [showEndClock, setShowEndClock] = useState(false);
  const [endTime, setEndTime] = useState(
    getColonTime(
      new Date(selectedDate).setMinutes(
        new Date(selectedDate).getMinutes() + 5,
      ),
    ),
  );
  const [startTime, setStartTime] = useState(getColonTime(selectedDate));
  const { loggedInUserData } = useContext(AuthContext);
  const [showClock, setShowClock] = useState(false);
  const [error, setError] = useState('');
  const handleTitleChange = (text: string) => {
    if (text) {
      setError('');
    }
    setEventTitle(text);
  };

  const handleSubmitTime = () => {
    const formatStartDate = formatToSend(startDate, startTime);
    console.log('🚀 ~ handleSubmitTime ~ formatStartDate:', formatStartDate);
    const formatEndDate = formatToSend(endDate, endTime);
    console.log('🚀 ~ handleSubmitTime ~ formatEndDate:', formatEndDate);
    const formatStartDD = toUnix(formatStartDate);
    const formatEndDD = toUnix(formatEndDate);
    return { formatStartDD, formatEndDD };
  };

  const handleButtonHandler = () => {
    if (!eventTitle) {
      setError('Event title should not be empty');
    } else {
      setError('');
      const { formatStartDD: startUT, formatEndDD: endUT } = handleSubmitTime();
      const userIds = userData.map((item) => item.id);
      const data = {
        userId: userIds,
        eventType: 'public',
        eventName: eventTitle,
        eventScheduledBy: loggedInUserData?.id,
        startTime: Number(startUT),
        endTime: Number(endUT),
      };
      postEvent(data)
        .then(() => {
          handleEventSubmit(data);
          toggleForm();
          Toast.show({
            type: 'success',
            text1: 'event created successfully',
            position: 'bottom',
          });
        })
        .catch((err) =>
          Toast.show({
            type: 'error',
            text1: err,
            position: 'bottom',
          }),
        );
    }
  };
  const setMaxTime = () => {
    const maxTime = new Date();
    maxTime.setHours(23);
    maxTime.setMinutes(45);
    return maxTime;
  };

  // Function to set the maximum time for the end time picker to 23:45
  const getMaximumEndTime = () => {
    const maximumTime = new Date();
    maximumTime.setHours(23);
    maximumTime.setMinutes(45);
    return maximumTime;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {`Selected Date: ${formatDate(selectedDate)}`}
      </Text>
      <ScrollView>
        <InputBox
          title={eventTitle}
          label={'Event Name'}
          onChangeHandler={handleTitleChange}
          error={''}
          disabled={true}
        />
        {error.length > 0 && (
          <Text style={{ color: 'red', paddingTop: 2 }}>{error}</Text>
        )}
        <View
          style={[
            styles.flexView,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <TouchableOpacity
            onPress={() => setIsStartDatePickerVisible((prev) => !prev)}
            style={{ width: '40%' }}
          >
            <InputBox
              title={formatDate(startDate)}
              label={'Start Date'}
              disabled={false}
              onChangeHandler={() => {}}
              error={''}
            />
          </TouchableOpacity>
          {isStartDatePickerVisible ? (
            <DatePicker
              modal
              mode="date"
              open={isStartDatePickerVisible}
              date={startDate}
              onConfirm={(date_: Date) => {
                setStartDate(date_);
                setIsStartDatePickerVisible(false);
              }}
              onCancel={() => {
                setIsStartDatePickerVisible(false);
              }}
            />
          ) : null}
          <TouchableOpacity
            style={{ width: '40%' }}
            onPress={() => setShowClock((prev) => !prev)}
          >
            <InputBox
              title={startTime}
              label={'Start Time'}
              disabled={false}
              onChangeHandler={() => {}}
              error={''}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.flexView}>
          {showClock && (
            <DatePicker
              modal
              mode="time"
              open={showClock}
              date={getDateObject(selectedDate, startTime)}
              onConfirm={(time: any) => {
                console.log('🚀 ~ time:', time, getColonTime(time)); //2024-03-07T01:25:26.779Z 06:55
                setShowClock(false);
                setStartTime(getColonTime(time));
                setSelectedTime(getColonTime(time));
                handleEventSubmit(time);
              }}
              onCancel={() => {
                setShowClock(false);
              }}
              minimumDate={new Date()}
              maximumDate={setMaxTime()}
            />
          )}
        </View>
        <View
          style={[
            styles.flexView,
            { flexDirection: 'row', justifyContent: 'space-between' },
          ]}
        >
          <TouchableOpacity
            style={{ width: '40%' }}
            onPress={() => setIsEndDatePickerVisible((prev) => !prev)}
          >
            <InputBox
              title={formatDate(endDate)}
              label={'End Date'}
              disabled={false}
              onChangeHandler={() => {}}
              error={''}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: '40%' }}
            onPress={() => setShowEndClock((prev) => !prev)}
          >
            <InputBox
              title={endTime}
              label={'End Time'}
              disabled={false}
              onChangeHandler={() => {}}
              error={''}
            />
          </TouchableOpacity>
          {isEndDatePickerVisible ? (
            <DatePicker
              modal
              mode="date"
              open={isEndDatePickerVisible}
              date={endDate}
              onConfirm={(date_: Date) => {
                setEndDate(date_);
                setIsEndDatePickerVisible(false);
              }}
              onCancel={() => {
                setIsEndDatePickerVisible(false);
              }}
            />
          ) : null}
        </View>

        {showEndClock && (
          <DatePicker
            modal
            mode="time"
            open={showEndClock}
            date={getDateObject(selectedDate, endTime)}
            onConfirm={(time: any) => {
              setShowEndClock(false);
              setEndTime(getColonTime(time));
              handleEventSubmit(getColonTime(time));
            }}
            onCancel={() => {
              setShowEndClock(false);
            }}
            maximumDate={getMaximumEndTime()}
          />
        )}
        <Button_
          title={'Submit'}
          submitHandler={handleButtonHandler}
          disabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default InviteForm;

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    borderWidth: 2,
    borderColor: 'black',
    padding: 10,
    backgroundColor: '#F6F4F3',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: {
    padding: 4,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  flexView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
