import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Profile from '../Profile';
import Modal from 'react-native-modal';

import UserDesc from '../../screens/CalendarInvite/UserDesc';
import { profileScreenStyles } from '../../screens/ProfileScreen/styles';
import { getStartAndEndTime } from '../../helpers/SiteUtils';

const ParticipantColView = ({
  event,
  multiplier,
  getBorderBottomColor,
  selectedDate,
}: {
  event: any;
  multiplier: number;
  getBorderBottomColor: string;
  selectedDate: Date;
}) => {
  const [showSelectedUsersDetails, setShowSelectedUsersDetails] =
    useState(false);

  let { startTime, endTime, eventName, users_ } = event;
  console.log({ startTime, endTime, event });
  const minHourSelectedDate =
    new Date(selectedDate).setHours(0, 0, 0, 0) / 1000;
  console.log('🚀 ~ minHourSelectedDate:', minHourSelectedDate);
  const maxHourSelectedDate =
    new Date(selectedDate).setHours(23, 59, 59, 59) / 1000;
  console.log('🚀 ~ maxHourSelectedDate:', maxHourSelectedDate);

  const startDate = new Date(startTime * 1000);
  const endDate = new Date(endTime * 1000); // Convert seconds to milliseconds

  // Extract hours and minutes
  let startHour = startDate.getHours();
  let startMinute = startDate.getMinutes();

  let endHour = endDate.getHours();
  let endMinute = endDate.getMinutes();
  console.log({ endTime, startTime, maxHourSelectedDate, minHourSelectedDate });
  if (endTime && endTime > maxHourSelectedDate) {
    endHour = 11;
    endMinute = 59;
  } else if (startTime && startTime < minHourSelectedDate) {
    startHour = 0;
    startMinute = 0;
  }
  console.log({ endHour, endMinute, startHour, startMinute });
  const getTopAndHeight = () => {
    const height = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    const top = startHour * 60 + startMinute;
    return {
      height: Math.abs((height * multiplier) / 60),
      top: (top * multiplier) / 60,
    };
  };

  const { height, top } = getTopAndHeight();
  console.log('height and top', height, top);
  const getProfileHeight = () => {
    const maxProfileSize = 300; // Set your maximum height or width here

    // Calculate the profileHeight and profileWidth based on the height variable
    let calculatedHeight = (height * 20) / 100;
    let calculatedWidth = (height * 20) / 100;

    // Check if the calculated height exceeds the maximum, and if so, set it to the maximum
    if (calculatedHeight > maxProfileSize) {
      calculatedHeight = maxProfileSize;
    }

    // Check if the calculated width exceeds the maximum, and if so, set it to the maximum
    if (calculatedWidth > maxProfileSize) {
      calculatedWidth = maxProfileSize;
    }
  };
  return (
    <TouchableOpacity
      onPress={() => setShowSelectedUsersDetails((prev) => !prev)}
      style={[
        styles.event,
        {
          height: height || 0,
          top: top || 0,
          position: 'absolute',
          borderWidth: 1,
          width: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomColor: getBorderBottomColor ?? 'black',
        },
      ]}
    >
      {users_.map((user) => (
        <>
          <Profile
            selectedUser={{
              picture: user.picture,
              first_name: user.first_name,
              last_name: user.last_name,
            }}
            profileHeight={getProfileHeight()}
            profileWidth={getProfileHeight()}
          />
          {showSelectedUsersDetails && (
            <Modal
              // transparent={true}
              isVisible={showSelectedUsersDetails}
              onBackdropPress={() =>
                setShowSelectedUsersDetails((prev) => !prev)
              }
              onBackButtonPress={() =>
                setShowSelectedUsersDetails((prev) => !prev)
              }
              backdropOpacity={0.7}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              style={profileScreenStyles.modal}
            >
              <UserDesc
                startTime={startTime}
                endTime={endTime}
                eventName={eventName}
                user={user}
                setModalVisible={setShowSelectedUsersDetails}
              />
            </Modal>
          )}
        </>
      ))}
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
  },
});