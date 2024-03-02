import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CELL_HEIGHT, Time_Slots, screenWidth } from '../../helpers/SiteUtils';
import ParticipantColView from './ParticipantColView';

const TimeSlotView = () => {
  return (
    <View style={styles.container}>
      {Time_Slots.map((ele, index) => (
        <View style={styles.slot}>
          <Text>{ele}</Text>
        </View>
      ))}
      <View
        style={{
          width: screenWidth - 80,
          backgroundColor: 'white',
          height: CELL_HEIGHT,
        }}
      >
        <ParticipantColView />
      </View>
    </View>
  );
};

export default TimeSlotView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red',
    width: 80,
    display: 'flex',
    flexDirection: 'column',
  },
  slot: {
    height: CELL_HEIGHT,
    borderWidth: 1,
  },
});
