import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CELL_HEIGHT, screenHeight } from '../../helpers/SiteUtils';

const ParticipantColView = () => {
  return (
    <View style={styles.event}>
      <Text style={{ color: 'black' }}>ParticipantColView</Text>
    </View>
  );
};

export default ParticipantColView;

const styles = StyleSheet.create({
  container: {
    height: screenHeight,
  },
  event: {
    // height: CELL_HEIGHT,
    borderWidth: 1,
    backgroundColor: 'blue',
  },
});
