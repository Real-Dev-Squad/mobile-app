import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Images from '../constants/images/Image';

const Avatar = ({ uri, size }: { uri: string; size: number }) => {
  const uriToPass = uri ? uri : Images.DEFAULT_IMAGE;
  return (
    <View key={uriToPass} style={styles.container}>
      <Image
        resizeMode="cover"
        resizeMethod="scale"
        style={{ width: size, height: size, borderRadius: size }}
        source={{ uri: uriToPass }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default Avatar;
