import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const LayoutHeader = () => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => {}}>
        <Text>Date: {Date.now()}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LayoutHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'blue',
    width: '100%',
    height: 40,
    borderRadius: 2,
  },
});
