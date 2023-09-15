import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';

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
          <Image
            style={styles.ImageDimensions}
            source={require('../../../../../assets/down.png')}
          />
        ) : (
          <Image
            style={styles.ImageDimensions}
            source={require('../../../../../assets/right.png')}
          />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  DropDownButton: {
    width: '100%',
    height: 80,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingLeft: 35,
  },
  DropDownTitle: {
    fontWeight: '600',
    fontSize: 20,
    flex:1,
    color: 'black',
  },
  DropDownElement: {
    color: 'black',
    width: '100%',
    alignSelf: 'center',
    height: 50,
    borderBottomWidth: 0.5,
  },
  ImageDimensions: {
    height: 100,
    width: 100,
  },
});

export default ActiveTaskDropDown;
