import React, { useState } from 'react';
import { Text, TouchableOpacity, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { styles } from './OOOFormDatePickerStyle';

type DatePickerProps = {
  title: string;
  onDateChange: (date: Date) => void;
  selectedDate: Date;
};

const DeadLineDatePicker = (props: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const { onDateChange, selectedDate, title } = props;
  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => {
          setOpen(true);
        }}
      >
        <Text style={styles.buttonTextStyle}>{title}</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={selectedDate || new Date()}
        onConfirm={(date) => {
          setOpen(false);
          console.log('date', date);
          onDateChange(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </ScrollView>
  );
};

export default DeadLineDatePicker;