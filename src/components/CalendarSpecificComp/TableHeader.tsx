import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { formatDate } from '../../helpers/CalendarInviteHelpers';

const LayoutHeader = ({ selectedDate, setSelectedDate }) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDatePicker = () => {
    setIsDatePickerVisible((prev) => !prev);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          const date = new Date(selectedDate);
          date.setDate(date.getDate() - 1);
          setSelectedDate(date);
        }}
      >
        <Text style={{ textAlign: 'center', color: 'white', marginTop: 4 }}>
          -
        </Text>
      </TouchableOpacity>
      <View style={{ flex: 2, flexDirection: 'row' }}>
        <TouchableOpacity onPress={handleDatePicker} style={styles.header}>
          <View>
            <Text style={styles.selectedDate}>
              Date: {formatDate(selectedDate)}
            </Text>
          </View>

          {isDatePickerVisible ? (
            <DatePicker
              modal
              mode="date"
              open={isDatePickerVisible}
              date={currentDate}
              onConfirm={(date_: Date) => {
                setIsDatePickerVisible(false);
                setCurrentDate(date_);
                setSelectedDate(date_);
              }}
              onCancel={() => {
                setIsDatePickerVisible(false);
              }}
            />
          ) : null}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={{
          flex: 1,
          height: 40,
          width: 50,
          padding: 4,
          backgroundColor: '#3994f8',
          marginHorizontal: 4,
        }}
        onPress={() => {
          const date = new Date(selectedDate);
          date.setDate(date.getDate() + 1);
          setSelectedDate(date);
        }}
      >
        <Text style={{ textAlign: 'center', color: 'white', marginTop: 4 }}>
          +
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default LayoutHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3994f8',
    flex: 1,
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
  },
  selectedDate: { color: 'white', padding: 4 },
  deleteButton: {
    flex: 1,
    height: 40,
    width: 50,
    backgroundColor: '#3994f8',
    padding: 4,
    marginHorizontal: 4,
  },
});
