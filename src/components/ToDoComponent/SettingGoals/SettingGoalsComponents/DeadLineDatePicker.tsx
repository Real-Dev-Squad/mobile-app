import React, { useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker';

const DeadLineDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <ScrollView>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => setOpen(true)}
      >
        <Text style={styles.buttonTextStyle}>Pick date</Text>
      </TouchableOpacity>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={() => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    width: '100%',
    height: 50,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonTextStyle: {
    fontWeight: '600',
    color: 'black',
    justifyContent: 'center',
  },
});

export default DeadLineDatePicker;
