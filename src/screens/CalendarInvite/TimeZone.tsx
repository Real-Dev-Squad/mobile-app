import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as RNLocalize from 'react-native-localize';
const gmtTime = new Date().toLocaleString('en-US', { timeZone: 'GMT' });
console.log('GMT Time:', gmtTime);

// Get current time in IST
const istTime_ = new Date().toLocaleString('en-US', {
  timeZone: 'Asia/Kolkata',
});
//absolute / relative / fixed /sticky

//sticky => relative (intially relative but fir top agr mention hoga to us particular position me jate he fix banega)

// absolute / relative => relative -> parent k acc ---> absolution -> window size k acc
// relative and then child is absolute ----> parent k acc
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

const styles = StyleSheet.create({});
