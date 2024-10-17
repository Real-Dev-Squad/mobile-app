import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { styles } from './styles/TaskStatusDropdownStyle';

const data = [
  { label: ' Available', value: '1' },
  { label: 'Assigned', value: '2' },
  { label: 'In Progress', value: '3' },
  { label: 'Block', value: '4' },
  { label: 'Smock testimng', value: '5' },
  { label: 'compleated', value: '6' },
  { label: 'Needs Review', value: '7' },
  { label: 'In review', value: '8' },
];

const DropdownComponent = () => {
  const [value, setValue] = useState('');

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder="Select item"
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
    />
  );
};

export default DropdownComponent;