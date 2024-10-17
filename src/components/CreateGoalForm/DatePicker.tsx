import React, { useState } from 'react';
import { SafeAreaView View } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { styles } from './DatePickerStyle';

const DatePickerComponent = () => {
  const [date, setDate] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <DatePicker
          style={styles.datePickerStyle}
          date={date}
          mode="date"
          placeholder="DD-MM-YYYY"
          format="DD-MM-YYYY"
          minDate="01-01-2020"
          maxDate="01-01-2025"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: styles.dateIconStyle,
            dateInput: styles.dateInputStyle,
          }}
          onDateChange={() => {
            setDate(date);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default DatePickerComponent;


