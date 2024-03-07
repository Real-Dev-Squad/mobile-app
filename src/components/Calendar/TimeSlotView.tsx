import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CELL_HEIGHT, Time_Slots } from '../../helpers/SiteUtils';
import ParticipantColView from './ParticipantColView';
import InviteForm from '../../screens/CalendarInvite/InviteForm';
import { profileScreenStyles } from '../../screens/ProfileScreen/styles';
import Modal from 'react-native-modal';

const TimeSlotView = ({
  multiplier,
  data,
  getMatchingTimeSlots,
  selectedDate,
  userData,
  showInviteForm,
  setShowInviteForm,
}: {
  multiplier: number;
  data: any;
  getMatchingTimeSlots: () => void;
  selectedDate: Date;
  userData: any;
  showInviteForm: boolean;
  setShowInviteForm: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log('🚀 ~ data:', data);
  // next start time and next endTime , slot start time
  const [selectedTime, setSelectedTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`,
  );
  const handleInviteForm = () => setShowInviteForm((prev) => !prev);

  const toggleForm = () => setShowInviteForm((prev) => !prev);

  const getBorderBottomColor = (
    currentStartTime: number,
    currentEndTime: number,
    nextStartTime: number,
    ...abc: any
  ) => {
    console.log('LOGS', abc);
    if (currentStartTime < nextStartTime && nextStartTime < currentEndTime) {
      return 'red';
    }
    return null;
  };
  const handleNewDataSlot = (postInvite_) => {
    getMatchingTimeSlots();
    //here
    // setNewDataSlot(updatedCalendarData);
    // setTimeout(() => {
    //   setRefreshKey(Math.random());
    // }, 300);
  };
  const handleSubmitTime = (ele) => {
    //  mm/dd/yy
    // convert from dd/mm/yy to yy/mm/dd
    // 2024-03-03T14:31:22.871Z
    const selectedDateWithSelectedTime = `${
      selectedDate.toString().split('T')[0]
    }T${ele}`;
    console.log(
      '🚀 ~ handleSubmitTime ~ selectedDateWithSelectedTime:',
      selectedDateWithSelectedTime,
    );
    const durationMilliseconds = 30 * 60 * 1000;

    const endHourDate = new Date(selectedDate.getTime() + durationMilliseconds);

    //TODO: logic for the last hour
    // const formatStartDD = toUnix(selectedDateWithSelectedTime);
    // const formatEndDD = toUnix(endHourDate);
    // return { formatStartDD, formatEndDD };
  };
  return (
    <View
      style={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <View style={styles.container}>
        {Time_Slots.map((ele, index) => (
          <View style={[styles.slot, { height: multiplier }]}>
            <Text style={styles.slotText}>{ele}</Text>
          </View>
        ))}
      </View>
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
            setSelectedTime={setSelectedTime}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            handleEventSubmit={handleNewDataSlot}
            userData={userData}
            toggleForm={toggleForm}
          />
        </Modal>
      )}

      <View
        style={{
          width: '78%',
          backgroundColor: 'white',
          height: multiplier,
          marginLeft: 2,
        }}
      >
        {data?.map((event: any, index: number) => (
          <ParticipantColView
            event={event}
            multiplier={multiplier}
            getBorderBottomColor={getBorderBottomColor(
              event.startTime,
              event.endTime,
              data[index + 1] && data[index + 1]?.startTime,
              data[index],
              data[index + 1] && data[index + 1],
            )}
            selectedDate={selectedDate}
          />
        ))}
      </View>
    </View>
  );
};

export default TimeSlotView;

const styles = StyleSheet.create({
  container: {
    width: 80,
    display: 'flex',
    flexDirection: 'column',
  },
  slot: {
    height: CELL_HEIGHT,
    borderWidth: 1,
  },
  slotText: { color: 'black', textAlign: 'center', padding: 4 },
});
