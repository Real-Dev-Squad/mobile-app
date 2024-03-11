import React from 'react';
import { durations } from './dummy';
import Dropdown_ from '../../components/Dropdown_';

const Duration = ({
  duration,
  setDuration,
}: {
  duration: number;
  setDuration: (item: number) => void;
}) => {
  const handleDropDownPress = (item: number) => {
    setDuration(item);
  };
  return (
    <Dropdown_
      title={'Duration'}
      data={durations}
      value={duration}
      handleDropdownPress={handleDropDownPress}
    />
  );
};

export default Duration;
