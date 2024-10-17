import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NotifyType } from './NotifyType';
import { styles } from './NotifyButtonStyle';

const NotifyButton = ({
  onPress,
  title,
  buttonStyle,
  textStyle,
}: NotifyType) => {
  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default NotifyButton;
