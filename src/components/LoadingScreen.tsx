import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

function LoadingScreen() {
  return (
    <>
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    </>
  );
}

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});
