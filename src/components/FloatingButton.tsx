import { FloatingAction } from 'react-native-floating-action';
import { View } from 'react-native';
import React from 'react';
import FloatingActions from './FloatingActions';
import { styles } from '../styles/FloatingButtonStyle';

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