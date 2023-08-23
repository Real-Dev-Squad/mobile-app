import { StyleSheet, TextInput, View, Button } from 'react-native';
import React from 'react';
import { OOOFormType } from './OOOFormType';

const OOOForm = ({
  fromDate,
  toDate,
  description,
  setToDate,
  setFromDate,
  setDescription,
  handleFormSubmit,
}: OOOFormType) => {
  return (
    <View style={styles.formContainer}>
     <TextInput
        style={styles.input}
        placeholder="From Date"
        value={fromDate}
        onChangeText={setFromDate}
      />
      <TextInput
        style={styles.input}
        placeholder="To Date"
        value={toDate}
        onChangeText={setToDate}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <Button title="Submit" onPress={handleFormSubmit} />
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
    paddingHorizontal: 10,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top', // To start text from the top in multiline input
  },
});
