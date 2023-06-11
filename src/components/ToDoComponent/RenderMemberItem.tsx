import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';

const RenderMemberItem = ({ item,setSelectedMember }) => {
    const {github_display_name} = item

    const handleSelectMember = (name:any) => {
        setSelectedMember(name);
    }

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
