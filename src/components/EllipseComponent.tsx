import { Text, View } from 'react-native';
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { styles } from '../styles/EllipseComponentStyle';

const EllipseComponent = ({
  handleLogout,
  handleDropDown,
}: {
  handleLogout: () => void;
  handleDropDown: () => void;
}) => {
  const dispatch = useDispatch();
  const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);
  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity onPress={handleLogout}>
        <Text style={styles.dropdownOption}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          isProdEnvironment
            ? dispatch({ type: 'DEV' })
            : dispatch({ type: 'PROD' });
          handleDropDown();
        }}
      >
        <Text style={[styles.dropdownOption, { color: 'black' }]}>
          {!isProdEnvironment ? 'Prod mode' : 'Dev mode'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EllipseComponent;
