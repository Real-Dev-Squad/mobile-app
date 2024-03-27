import { useEffect, useState } from 'react';
import { getProgressVal, postToRDB } from '../utils/Api';
import { Alert } from 'react-native';

export const useProgressVal = () => {
  const [progressVal, setProgressVal] = useState<number>(20);

  useEffect(() => {
    fetchProgressVal();
  }, []);

  const fetchProgressVal = () => {
    try {
      getProgressVal(setProgressVal);
    } catch (error) {
      console.error('Error fetching progress value:', error);
    }
  };

  const handleValueChange = (value: number) => {
    const newVal = value + 10;
    if (newVal > 100) {
      Alert.alert('you can only set to 100 %');
    } else {
      postToRDB(newVal);
      setProgressVal(newVal);
    }
  };

  return { progressVal, handleValueChange };
};
