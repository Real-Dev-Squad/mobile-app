import React from 'react';
import {Modal, StyleSheet, View, Text} from 'react-native';

const ErrorScreen = ({error}: string) => {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    </Modal>
  );
};

export default ErrorScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    zIndex: 1,
  },
});
