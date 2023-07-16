import React, { ReactElement } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Avatar from './Avatar';

const AvatarWithBadge = ({
  uri,
  size,
  onPress,
}: {
  uri: string;
  size: number;
  icon: () => ReactElement;
  onPress: () => void;
}) => {
  const ICON_SIZE = size / 2.5;
  return (
    <View key={uri} style={styles.container}>
      <Image
        resizeMode="cover"
        resizeMethod="scale"
        style={{ width: size, height: size, borderRadius: size }}
        source={{ uri: uri }}
      />
      <TouchableOpacity
        onPress={onPress}
        style={{
          borderRadius: ICON_SIZE,
          position: 'absolute',
          top: ICON_SIZE * 1.5,
          left: ICON_SIZE * 1.5,
        }}
      >
        <Avatar uri={'https://picsum.photos/id/237/200/300'} size={ICON_SIZE} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', position: 'relative' },
});

export default AvatarWithBadge;
