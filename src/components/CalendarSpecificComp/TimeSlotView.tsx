import { StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { Time_Slots } from '../../constants/TimeSlotsData';
import { CELL_HEIGHT } from '../../helpers/CalendarInviteHelpers';
import { profileScreenStyles } from '../../screens/ProfileScreen/styles';
import Modal from 'react-native-modal';
import InviteForm from './InviteForm';

const TimeSlotView = ({
  selectedUserData,
  multiplier,
  showInviteForm,
  setShowInviteForm,
  selectedDate,
}: // getMatchingTimeSlots,
// selectedDate,
// selectedUserData,
{
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

  // const getBorderBottomColor = (
  //   currentStartTime: number,
  //   currentEndTime: number,
  //   nextStartTime: number,
  // ) => {
  //   if (currentStartTime < nextStartTime && nextStartTime < currentEndTime) {
  //     return 'red';
  //   }
  //   return null;
  // };

  return (
    <>
      <View style={styles.container}>
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
            // handleEventSubmit={getMatchingTimeSlots}
            // toggleForm={toggleForm}
          />
        </Modal>
      )}
    </>
  );
};

export default TimeSlotView;

const styles = StyleSheet.create({
  container: {
    width: 80,
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
