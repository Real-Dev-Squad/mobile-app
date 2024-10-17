import Images from '../../constants/images/Image';
import {
  TextInput,
  View,
  Alert,
  TouchableOpacity,
  Text,
  Pressable,
  Image,
} from 'react-native';
import React from 'react';
import { OOOFormType } from './OOOFormType';
import DatePicker from './OOOFormDatePicker';
import { styles } from './OOOFormStyle';

const OOOForm = ({
  fromDate,
  toDate,
  description,
  setToDate,
  setFromDate,
  setDescription,
  handleFormSubmit,
  isLoading,
  setIsFormVisible,
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
    <View>
      <Pressable onPress={(prev) => setIsFormVisible(!prev)}>
        <Image style={styles.close} source={Images.closeIcon} />
      </Pressable>
      <DatePicker
        title={`From date: ${fromDate.toLocaleDateString('en-US')}`}
        onDateChange={(date) => setFromDate(date)}
        selectedDate={fromDate}
      />
      <DatePicker
        title={`To date: ${toDate.toLocaleDateString('en-US')}`}
        onDateChange={(date) => setToDate(date)}
        selectedDate={toDate}
      />
      <TextInput
        placeholder={'add description'}
        style={[styles.input, styles.textArea, styles.text]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity
        onPress={() => {
          isFormValid() && handleFormSubmit();
        }}
        style={styles.SubmitButtonContainer}
        disabled={isLoading}
      >
        <Text style={styles.SubmitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OOOForm;