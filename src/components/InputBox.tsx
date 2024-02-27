import { StyleSheet, Text, TextInput } from 'react-native';
import React from 'react';
import { InputBoxProps } from '../context/type';
import { scale } from '../utils/utils';
import StyleConfig from '../utils/StyleConfig';

const InputBox = ({
  label,
  title,
  onChangeHandler,
  error,
  disabled,
}: InputBoxProps) => {
  return (
    <>
      {error ? (
        <Text style={[styles.titles, { color: 'red' }]}>{error}</Text>
      ) : (
        <Text style={styles.titles}>{label}</Text>
      )}
      <TextInput
        editable={disabled}
        style={styles.inputStyle}
        maxLength={50}
        placeholder={label}
        value={title}
        onChangeText={onChangeHandler}
        placeholderTextColor={StyleConfig.colors.placeholderText}
      />
    </>
  );
};

export default InputBox;

const styles = StyleSheet.create({
  inputStyle: {
    padding: scale(10),
    borderRadius: 8,
    backgroundColor: StyleConfig.colors.whiteInput,
    fontSize: scale(12),
    borderWidth: 0.5,
    color: StyleConfig.colors.darkGrey,
  },
  titles: {
    fontSize: scale(12),
    marginBottom: scale(4),
    marginTop: scale(20),
    color: StyleConfig.colors.greyLabel,
  },
  input: {
    marginBottom: 12,
  },
});
