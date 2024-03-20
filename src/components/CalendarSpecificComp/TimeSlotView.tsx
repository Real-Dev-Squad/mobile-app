import { StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { Time_Slots } from '../../constants/TimeSlotsData';
import { CELL_HEIGHT } from '../../helpers/CalendarInviteHelpers';

const TimeSlotView = ({
  multiplier,
  showInviteForm,
  setShowInviteForm,
}: // data,
// getMatchingTimeSlots,
// selectedDate,
// userData,
{
  multiplier: number;
  data: any;
  getMatchingTimeSlots: () => void;
  selectedDate: string;
  userData: any;
  showInviteForm: boolean;
  setShowInviteForm: Dispatch<SetStateAction<boolean>>;
}) => {
  // const [selectedTime, setSelectedTime] = useState(
  //   `${new Date().getHours()}:${new Date().getMinutes()}`,
  // );
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
