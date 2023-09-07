import Images from '../../constants/images/Image';
import {
  StyleSheet,
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Pressable,
} from 'react-native';
import React from 'react';
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
      <Pressable onPress={handleFormSubmit}>
        <Image style={styles.close} source={Images.closeIcon} />
      </Pressable>
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
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        onPress={isFormValid() && handleFormSubmit}
        style={styles.SubmitButtonContainer}
        disabled={isLoading}
      >
        <Text style={styles.SubmitButtonText}>Submit</Text>
      </TouchableOpacity>
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
    paddingHorizontal: 35,
    paddingVertical: 20,
    borderRadius: 8,
    marginTop: 170,
    marginLeft: 30,
    marginRight: 30,
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
  close: {
    height: 20,
    width: 20,
    marginLeft: 'auto',
    marginBottom: 10,
  },
  text: {
    color: '#000000',
  },
  SubmitButtonContainer: {
    backgroundColor: '#808080',
    paddingVertical: 10,
    paddingHorizontal: 12,
    width: '30%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  SubmitButtonText: {
    color: '#fff',
    alignSelf: 'center',
  },
});
