import { View, StyleSheet, TextInput } from 'react-native';
import React from 'react';

type SearchBarProps = {
  setSearchValue: (text: string) => void;
  searchValue: string;
  membersData: MembersDataProps[];
  setMembersData: ([]) => void;
};

type MembersDataProps = {
  github_display_name: string;
};

const SearchBar = ({
  setSearchValue,
  searchValue,
  membersData,
  setMembersData,
}: SearchBarProps) => {
  const searchFunction = (text: string) => {
    setSearchValue(text);
    const updatedData = text
      ? membersData?.filter((member) =>
          member?.github_display_name
            ?.toLowerCase()
            .includes(text.toLowerCase()),
        )
      : membersData;
      setMembersData(updatedData)
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.formField}
        placeholderTextColor={'#888888'}
        value={searchValue}
        onChangeText={searchFunction}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
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
