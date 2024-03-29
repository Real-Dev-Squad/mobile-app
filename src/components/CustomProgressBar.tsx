import React from 'react';
import { View, Text } from 'react-native';
import * as Progress from 'react-native-progress';

const CustomProgressBar = ({
  progress,
  color,
  width,
  height,
  text,
  borderRadius,
  handleAnimationComplete,
}) => {
  return (
    <View>
      <Text style={{ color: 'black', margin: 10 }}>{text}</Text>
      <Progress.Bar
        progress={progress}
        color={color}
        width={width}
        height={height}
        borderRadius={borderRadius}
        animationType={'spring'}
        onAnimationComplete={handleAnimationComplete}
      />
    </View>
  );
};

export default CustomProgressBar;
