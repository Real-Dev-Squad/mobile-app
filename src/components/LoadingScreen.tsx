import React from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { styles } from '../styles/LoadingScreenStyle';

function LoadingScreen() {
  return (
    <Modal transparent={true}>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    </Modal>
  );
}

export default LoadingScreen;

