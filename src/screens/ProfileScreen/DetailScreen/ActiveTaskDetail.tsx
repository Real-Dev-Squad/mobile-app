import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const ActiveTaskDetail = () => {
  return (
    <View>
      <Text>Active TASk</Text>
      {/* <Text>{task.title}</Text>
      <Text>{task.purpose}</Text> */}
      <TextInput
        // style={styles.inputStyle}
        maxLength={50}
        // value={task}
        // onChangeText={setTitleText}
        placeholder="TAskTitleDetail"
      />

      <TextInput
        style={styles.inputStyle}
        maxLength={50}
        // value={titleText}
        // onChangeText={setTitleText}
        placeholder="Update Dropdown"
      />
      <TouchableOpacity>
        <TextInput placeholder="Extension request" />
      </TouchableOpacity>
    </View>
  );
};
export default ActiveTaskDetail;

const styles = StyleSheet.create({
  inputStyle: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    textShadowColor: 'Black',
    color: 'Black',
  },
});
