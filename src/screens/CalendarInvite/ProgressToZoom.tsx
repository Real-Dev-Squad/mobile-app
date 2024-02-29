import {
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import Animated from 'react-native-reanimated';
import { Circle, Svg } from 'react-native-svg';
import Slider from '@react-native-community/slider';

const ProgressToZoom = ({
  progressVal,
  setProgressVal,
}: {
  progressVal: any;
  setProgressVal: (num: number) => void;
}) => {
  const progress = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    //TODO: on decreasing it sets value to 0
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newValue = Math.max(
          20,
          Math.min(progressVal + gestureState.dx, 100),
        );
        const roundedValue = Math.round(newValue / 10) * 10;
        setProgressVal(roundedValue);
        updateProgressValue(roundedValue);
        progress.setValue(roundedValue);
      },
    }),
  ).current;

  // useEffect(() => {
  //   Animated.timing(progress, {
  //     toValue: progressVal,
  //     duration: 300,
  //     useNativeDriver: false,
  //   }).start();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [progress, progressVal]);

  const updateProgressValue = (newVal: any) => {
    setProgressVal(newVal);
    console.log('successfully progress value increased ');
  };
  const handleIncrement = () => {
    const newValue = Math.min(progressVal + 10, 100);
    setProgressVal(newValue);
    updateProgressValue(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(progressVal - 10, 0);
    setProgressVal(newValue);
    updateProgressValue(newValue);
  };
  const handleIconMove = (event, panResponderMove) => {
    const gestureState = event.gestureState;

    const newValue = Math.max(20, Math.min(progressVal + gestureState.dx, 100));
    const roundedValue = Math.round(newValue / 10) * 10;
    setProgressVal(roundedValue);
    updateProgressValue(roundedValue);
    progress.setValue(roundedValue);
  };
  const handleValueChange = (value: number) => {
    const newVal = value + 10;
    setProgressVal((prev) => prev + 10);
    updateProgressValue(newVal);
  };

  return (
    <View style={styles.container}>
      {/* <Animated.View
        style={[
          styles.bar,
          {
            width: progressVal ? progressVal + '%' : 20 + '%',
            backgroundColor: 'blue',
          },
        ]}
        {...panResponder.panHandlers}
      >
        <Svg
          height="40"
          width="40"
          style={{ position: 'absolute', left: `${progressVal}%` }}
          onTouchMove={(event) =>
            handleIconMove(
              event.nativeEvent,
              panResponder.panHandlers.onPanResponderMove,
            )
          }
        >
          <Circle cx="20" cy="20" r="18" fill="green" />
        </Svg>
      </Animated.View> */}
      <Slider
        value={progressVal}
        onValueChange={handleValueChange}
        minimumValue={10}
        maximumValue={90}
        step={10}
      />
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {progressVal ? Math.round(progressVal) : 20}%
        </Text>
      </View>
      {/* <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default ProgressToZoom;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 80,
    backgroundColor: '#eee',
    borderRadius: 10,
    margin: 10,
    // padding: 10,
  },
  bar: {
    height: '30%',
    backgroundColor: '#3498db',
    borderRadius: 10,
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#2980b9',
    borderRadius: 5,
    // padding: 10,
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: '#2980b9',
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  cursor: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'red',
    position: 'absolute',
    top: '50%',
    marginLeft: -10,
  },
});
