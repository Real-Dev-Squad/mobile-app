import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  PanResponder,
  TouchableOpacity,
} from 'react-native';

function ProgressBar() {
  const [progressValue, setProgressValue] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        const newValue = Math.max(
          0,
          Math.min(progressValue + gestureState.dx, 100),
        );
        setProgressValue(newValue);
        progress.setValue(newValue);
      },
    }),
  ).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: progressValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress, progressValue]);

  const handleIncrement = () => {
    const newValue = Math.min(progressValue + 10, 100);
    setProgressValue(newValue);
  };

  const handleDecrement = () => {
    const newValue = Math.max(progressValue - 10, 0);
    setProgressValue(newValue);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.bar, { width: progressValue + '%' }]}
        {...panResponder.panHandlers}
      />
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>{progressValue}%</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleIncrement}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleDecrement}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  },
  bar: {
    height: '50%',
    backgroundColor: '#3498db',
    borderRadius: 10,
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  progressText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#2980b9',
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#2980b9',
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default ProgressBar;
