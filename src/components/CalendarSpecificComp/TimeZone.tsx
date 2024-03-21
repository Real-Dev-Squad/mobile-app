import React from 'react';
import { Text, View } from 'react-native';
import * as RNLocalize from 'react-native-localize';

const TimeZone = () => {
  return (
    <View style={{ padding: 10 }}>
      <Text style={{ color: 'blue' }}>
        TimeZone:
        <Text style={{ color: 'black' }}>
          {` `}
          {RNLocalize.getTimeZone()} GMT
          {` `}
          {-(new Date().getTimezoneOffset() / 60)} hrs
        </Text>
      </Text>
    </View>
  );
};

export default TimeZone;
