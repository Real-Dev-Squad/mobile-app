import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';

const ActiveTaskDropDown = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <View>
      <TouchableOpacity
        onPress={() => setClicked(!clicked)}
        style={styles.DropDownButton}
      >
        <Text style={styles.DropDownTitle}>Active tasks</Text>
      </TouchableOpacity>
      {clicked ? (
        <View>
          <Text>Hi Active Tasks here!</Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  DropDownButton: {
    width: 400,
    height: 50,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 25,
  },
  DropDownTitle: {
    fontWeight: '600',
    color: 'black',
  },
  DropDownElement: {
    color: 'black',
    width: '100%',
    alignSelf: 'center',
    height: 50,
    borderBottomWidth: 0.5,
  },
});

export default ActiveTaskDropDown;
