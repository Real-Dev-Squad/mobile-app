import React, { useEffect, useRef } from 'react';
import { Animated, Easing, Text, View } from 'react-native';
import { ProgressBarStyles } from './ProgressBarStyle';

export type ProgressBarProps = {
  progress: number;
};

const ProgressBarInternal = (props: ProgressBarProps) => {
  const translateX = useRef(new Animated.Value(0));
  const styles = ProgressBarStyles;

  useEffect(() => {
    Animated.timing(translateX.current, {
      toValue: props.progress / 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View testID={'progress_bar'} style={styles.innerContainer}>
        <Animated.View
          style={[
            styles.bar,
            {
              width: translateX.current.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
        {<Text>{props.progress + '%'}</Text>}
      </View>
    </View>
  );
};

export default ProgressBarInternal;
