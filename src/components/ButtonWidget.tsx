import React from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
} from 'react-native';
import { styles } from '../styles/ButtonWidgetStyle';

interface IButtonWidget {
  icon?: ImageSourcePropType;
  title: string;
  textColor?: string;
  bgColor?: string;
  fontSize?: number;
  onPress: (event: GestureResponderEvent) => void;
}

const ButtonWidget = ({
  title,
  icon,
  onPress,
  textColor,
  bgColor,
  fontSize,
  style,
}: IButtonWidget) => {
  const btnStyle = [
    styles.button,
    {
      backgroundColor: bgColor ? bgColor : 'white',
      ...style,
    },
  ];

  return (
    <Pressable style={icon ? styles.iconStyle : btnStyle} onPress={onPress}>
      {icon ? (
        <Image style={styles.imageStyle} source={icon} />
      ) : (
        <Text
          style={{
            color: textColor ? textColor : 'black',
            textAlign: 'center',
            fontSize: fontSize ? fontSize : 14,
          }}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};

export default ButtonWidget;
