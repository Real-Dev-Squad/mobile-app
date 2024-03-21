import { StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Time_Slots } from '../../constants/TimeSlotsData';
import { CELL_HEIGHT, windowWidth } from '../../helpers/CalendarInviteHelpers';
import { profileScreenStyles } from '../../screens/ProfileScreen/styles';
import Modal from 'react-native-modal';
import InviteForm from './InviteForm';
import ParticipantColView from './ParticipantColView';
import { EventDataType } from '../../context/type';

const TimeSlotView = ({
  selectedUserData,
  multiplier,
  showInviteForm,
  setShowInviteForm,
  selectedDate,
  getMatchingTimeSlots,
  data,
}: {
  multiplier: number;
  data: any;
  getMatchingTimeSlots: () => void;
  selectedDate: string;
  selectedUserData: any;
  showInviteForm: boolean;
  setShowInviteForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedTime, setSelectedTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`,
  );
  const handleInviteForm = () => setShowInviteForm((prev) => !prev);

  const getBorderBottomColor = (
    currentStartTime: number,
    currentEndTime: number,
    nextStartTime: number,
  ) => {
    if (currentStartTime < nextStartTime && nextStartTime < currentEndTime) {
      return 'red';
    }
    return null;
  };

  return (
    <View style={styles.timeSlotContainer}>
      <View style={[styles.container, { borderWidth: 2, borderColor: 'red' }]}>
        {Time_Slots.map((ele: string, index: number) => (
          <View key={index} style={[styles.slot, { height: multiplier }]}>
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
            selectedUserData={selectedUserData}
            handleEventSubmit={getMatchingTimeSlots}
            toggleForm={handleInviteForm}
          />
        </Modal>
      )}
      <View style={{ width: '20%' }}>
        {data?.map((event: EventDataType, index: number) => (
          <ParticipantColView
            key={index}
            event={event}
            multiplier={multiplier}
            getBorderBottomColor={getBorderBottomColor(
              event.startTime,
              event.endTime,
              data[index + 1] && data[index + 1]?.startTime,
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
  timeSlotContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    flex: 1,
    baorderWidth: 2,
    borderColor: 'yellow',
    width: windowWidth,
  },
  container: {
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: 'red',
  },
  slot: {
    height: CELL_HEIGHT,
    borderWidth: 1,
  },
  slotText: { color: 'black', textAlign: 'center', padding: 4 },
});
