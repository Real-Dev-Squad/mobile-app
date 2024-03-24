import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { CELL_HEIGHT, Time_Slots, screenWidth } from '../../helpers/SiteUtils';
import ParticipantColView from './ParticipantColView';
import InviteForm from '../../screens/CalendarInvite/InviteForm';
import { profileScreenStyles } from '../../screens/ProfileScreen/styles';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native-gesture-handler';

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
  console.log('🚀 ~ data:>>>>>>>>>', data);
  const [selectedTime, setSelectedTime] = useState(
    `${new Date().getHours()}:${new Date().getMinutes()}`,
  );
  console.log('selected time >>>>>>>>>>', selectedTime);
  const handleInviteForm = () => setShowInviteForm((prev) => !prev);

  const toggleForm = () => setShowInviteForm((prev) => !prev);

  const getBorderBottomColor = (
    currentStartTime: number,
    currentEndTime: number,
    nextStartTime: number,
    ...abc: any
  ) => {
    if (currentStartTime < nextStartTime && nextStartTime < currentEndTime) {
      return 'red';
    }
    return null;
  };
  // const handleNewDataSlot = () => {};

  return (
    <View
      style={{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        baorderWidth: 2,
        borderColor: 'yellow',
        width: screenWidth,
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
            handleEventSubmit={getMatchingTimeSlots}
            userData={userData}
            toggleForm={toggleForm}
          />
        </Modal>
      )}
      <View style={{ width: '20%' }}>
        {data?.map((event: any, index: number) => (
          <ParticipantColView
            key={index}
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
    width: '20%',
    display: 'flex',
    flexDirection: 'column',
  },
  slot: {
    height: CELL_HEIGHT,
    borderWidth: 1,
  },
  slotText: { color: 'black', textAlign: 'center', padding: 4 },
});
