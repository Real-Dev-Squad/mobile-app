import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Button_ = ({
  title,
  submitHandler,
}: {
  title: string;
  submitHandler: () => void;
}) => {
  return (
    <TouchableOpacity onPress={submitHandler}>
      <Text style={styles.submitButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button_;

const styles = StyleSheet.create({
  submitButtonText: {
    color: 'black',
    fontWeight: 'bold',
    borderRadius: 2,
    borderWidth: 2,
    textAlign: 'center',
    borderColor: 'grey',
  },
});
