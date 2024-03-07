import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  calculateCurrentTimePosition,
  formatDate,
} from '../../helpers/SiteUtils';

const CurrentTimeDenotingHorizontalLine = () => {
  const [progressVal, setProgressVal] = useState(20);
  const [currentTime, setCurrentTime] = useState(
    calculateCurrentTimePosition(progressVal),
  );
  useEffect(() => {
    console.log(1111111111111);
    const intervalId = setInterval(() => {
      // Increment the progress value or reset it based on your logic
      console.log(
        'calculateCurrentTimePosition(progressVal)',
        calculateCurrentTimePosition(progressVal),
      );

      setCurrentTime(calculateCurrentTimePosition(progressVal));
      // calculateCurrentTimePosition(progressVal);
    }, 60000); // Update every 60 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        top: currentTime,
        width: '100%',
        height: 2,
        backgroundColor: 'red',
      }}
    />
  );
};

export default CurrentTimeDenotingHorizontalLine;
