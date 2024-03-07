import {
  Alert,
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
import { screenWidth } from '../../helpers/SiteUtils';
import Images from '../../constants/images/Image';
import { postToRDB } from './dummy';
import { firebase } from '@react-native-firebase/database';
import Button_ from '../../components/Button_';

const ProgressToZoom = ({
  progressVal,
  setProgressVal,
}: {
  progressVal: any;
  setProgressVal: (num: number) => void;
}) => {
  const updateProgressValue = (newVal: any) => {
    setProgressVal(newVal);
    console.log('successfully progress value increased ');
  };

  const handleValueChange = (value: number) => {
    const newVal = value + 10;
    if (newVal > 100) {
      Alert.alert('you can only set to 100 %');
    } else {
      postToRDB(newVal);
      updateProgressValue(newVal);
    }
  };

  return (
    <View style={styles.container}>
      <Slider
        value={progressVal}
        onValueChange={handleValueChange}
        minimumValue={10}
        maximumValue={90}
        step={10}
        style={{ width: screenWidth - 60 }}
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
    // flex: 1,
    height: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
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
    // backgroundColor: 'orange',
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
});
