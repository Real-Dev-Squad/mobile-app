import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const DatePicker = ({ onChange }) => {
  const formatDate = () => {
    const currentDate = new Date();

    // Extract day, month, and year components
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1; // Note: Month is zero-based
    const year = currentDate.getFullYear() % 100; // Get the last two digits of the year

    // Pad single-digit day and month with leading zeros
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    // Create the DD.MM.YY formatted date string
    const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;
    return formattedDate;
  };

  return (
    <TouchableOpacity onPress={onChange}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{formatDate}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  dateContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  dateText: {
    fontSize: 16,
  },
});

export default DatePicker;
