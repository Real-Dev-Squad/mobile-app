import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { formatDate, formatTimeSlotDate } from '../../helpers/SiteUtils';
import DatePicker from 'react-native-date-picker';
import { scale } from '../../utils/utils';

const LayoutHeader = ({ selectedDate, setSelectedDate }) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDatePicker = () => {
    setIsDatePickerVisible((prev) => !prev);
  };

  return (
    <TouchableOpacity onPress={handleDatePicker} style={styles.header}>
      <View style={{ elevation: 10 }}>
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
  );
};

export default LayoutHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3994f8',
    flex: 1,
    // width: '80%',
    height: 40,
    borderRadius: 4,
    alignItems: 'center',
    // padding: scale(14),
    // marginTop: scale(25),
  },
  selectedDate: { color: 'white', padding: 4 },
});
