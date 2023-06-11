import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';

type SearchBarProps = {
    setSearchValue: (text:string) => void;
    searchValue: string;
    membersData:MembersDataProps [];
    setMembersData: ([]) => void;
}

type MembersDataProps = {
    github_display_name: string;
}


const SearchBar = ({setSearchValue,searchValue,membersData,setMembersData}:SearchBarProps) => {

 const searchFunction = (text:string) => {
    const updatedData = membersData?.filter((item) => {
      const item_data = `${item.github_display_name.toUpperCase()}`;
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
