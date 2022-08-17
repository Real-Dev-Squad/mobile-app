import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import Searchbar from './SearchBar';
import Radio from './RadioGroup';

const local_data = [
  {
    value: 'short',
    lable: 'Short Term',
  },
  {
    value: 'long',
    lable: 'Long Term',
  },
];

export interface Props {}

const SelectCountryScreen: React.FC<Props> = () => {
  const [duration, setDuration] = useState('1');

  return (
    <View>
      <SelectCountry
        style={styles.dropdown}
        selectedTextStyle={styles.selectedTextStyle}
        placeholderStyle={styles.placeholderStyle}
        maxHeight={200}
        value={duration}
        data={local_data}
        valueField="value"
        labelField="lable"
        placeholder="Select Duration"
        onChange={(e) => {
          setDuration(e.value);
        }}
      />

      {duration === 'long' ? (
        <View testID="longTermRoadmap">
          <Text style={styles.formchild}>Roadmap Type</Text>
          <Radio />

          <Text style={styles.formchild}>Existing Roadmap</Text>
          <Searchbar />
        </View>
      ) : (
        <View testID = "shortTermInput">
          <Text style={styles.formchild}>Associated Long Term Goal</Text>
          <Searchbar />
        </View>
      )}
    </View>
  );
};

export default SelectCountryScreen;

const styles = StyleSheet.create({
  dropdown: {
    margin: 10,
    height: 30,
    width: 205,
    backgroundColor: '#ecf0f1',
    fontSize: 12,
    paddingHorizontal: 8,
    border: '1px solid black',
  },

  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 15,
    marginLeft: 8,
  },
  formchild: {
    marginTop: 5,
  },
});
