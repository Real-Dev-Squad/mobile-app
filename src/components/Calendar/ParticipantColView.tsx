import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Profile from '../Profile';

const ParticipantColView = ({
  event,
  multiplier,
  borderTopWidth,
}: {
  event: any;
  multiplier: number;
  borderTopWidth: () => void;
}) => {
  const { startTime, endTime, picture, first_name, last_name } = event;
  const startDate = new Date(startTime * 1000); // Convert seconds to milliseconds
  const endDate = new Date(endTime * 1000); // Convert seconds to milliseconds

  // Extract hours and minutes
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();

  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();
  const getTopAndHeight = () => {
    const height = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    const top = startHour * 60 + startMinute;
    return { height: (height * multiplier) / 60, top: (top * multiplier) / 60 };
  };

  const { height, top } = getTopAndHeight();
  console.log('height and top', height, top);
  return (
    <TouchableOpacity
      onPress={() =>
        Alert.alert(
          startHour + ' : ' + startMinute + ' TO ' + endHour + ':' + endMinute,
        )
      }
      style={[
        styles.event,
        {
          height: height,
          top: top,
          position: 'absolute',
          backgroundColor: 'yellow',
          width: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
      ]}
    >
      <Profile
        selectedUser={{
          picture: picture,
          first_name: first_name,
          last_name: last_name,
        }}
        profileHeight={(height * 50) / 100}
        profileWidth={(height * 50) / 100}
      />
    </TouchableOpacity>
  );
};

export default ParticipantColView;

const styles = StyleSheet.create({
  container: {
    // height: screenHeight,
  },
  event: {
    // height: CELL_HEIGHT,
    borderWidth: 1,
    backgroundColor: 'blue',
  },
});
