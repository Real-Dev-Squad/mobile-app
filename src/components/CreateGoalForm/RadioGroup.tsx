import React, {useState} from 'react';
import RadioGroup from 'react-native-radio-buttons-group';
import {Text, View, StyleSheet} from 'react-native';

const radioButtonsData = [
  {
    id: '1',
    label: 'Existing',
    value: 'existing',
  },
  {
    id: '2',
    label: 'Custom',
    value: 'custom',
  },
];

export default function RadioGroupComponent() {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  function onPressRadioButton(radioButtonsArray) {
    setRadioButtons(radioButtonsArray);
  }

  return (
    <View>
      <Text style={styles.header}>
        Create your own roadmap or select from existing roadmaps
      </Text>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={onPressRadioButton}
        layout="row"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 8,
    margin: 4,
    fontWeight: 'bold',
  },
});
