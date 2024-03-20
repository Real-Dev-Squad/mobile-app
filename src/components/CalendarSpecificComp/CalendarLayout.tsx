import { ScrollView, StyleSheet } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import TimeSlotView from './TimeSlotView';
import { windowHeight, windowWidth } from '../../helpers/CalendarInviteHelpers';

const CalendarLayout = ({
  progressVal,
  // usersWithTimeSlots,
  selectedDate,
  // getMatchingTimeSlots,
  userData,
}: // showInviteForm,
// setShowInviteForm,
{
  progressVal: number;
  usersWithTimeSlots: any;
  selectedDate: string;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  getMatchingTimeSlots: () => void;
  userData: any;
  showInviteForm: boolean;
  setShowInviteForm: Dispatch<SetStateAction<boolean>>;
}) => {
  const MULTIPLIER = (120 * progressVal) / 50;

  return (
    <ScrollView style={styles.timeSlotColView}>
      <TimeSlotView
        // setShowInviteForm={setShowInviteForm}
        multiplier={MULTIPLIER}
        // data={usersWithTimeSlots}
        selectedDate={selectedDate}
        // getMatchingTimeSlots={getMatchingTimeSlots}
        userData={userData}
        // showInviteForm={showInviteForm}
      />
      {/* {formatDate(selectedDate) === formatDate(new Date()) && (
        <CurrentTimeDenotingHorizontalLine
          progressVal={progressVal}
          multiplier={MULTIPLIER}
        />
      )} */}
    </ScrollView>
  );
};

export default CalendarLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    alignItems: 'center',
    padding: 2,
    backgroundColor: 'yellow',
  },
  timeSlotColView: {
    width: '100%',
    minHeight: windowHeight,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2,
  },
  eventColView: {
    borderWidth: 2,
  },
});
