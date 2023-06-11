import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import RenderMemberItem from '../../components/ToDoComponent/RenderMemberItem';

const MembersPage = () => {
  const [membersData, setMembersData] = useState([]);
  const membersDataCopy = membersData
  const [selectedMember, setSelectedMember] = useState('')
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    callMembersApi();
  }, []);

  const callMembersApi = async () => {
    const members = await fetch('https://api.realdevsquad.com/members');
    const membersJsonData = await members.json();
    setMembersData(membersJsonData.members);
  };

  return (
    <View>
      <Text>MembersPage</Text>
      <SearchBar setSearchValue = {setSearchValue} searchValue={searchValue} membersData={membersDataCopy} setMembersData={setMembersData} />
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
