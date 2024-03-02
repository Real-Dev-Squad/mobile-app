import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { screenHeight, screenWidth } from '../../helpers/SiteUtils';
import LayoutHeader from '../../components/Calendar/LayoutHeader';
import TimeSlotView from '../../components/Calendar/TimeSlotView';
import { ScrollView } from 'react-native-gesture-handler';
import ParticipantColView from '../../components/Calendar/ParticipantColView';

const CalendarLayout = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <LayoutHeader />
      <View style={styles.timeSlotColView}>
        <TimeSlotView />
      </View>
      <View style={styles.eventColView}>
        <ParticipantColView />
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
  },
  eventColView: {
    borderWidth: 2,
  },
});
