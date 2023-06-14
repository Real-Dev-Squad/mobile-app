import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

type RenderMemberItemProps = {
 item:githubDisplayNameType;
 setSelectedMember:()=>void;
}
type githubDisplayNameType ={
  github_display_name?:string;
}
const RenderMemberItem = ({ item, setSelectedMember }:RenderMemberItemProps) => {
  const navigation = useNavigation();
  const { github_display_name } = item;

  const handleSelectMember = (name: string) => {
    setSelectedMember(name);
    navigation.navigate('CreatingGoals');
  };

  return (
    <TouchableOpacity onPress={() => handleSelectMember(github_display_name)}>
      <View style={{ marginTop: 20, elevation: 5 }}>
        <Text>{github_display_name}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default RenderMemberItem;

const styles = StyleSheet.create({});
