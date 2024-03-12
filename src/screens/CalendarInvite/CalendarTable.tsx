import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Time_Slots } from '../../helpers/SiteUtils';

const CalendarTable = ({ users }) => {
  const transformData = () => {
    const arr = [];
    const sortedArr = users.sort((a, b) => a.startTime - b.startTime);
    // ev = endTime <
    for (let i = 0; i < sortedArr.length; i++) {
      sortedArr.map((item, index) => {
        if (index !== sortedArr.length - 1) {
          if (item.endTime < sortedArr[index + 1].startTime) {
          }
        }
      });
    }
  };

  return (
    <View>
      {Time_Slots.map((item) => (
        <Text>{item}</Text>
      ))}
      {transformData()}
    </View>
  );
};

export default CalendarTable;

const styles = StyleSheet.create({});
