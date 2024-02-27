import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native-paper';
import InputBox from '../../components/InputBox';
import Button_ from '../../components/Button_';
import {
  formatTimeSlotTime,
  getColonTime,
  screenHeight,
  screenWidth,
} from '../../helpers/SiteUtils';
import Duration from './Duration';
import { durations, postEvent } from './dummy';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';

// assigned To : automatically will come selectedUsers on submit it should send userids of these peoiple

// event title
// Event description
// time it will already show (whatever i selected) ; duration (can select tille 60 min)
//
function changeDateFormat(dateStr) {
  // Split the date string
  var dateComponents = dateStr.split('/');

  // Rearrange the components
  var newDateStr =
    dateComponents[1] + '/' + dateComponents[0] + '/' + dateComponents[2];

  return newDateStr;
}
const InviteForm = ({
  userData,
  selectedTime,
  selectedDate,
  handleEventSubmit,
  users,
  setIsDatePickerVisible,
  setSelectedTime,
  toggleForm,
}) => {
  const [eventTitle, setEventTitle] = useState('');

  const [duration, setDuration] = useState(durations[0]);
  const { loggedInUserData } = useContext(AuthContext);
  const [showClock, setShowClock] = useState(false);

  const handleTitleChange = (text: string) => {
    setEventTitle(text);
  };

  const toUnix = (_date) => {
    const dateTimeString = _date;
    const unixTimestamp = moment(dateTimeString).unix();
    return unixTimestamp;
  };

  const handleSubmitTime = () => {
    // dd/mm/yy
    // convert from dd/mm/yy to yy/mm/dd
    let convertFromDDMMYYTOYYMMDD = selectedDate.split('/').reverse().join('-');

    const formatDD = `20${convertFromDDMMYYTOYYMMDD}T${selectedTime}`;

    const correctTime = Number(selectedTime.split(':')[1]) + duration;
    const endHour =
      Math.floor(correctTime / 60) + Number(selectedTime.split(':')[0]);
    let endMin = correctTime % 60;
    const formatEndDD_ = `20${convertFromDDMMYYTOYYMMDD}T${
      endHour > 10 ? endHour : '0' + endHour
    }:${endMin > 10 ? endMin : '0' + endMin}`;

    //TODO:
    const formatStartDD = toUnix(formatDD);

    const formatEndDD = toUnix(formatEndDD_);

    return { formatStartDD, formatEndDD };
  };
  const handleButtonHandler = () => {
    console.log('🚀 ~ handleButtonHandler ~ users:', userData);
    const { formatStartDD: startUT, formatEndDD: endUT } = handleSubmitTime();
    const userIds = userData.map((item) => item.id);

    // console.log('🚀 ~ handleButtonHandler ~ userIds:', userIds);
    const data = {
      userId: userIds,
      eventType: 'public',
      eventName: eventTitle,
      eventScheduledBy: loggedInUserData?.id,
      startTime: Number(startUT),
      endTime: Number(endUT),
    };
    console.log('🚀 ~ handleButtonHandler ~ data:', data);
    postEvent(data)
      .then(() => {
        handleEventSubmit(data);
        toggleForm();
      })
      .catch((err) => console.log(err));
  };
  return (
    <View
      style={{
        width: screenWidth,
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        backgroundColor: '#F6F4F3',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
    >
      <InputBox
        title={eventTitle}
        label={'Event Name'}
        onChangeHandler={handleTitleChange}
        error={''}
        disabled={true}
      />
      {/** TODO: event description */}
      <View style={styles.flexView}>
        <InputBox
          title={selectedDate}
          label={'Date'}
          disabled={true}
          onChangeHandler={() => {}}
          error={''}
        />

        <TouchableOpacity onPress={() => setShowClock((prev) => !prev)}>
          <InputBox
            title={selectedTime}
            label={'Time'}
            disabled={false}
            onChangeHandler={() => {}}
            error={''}
          />
        </TouchableOpacity>

        {showClock && (
          <DatePicker
            modal
            mode="time"
            open={showClock}
            date={new Date(changeDateFormat(selectedDate))}
            onConfirm={(time: any) => {
              setShowClock(false);
              // setDate(date);
              // setSelectedDate(formatDate(date));
              setSelectedTime(getColonTime(time));
              handleEventSubmit(time);
            }}
            onCancel={() => {
              setShowClock(false);
            }}
          />
        )}

        <Duration duration={duration} setDuration={setDuration} />
      </View>
      <Button_
        title={'Submit'}
        submitHandler={handleButtonHandler}
        disabled={false}
      />
    </View>
  );
};

export default InviteForm;

const styles = StyleSheet.create({
  flexView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

// 1 ghante me ek he event book
