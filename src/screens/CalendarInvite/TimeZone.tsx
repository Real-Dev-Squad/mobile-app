import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as RNLocalize from 'react-native-localize';
const gmtTime = new Date().toLocaleString('en-US', { timeZone: 'GMT' });
console.log('GMT Time:', gmtTime);

// Get current time in IST
const istTime_ = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Kolkata',
});

const TimeZone = () => {
  return (
    <View style={{}}>
      <Text style={{ color: 'blue' }}>
        TimeZone:
        <Text style={{ color: 'black' }}>
          {RNLocalize.getTimeZone()} GMT
          {` `}
          {-(new Date().getTimezoneOffset() / 60)} hrs
        </Text>
      </Text>
    </View>
  );
};

export default TimeZone;

const styles = StyleSheet.create({});
