import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RenderMemberItem from '../../components/ToDoComponent/RenderMemberItem';

const MembersPage = () => {
  const [membersData, setMembersData] = useState([]);
  const [selectedMember, setSelectedMember] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    callMembersApi();
  }, []);

  const callMembersApi = async () => {
    const members = await fetch('https://api.realdevsquad.com/members');
    const membersJsonData = await members.json();
    console.log('members response', membersJsonData.members);
    setMembersData(membersJsonData.members);
  };

  return (
    <View>
      <Text>MembersPage</Text>
      <SearchBar setSearchValue = {setSearchValue} searchValue={searchValue} membersData={membersData} setMembersData={setMembersData} />
      <FlatList
        data={membersData}
        renderItem={({ item }) => <RenderMemberItem item = {item} setSelectedMember={setSelectedMember} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default MembersPage;

const styles = StyleSheet.create({});
