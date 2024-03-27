import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Modal from 'react-native-modal';

import { profileScreenStyles } from '../../screens/ProfileScreen/styles';

import { EventDataType, UserInfoType } from '../../context/type';
import Profile from './Profile';
import UserDesc from './UserDesc';
import { CELL_HEIGHT, windowHeight } from '../../helpers/CalendarInviteHelpers';

const ParticipantColView = ({
  event,
  multiplier,
  getBorderBottomColor,
  selectedDate,
}: {
  event: EventDataType;
  multiplier: number;
  getBorderBottomColor: string | null;
  selectedDate: string;
}) => {
  const [showSelectedUsersDetails, setShowSelectedUsersDetails] =
    useState(false);

  let { startTime, endTime, eventName, users_ } = event;
  const minHourSelectedDate =
    new Date(selectedDate).setHours(0, 0, 0, 0) / 1000;
  const maxHourSelectedDate =
    new Date(selectedDate).setHours(23, 59, 59, 59) / 1000;

  const startDate = new Date(startTime * 1000);
  const endDate = new Date(endTime * 1000); // Convert seconds to milliseconds

  // Extract hours and minutes
  let startHour = startDate.getHours();
  let startMinute = startDate.getMinutes();

  let endHour = endDate.getHours();
  let endMinute = endDate.getMinutes();
  if (endTime && endTime > maxHourSelectedDate) {
    endHour = 11;
    endMinute = 59;
  } else if (startTime && startTime < minHourSelectedDate) {
    startHour = 0;
    startMinute = 0;
  }
  const getTopAndHeight = () => {
    const height = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    const top = startHour * 60 + startMinute;
    return {
      height: Math.abs((height * multiplier) / 60),
      top: (top * multiplier) / 60,
    };
  };

  const { height, top } = getTopAndHeight();
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
    console.log({ calculatedHeight, calculatedWidth });
  };
  const toggleDesc = () => {
    setShowSelectedUsersDetails((prev) => !prev);
  };
  return (
    <TouchableOpacity
      onPress={toggleDesc}
      style={[
        styles.event,
        {
          height: height || 0,
          top: top || 0,
          borderBottomColor: getBorderBottomColor ?? 'black',
        },
      ]}
    >
      {users_.map((user: UserInfoType) => (
        <>
          <Profile
            selectedUser={{
              picture: user.picture,
              first_name: user.first_name,
              last_name: user.last_name,
              id: user.id,
            }}
            profileHeight={getProfileHeight()}
            profileWidth={getProfileHeight()}
          />
          {showSelectedUsersDetails && (
            <Modal
              transparent={true}
              isVisible={showSelectedUsersDetails}
              onBackdropPress={toggleDesc}
              onBackButtonPress={toggleDesc}
              backdropOpacity={0.7}
              animationIn="slideInUp"
              animationOut="slideOutDown"
              style={profileScreenStyles.modal}
            >
              <UserDesc
                startTime={startTime}
                endTime={endTime}
                eventName={eventName}
                setModalVisible={showSelectedUsersDetails}
                user={user}
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
    height: windowHeight,
  },
  event: {
    height: CELL_HEIGHT,
    borderWidth: 1,
    position: 'absolute',
    width: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
