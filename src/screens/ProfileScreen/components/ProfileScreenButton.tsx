import React from 'react';
import {GestureResponderEvent, Pressable, Text} from 'react-native';
import {profileScreenStyles} from '../styles';

interface IButton {
  title: string;
  textColor: string;
  bgColor: string;
  onPress: (event: GestureResponderEvent) => void;
}

const ProfileScreenButton = ({
  title,
  onPress,
  textColor = 'black',
  bgColor = 'white',
}: IButton) => {
  const btnStyle = [
    profileScreenStyles.button,
    {
      color: textColor,
      backgroundColor: bgColor,
    },
  ];

  return (
    <Pressable style={btnStyle} onPress={onPress}>
      <Text style={profileScreenStyles.textStyle}>{title}</Text>
    </Pressable>
  );
};

export default ProfileScreenButton;
