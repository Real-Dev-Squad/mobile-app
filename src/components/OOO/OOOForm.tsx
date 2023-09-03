import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import React from 'react';
import Images from '../../constants/images/Image';
import { OOOFormType } from './OOOFormType';

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
  return (
    <View style={styles.formContainer}>
      <Pressable onPress={handleFormSubmit}>
        <Image style={styles.close} source={Images.closeIcon} />
      </Pressable>
      <Text
        aria-label="Label for From Date"
        nativeID="labelFromDate"
        style={styles.text}
      >
        From
      </Text>
      <TextInput
        style={styles.input}
        placeholder="From "
        value={fromDate}
        onChangeText={setFromDate}
      />
      <Text
        aria-label="Label for Untill Date"
        nativeID="labelToDate"
        style={styles.text}
      >
        Until
      </Text>
      <TextInput
        style={styles.input}
        placeholder="To Date"
        value={toDate}
        onChangeText={setToDate}
      />
      <Text
        aria-label="Label for Description"
        nativeID="labelDescription"
        style={styles.text}
      >
        Description
      </Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity
        onPress={handleFormSubmit}
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
