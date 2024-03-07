import { StyleSheet, View } from 'react-native';
import React, { Dispatch, SetStateAction } from 'react';
import { formatDate, screenHeight, screenWidth } from '../../helpers/SiteUtils';
import LayoutHeader from '../../components/Calendar/LayoutHeader';
import TimeSlotView from '../../components/Calendar/TimeSlotView';
import { ScrollView } from 'react-native-gesture-handler';
import CurrentTimeDenotingHorizontalLine from '../../components/Calendar/CurrentTimeDenotingHorizontalLine';

const CalendarLayout = ({
  progressVal,
  usersWithTimeSlots,
  selectedDate,
  setSelectedDate,
  getMatchingTimeSlots,
  userData,
  showInviteForm,
  setShowInviteForm,
}: // selectedUsers,
{
  progressVal: number;
  usersWithTimeSlots: any;
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
  getMatchingTimeSlots: () => void;
  userData: any;
  showInviteForm: boolean;
  setShowInviteForm: Dispatch<SetStateAction<boolean>>;
}) => {
  console.log('🚀 ~ progressVal:', progressVal);
  const MULTIPLIER = (120 * progressVal) / 50;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LayoutHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <View style={styles.timeSlotColView}>
        <TimeSlotView
          setShowInviteForm={setShowInviteForm}
          multiplier={MULTIPLIER}
          data={usersWithTimeSlots}
          selectedDate={selectedDate}
          getMatchingTimeSlots={getMatchingTimeSlots}
          userData={userData}
          showInviteForm={showInviteForm}
        />
        {/* TODO: */}
        {formatDate(selectedDate) === formatDate(new Date()) && (
          <CurrentTimeDenotingHorizontalLine
            progressVal={progressVal}
            multiplier={MULTIPLIER}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CalendarLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: screenWidth,
    alignItems: 'center',
    padding: 2,
  },
  timeSlotColView: {
    borderWidth: 2,
    width: '100%',
    minHeight: screenHeight,
    flex: 1,
    backgroundColor: 'yellow',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 2,
  },
  eventColView: {
    borderWidth: 2,
  },
});
