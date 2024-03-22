import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
const Checkbox = ({ onHandleChange }: { onHandleChange: () => void }) => {
  return (
    <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <BouncyCheckbox
          fillColor="#3994f8"
          unfillColor="#FFFFFF"
          onPress={onHandleChange}
          iconStyle={{ borderColor: 'black' }}
          innerIconStyle={{ borderWidth: 2 }}
          style={styles.checkbox}
        />
        <Text style={styles.label}>Multi-mode</Text>
      </View>
    </View>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
  },
  checkbox: {
    // alignSelf: 'center',
  },
  label: {
    // margin: 8,
    color: 'black',
  },
});
