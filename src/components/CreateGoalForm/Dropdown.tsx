import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SelectCountry } from 'react-native-element-dropdown';
import Searchbar from './SearchBar';
import Radio from './RadioGroup';
import { styles } from './DropdownStyle';

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

const SelectCountryScreen: React.FC<Props> = (_props) => {
  const [duration, setDuration] = useState<string>('1');

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
        testID="roadmapType"
        onChange={(e) => {
          setDuration(e.value);
        }}
      />

      {duration === 'long' ? (
        <View testID="longTermRoadmap">
          <View>
            <Text style={styles.formchild}>Roadmap Type</Text>
            <Radio />

            <Text style={styles.formchild}>Existing Roadmap</Text>
            <Searchbar />
          </View>
        </View>
      ) : (
        <View testID="shortTermInput">
          <View>
            <Text style={styles.formchild}>Associated Long Term Goal</Text>
            <Searchbar />
          </View>
        </View>
      )}
    </View>
  );
};

export default SelectCountryScreen;