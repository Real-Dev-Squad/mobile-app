import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import RenderMemberItem from '../../components/ToDoComponent/RenderMemberItem';
import { useNavigation } from '@react-navigation/native';

const MembersPage = ({route}) => {
  const [membersData, setMembersData] = useState([]);
  const membersDataCopy = membersData
  const {selectedMember,setSelectedMember} = route.params;
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    callMembersApi();
  }, [selectedMember]);

  const callMembersApi = async () => {
    const members = await fetch('https://api.realdevsquad.com/members');
    const membersJsonData = await members.json();
    setMembersData(membersJsonData.members);
  };

  return (
    <View>
      <Text>{selectedMember}</Text>
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
