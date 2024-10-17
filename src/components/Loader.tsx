import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/LoaderStyle';

function Loader() {
  // TODO: revert once UI gets fix
  return (
    <View style={styles.loadingContainer}>
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  );
}

export default Loader;