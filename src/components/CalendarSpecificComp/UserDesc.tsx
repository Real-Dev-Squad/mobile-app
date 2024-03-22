import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
const formatTimeSlotTime = (timeSlotDate: any) => {
  const timeSlotDateObj = new Date(timeSlotDate * 1000);
  const hours = timeSlotDateObj.getHours().toString().padStart(2, '0');
  const minutes = timeSlotDateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
const UserDesc = ({ startTime, endTime, eventName, setModalVisible, user }) => {
  return (
    <View style={styles.modalContainer}>
      <ScrollView>
        <Text style={styles.modalText}>
          Unavailable slots for selected user:
        </Text>
        <View>
          <Text style={{ color: 'black', marginTop: 20 }}>
            {user.first_name} {user.last_name}
          </Text>
          <Text style={{ color: 'black', marginTop: 30, fontWeight: 'bold' }}>
            {eventName}
          </Text>
          <Text style={styles.time}>
            {`Start Time: ${formatTimeSlotTime(
              startTime,
            )}, End Time: ${formatTimeSlotTime(endTime)}`}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserDesc;

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: 'white',
    // height: 400,
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 20,
    marginBottom: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  time: {
    marginTop: 10,
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
  },
  modalButton: {
    backgroundColor: '#537791',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
  },
});
