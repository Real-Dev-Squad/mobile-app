import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-datepicker';

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  datePickerStyle: {
    height: 40,
    border: '1px solid black',
    width: 205,
    marginTop: 2,
  },
  dateIconStyle:{
    position: 'absolute',
    left: 0,
    top: 4,
    marginLeft: 0,
  },
  dateInputStyle:{
    marginLeft: 36,
    height: 30,
    border: 'none',
  }
});
