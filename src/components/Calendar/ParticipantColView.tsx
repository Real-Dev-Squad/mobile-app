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

  console.log('🚀 ~ borderTopWidth:', event);
  const { startTime, endTime, eventName, users_ } = event;
  // const { picture, first_name, last_name } = users_;
  const startDate = new Date(startTime * 1000); // Convert seconds to milliseconds
  const endDate = new Date(endTime * 1000); // Convert seconds to milliseconds

  // Extract hours and minutes
  const startHour = startDate.getHours();
  const startMinute = startDate.getMinutes();

  const endHour = endDate.getHours();
  const endMinute = endDate.getMinutes();
  const getTopAndHeight = () => {
    let a = getStartAndEndTime(selectedDate);
    console.log('🚀 ~ getTopAndHeight ~ a:', a);
    const height = endHour * 60 + endMinute - (startHour * 60 + startMinute);
    const top = startHour * 60 + startMinute;
    return {
      height: (height * multiplier) / 60,
      top: (top * multiplier) / 60,
    };
  };

  const { height, top } = getTopAndHeight();
  console.log('height and top', height, top);
  return (
    <TouchableOpacity
      onPress={() => setShowSelectedUsersDetails((prev) => !prev)}
      style={[
        styles.event,
        {
          height: height || 0,
          top: top || 0,
          position: 'absolute',
          borderWidth: top ? 1 : 0,
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
            profileHeight={(height * 30) / 100}
            profileWidth={(height * 30) / 100}
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
