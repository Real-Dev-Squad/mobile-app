import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { formatDate, formatTimeSlotDate } from '../../helpers/SiteUtils';
import DatePicker from 'react-native-date-picker';

const LayoutHeader = ({ selectedDate, setSelectedDate }) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDatePicker = () => {
    setIsDatePickerVisible((prev) => !prev);
  };

  return (
    <TouchableOpacity onPress={handleDatePicker} style={styles.header}>
      <Text>Date: {formatDate(selectedDate)}</Text>
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
  );
};

export default LayoutHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    borderRadius: 2,
  },
});
