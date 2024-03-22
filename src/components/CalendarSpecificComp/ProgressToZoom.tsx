import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Slider from '@react-native-community/slider';
import { windowWidth } from '../../helpers/CalendarInviteHelpers';
import { useProgressVal } from '../../hooks/useProgressVal';

const ProgressToZoom = () => {
  const { progressVal, handleValueChange } = useProgressVal();

  return (
    <View style={styles.container}>
      <Slider
        value={progressVal}
        onValueChange={(value) => handleValueChange(value)}
        minimumValue={10}
        maximumValue={90}
        step={10}
        style={{ width: windowWidth - 60 }}
        minimumTrackTintColor="black"
        maximumTrackTintColor="#777777"
        thumbTintColor="black"
      />
      <Text style={styles.progressText}>{progressVal ? progressVal : 20}%</Text>
    </View>
  );
};

export default ProgressToZoom;

const styles = StyleSheet.create({
  container: {
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    margin: 10,
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
});
