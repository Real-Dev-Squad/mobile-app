import React from 'react';
import { Modal, View, Text } from 'react-native';
import { styles } from '../styles/ErrorScreenStyle';

const ErrorScreen = ({ error }: string) => {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <Text>{error}</Text>
      </View>
    </Modal>
  );
};

export default ErrorScreen;