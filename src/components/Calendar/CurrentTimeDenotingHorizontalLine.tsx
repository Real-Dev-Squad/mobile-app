import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {
  calculateCurrentTimePosition,
  formatDate,
} from '../../helpers/SiteUtils';

const CurrentTimeDenotingHorizontalLine = ({
  progressVal,
  multiplier,
}: {
  progressVal: number;
  multiplier: number;
}) => {
  useEffect(() => {
    const intervalId = setInterval(() => {
      calculateCurrentTimePosition(progressVal, multiplier);
    }, 60000); // Update every 60 seconds
    return () => clearInterval(intervalId);
  }, []);

  return (
    <View
      style={{
        position: 'absolute',
        top: calculateCurrentTimePosition(progressVal, multiplier),
        width: '100%',
        height: 2,
        backgroundColor: 'red',
      }}
    />
  );
};

export default CurrentTimeDenotingHorizontalLine;
