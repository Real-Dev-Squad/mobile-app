import React from 'react';
import {GestureResponderEvent, Pressable, StyleSheet, Text} from 'react-native';

interface IButtonWidget {
  title: string;
  textColor?: string;
  bgColor?: string;
  fontSize?: number;
  onPress: (event: GestureResponderEvent) => void;
}

const ButtonWidget = ({
  title,
  onPress,
  textColor,
  bgColor,
  fontSize,
}: IButtonWidget) => {
  const btnStyle = [
    styles.button,
    {
      backgroundColor: bgColor ? bgColor : 'white',
    },
  ];

  return (
    <Pressable style={btnStyle} onPress={onPress}>
      <Text
        style={{
          color: textColor ? textColor : 'black',
          textAlign: 'center',
          fontSize: fontSize ? fontSize : 14,
        }}>
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    marginVertical: 4,
    borderColor: 'black',
    borderWidth: 0.5,
    padding: 10,
    elevation: 2,
    color: 'white',
    minWidth: '35%',
    maxWidth: '100%',
  },
});

export default ButtonWidget;
