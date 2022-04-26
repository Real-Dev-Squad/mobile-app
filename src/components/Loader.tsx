import React from 'react';
import {StyleSheet} from 'react-native';
import {View, ActivityIndicator} from 'react-native';

//change the color of the loader according to your choice
const colorString = '#E30062';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={50} color={colorString} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    zIndex: 50,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
});
