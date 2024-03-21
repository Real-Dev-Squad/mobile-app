import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { calculateCurrentTimePosition } from '../../helpers/CalendarInviteHelpers';

const CurrentTimeDenotingHorizontalLine = ({
  multiplier,
}: {
  multiplier: number;
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      calculateCurrentTimePosition(multiplier);
    }, 60000); // Update every 60 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={[styles.Hr, { top: calculateCurrentTimePosition(multiplier) }]}
    />
  );
};

export default CurrentTimeDenotingHorizontalLine;

const styles = StyleSheet.create({
  Hr: {
    position: 'absolute',
    width: '100%',
    height: 2,
    backgroundColor: 'red',
  },
});
