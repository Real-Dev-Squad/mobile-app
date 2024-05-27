import {FloatingAction} from 'react-native-floating-action';
import {View, StyleSheet} from 'react-native';
import React from 'react';
import FloatingActions from './FloatingActions';

export default function FloatingButton() {
  return (
    <View testID="floatingButton" style={styles.float}>
      <FloatingAction
        actions={FloatingActions}
        color="#492ed1"
        position="right"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  float: {
    marginTop: '120%',
  },
});
