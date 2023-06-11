import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';


const SearchBar = ({setSearchValue,searchValue,membersData,setMembersData}) => {

 const searchFunction = (text) => {
    const updatedData = membersData?.filter((item) => {
        console.log('inside search func',item.github_display_name)
      const item_data = `${item?.github_display_name?.toUpperCase()}`;
      console.log('item_data',item_data)
      const text_data = text?.toUpperCase();
      return item_data.indexOf(text_data) > -1;
    });
    setMembersData(updatedData)
    setSearchValue(text)
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.formField}
        placeholderTextColor={'#888888'}
        value={searchValue}
        onChangeText={(text) => searchFunction(text)}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 30,
    width: 350,
    left: 20,
    zIndex: 99,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50,
    borderRadius: 20,
  },
});
