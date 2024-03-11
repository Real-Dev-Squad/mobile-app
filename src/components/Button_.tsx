import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { scale } from '../utils/utils';

const Button_ = ({
  title,
  submitHandler,
  disabled,
}: {
  title: string;
  submitHandler: () => void;
  disabled: boolean;
}) => {
  return (
    <TouchableOpacity
      style={[styles.createButtonStyle, disabled && styles.disabledButtonStyle]}
      onPress={!disabled ? submitHandler : undefined}
      disabled={disabled} // Add disabled prop for TouchableOpacity
    >
      <Text style={styles.submitButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button_;

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 2,
    // borderWidth: 2,
    textAlign: 'center',
    // borderColor: 'grey',
  },
  createButtonStyle: {
    padding: scale(14),
    marginTop: scale(25),
    borderRadius: 10,
    backgroundColor: '#2827CC',
  },
  disabledButtonStyle: {
    backgroundColor: 'gray', // Change the background color for disabled state
    opacity: 0.7, // Adjust the opacity for disabled state
  },
});
