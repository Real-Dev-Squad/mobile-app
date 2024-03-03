import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import {
  formatDate,
  getSortedEvents,
  screenHeight,
  screenWidth,
} from '../../helpers/SiteUtils';
import LayoutHeader from '../../components/Calendar/LayoutHeader';
import TimeSlotView from '../../components/Calendar/TimeSlotView';
import { ScrollView } from 'react-native-gesture-handler';

const CalendarLayout = ({
  progressVal,
  usersWithTimeSlots,
  selectedDate,
  setSelectedDate,
  getMatchingTimeSlots,
  userData,
}: // selectedUsers,
{
  progressVal: number;
  usersWithTimeSlots: any;
  selectedDate: String;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  getMatchingTimeSlots: () => void;
  userData: any;
  // selectedUsers: [];
}) => {
  console.log('USERWITH TIME SLOTs', usersWithTimeSlots);
  const MULTIPLIER = (120 * progressVal) / 50;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LayoutHeader
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <View style={styles.timeSlotColView}>
        <TimeSlotView
          multiplier={MULTIPLIER}
          data={usersWithTimeSlots}
          selectedDate={selectedDate}
          getMatchingTimeSlots={getMatchingTimeSlots}
          userData={userData}
        />
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
  },
  eventColView: {
    borderWidth: 2,
  },
});
