import React from 'react';
import {View, Image} from 'react-native';

const Avatar = ({uri, size}: {uri: string; size: number}) => {
  return (
    <View key={uri} style={{alignItems: 'center'}}>
      <Image
        resizeMode="cover"
        resizeMethod="scale"
        style={{width: size, height: size, borderRadius: size}}
        source={{uri: uri}}
      />
    </View>
  );
};

export default Avatar;
