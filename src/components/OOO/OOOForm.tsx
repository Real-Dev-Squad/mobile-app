import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import React, { useState } from 'react';
import { OOOFormType } from './OOOFormType';
import DatePicker from './OOOFormDatePicker';

const OOOForm = ({
  fromDate,
  toDate,
  description,
  setToDate,
  setFromDate,
  setDescription,
  handleFormSubmit,
  isLoading,
}: OOOFormType) => {
  const isFormValid = () => {
    // Check if fromDate and toDate are not null or undefined
    if (!fromDate || !toDate) {
      Alert.alert('Error', 'Please select both From Date and To Date.');
      return false;
    }

    // Check if fromDate is less than toDate
    if (fromDate >= toDate) {
      Alert.alert('Error', 'From Date must be less than To Date.');
      return false;
    }

    // Check if description is not empty
    if (!description) {
      Alert.alert('Error', 'Description is required.');
      return false;
    }

    return true;
  };

  return (
    <View style={styles.formContainer}>
      <DatePicker
        title={`From date: ${fromDate.toLocaleString('en-US')}`}
        onDateChange={(date) => setFromDate(date)}
        selectedDate={fromDate}
      />
      <DatePicker
        title={`To date: ${toDate.toLocaleString('en-US')}`}
        onDateChange={(date) => setToDate(date)}
        selectedDate={toDate}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Button
        title="Submit"
        onPress={isFormValid() && handleFormSubmit}
        disabled={isLoading}
      />
    </View>
  );
};

export default OOOForm;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginTop: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    marginTop: 20,
    paddingHorizontal: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top', // To start text from the top in multiline input
  },
});
