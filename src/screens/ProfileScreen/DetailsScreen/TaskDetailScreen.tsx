import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const TaskDetailScreen = () => {
  const route = useRoute();

  const { taskId } = route.params;
  console.log('🚀 ~ TaskDetailScreen ~ taskId:', taskId);
  return (
    <View>
      <Text>TaskDetailScreen</Text>
    </View>
  );
};

export default TaskDetailScreen;

const styles = StyleSheet.create({});
