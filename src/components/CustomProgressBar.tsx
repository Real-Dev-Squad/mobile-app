import React from 'react';
import { StyleSheet } from 'react-native';
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
      <Text style={styles.text}>{text}</Text>
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

const styles = StyleSheet.create({
  text:{
    color: 'black', 
    margin: 10
  }
})

export default CustomProgressBar;
