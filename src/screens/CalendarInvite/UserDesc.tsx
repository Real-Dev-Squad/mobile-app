import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { formatTimeToUnix } from '../AuthScreen/Util';
import { screenHeight } from '../../helpers/SiteUtils';
const formatTimeSlotTime = (timeSlotDate) => {
  const timeSlotDateObj = new Date(timeSlotDate * 1000);
  const hours = timeSlotDateObj.getHours().toString().padStart(2, '0');
  const minutes = timeSlotDateObj.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};
const UserDesc = ({ selectedSlots, setModalVisible }) => {
  const { first_name, last_name, startTime, endTime } = selectedSlots;
  return (
    <View style={styles.modalContainer}>
      <ScrollView>
        <Text style={styles.modalText}>
          Unavailable slots for selected user:
        </Text>
        <View>
          <Text style={{ color: 'black', marginTop: 20 }}>
            {first_name} {last_name}
          </Text>
          <Text style={styles.time}>
            {`Start Time: ${formatTimeSlotTime(
              startTime,
            )}, End Time: ${formatTimeSlotTime(endTime)}`}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalVisible(false)}
          style={styles.modalButton}
        >
          <Text style={styles.modalButtonText}>{'<-- Back'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default UserDesc;

const styles = StyleSheet.create({
  modalContainer: {
    // backgroundColor: 'red',
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
