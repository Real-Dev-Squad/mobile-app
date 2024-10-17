import { View, TextInput } from 'react-native';
import React from 'react';
import { styles } from '../styles/SearchBarStyle';

type SearchBarProps = {
  setSearchValue: (text: string) => void;
  searchValue: string;
  membersData: DisplayNameTypeProps[];
  setMembersData: ([]) => void;
};

type DisplayNameTypeProps = {
  github_display_name?: string;
  first_name?: string | undefined;
  last_name?: string | undefined;
  username?: string;
  github_id?: string;
};

const SearchBar = ({
  setSearchValue,
  searchValue,
  membersData,
  setMembersData,
}: SearchBarProps) => {
  const searchFunction = (text: string) => {
    setSearchValue(text);
    console.log('1', text);

    const updatedData = text
      ? membersData?.filter((member) => {
          const {
            github_display_name,
            first_name,
            last_name,
            username,
            github_id,
          } = member;
          const assignedTo =
            username ??
            github_display_name ??
            github_id ??
            first_name + last_name;
          return assignedTo?.toLowerCase().includes(text.toLowerCase());
        })
      : membersData;
    setMembersData(updatedData);
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