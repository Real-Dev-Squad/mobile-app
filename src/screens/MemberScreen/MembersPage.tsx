import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar';
import RenderMemberItem from '../../components/ToDoComponent/RenderMemberItem';
import { RouteProp } from '@react-navigation/native';
import GoalsApi from '../../constants/apiConstant/GoalsApi';
import Toast from 'react-native-toast-message';
import { RootStackParamList } from '../GoalScreen/GoalScreen';

type MembersPageRouteProp = RouteProp<RootStackParamList, 'MembersPage'>;

const MembersPage = (props: MembersPageRouteProp) => {
  const [membersData, setMembersData] = useState([]);
  const [filterMemberData, setFilterMemberData] = useState([]);
  const { selectedMember, setSelectedMember } = props.params;
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    callMembersApi();
  }, [selectedMember]);

  const callMembersApi = async () => {
    try {
      // Set loading state
      setLoading(true);

      const members = await fetch(GoalsApi.MembersApi);
      const membersJsonData = await members.json();

      // Set members data and clear loading and error states
      setMembersData(membersJsonData.members);
      setFilterMemberData(membersJsonData.members);
      setLoading(false);
    } catch (_) {
      // Set error state and clear loading state
      Toast.show({
        type: 'error',
        text1: 'Error fetching members data.',
        position: 'bottom',
        bottomOffset: 80,
      });
      setLoading(false);
    }
  };

  const renderLoader = () => {
    return loading ? (
      <View style={styles.loaderView}>
        <ActivityIndicator size="large" />
      </View>
    ) : null;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Real Dev Squad Member's</Text>
      <SearchBar
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        membersData={filterMemberData}
        setMembersData={() => setMembersData}
      />
      <FlatList
        data={membersData}
        renderItem={({ item }) => (
          <RenderMemberItem
            item={item}
            setSelectedMember={() => setSelectedMember}
          />
        )}
        keyExtractor={(item) => item.id}
        ListFooterComponent={renderLoader}
      />
    </View>
  );
};

export default MembersPage;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 4, backgroundColor: '#F5F5F5' },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'blue',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    textAlign: 'center',
    margin: 2,
  },
  loaderView: { alignItems: 'center', paddingVertical: 20 },
});
