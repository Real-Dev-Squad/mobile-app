import { Alert, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { TextInput } from 'react-native-paper';
import InputBox from '../../components/InputBox';
import Button_ from '../../components/Button_';
import { screenHeight, screenWidth } from '../../helpers/SiteUtils';
import Duration from './Duration';
import { durations } from './dummy';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';

// assigned To : automatically will come selectedUsers on submit it should send userids of these peoiple

// event title
// Event description
// time it will already show (whatever i selected) ; duration (can select tille 60 min)
//
const InviteForm = ({
  selectedTime,
  selectedDate,
  handleEventSubmit,
  users,
}) => {
  const [eventTitle, setEventTitle] = useState('');

  const [duration, setDuration] = useState(durations[0]);
  const { loggedInUserData } = useContext(AuthContext);

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

    console.log(
      '🚀 ~ handleSubmitTime ~ endTime:',
      formatEndDD_,
      new Date(formatEndDD_),
    );

    //TODO:
    const formatStartDD = toUnix(formatDD);

    const formatEndDD = toUnix(formatEndDD_);
    Alert.alert(formatEndDD_ + 'unix' + formatEndDD);

    return { formatStartDD, formatEndDD };
  };
  const handleButtonHandler = () => {
    const { formatStartDD: startUT, formatEndDD: endUT } = handleSubmitTime();
    const userIds = users.map((item) => item.id);
    console.log('🚀 ~ handleButtonHandler ~ userIds:', userIds);
    const data = {
      userId: userIds, //TODO:
      eventType: 'public',
      eventName: eventTitle,
      eventScheduledBy: loggedInUserData?.id,
      startTime: Number(startUT),
      endTime: Number(endUT),
    };
    handleEventSubmit(data);
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
        disabled={false}
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
        <InputBox
          title={selectedTime}
          label={'Time'}
          disabled={true}
          onChangeHandler={() => {}}
          error={''}
        />
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
