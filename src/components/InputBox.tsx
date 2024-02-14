import { StyleSheet } from 'react-native';
import React from 'react';
import { InputBoxProps } from '../context/type';
import { TextInput } from 'react-native-paper';
import Colors from '../constants/colors/Colors';

const InputBox = ({ label, title, onChangeHandler }: InputBoxProps) => {
  return (
    <TextInput
      label={label}
      value={title}
      onChangeText={onChangeHandler}
      style={styles.input}
      // theme={color: }
    />
  );
};

export default InputBox;

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
  },
});
