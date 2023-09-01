import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

const ActiveTaskDropDown = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <View style={{ padding: 5 }}>
      <TouchableOpacity
        onPress={() => setClicked(!clicked)}
        style={styles.DropDownButton}
      >
        <Text style={styles.DropDownTitle}>Active tasks</Text>
        {clicked ? (
          // <Text style={{ color: 'black', fontSize: 50, paddingLeft: 20 }}>
          //   -
          // </Text>
          <Image
            style={{ height: 100, width: 100 }}
            source={require('../../../../../assets/down.png')}
          />
        ) : (
          // <Text style={{ color: 'black', fontSize: 50, paddingLeft: 20 }}>
          //   +
          // </Text>
          <Image
            style={{ height: 100, width: 100 }}
            source={require('../../../../../assets/right.png')}
          />
        )}
      </TouchableOpacity>
      {/* {clicked ? (
        <View>
          <Text>Hi Active Tasks here!</Text>
        </View>
      ) : null} */}
    </View>
  );
};

const styles = StyleSheet.create({
  DropDownButton: {
    width: '100%',
    height: 100,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    // margin: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 35,
    // paddingRight: 25,
  },
  DropDownTitle: {
    fontWeight: '600',
    fontSize: 30,
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
