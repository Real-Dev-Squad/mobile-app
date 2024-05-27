import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ProfileScreen2 from '../ProfileScreen/ProfileScreen2';
import TaskDetailScreen from '../ProfileScreen/DetailsScreen/TaskDetailScreen';
import ProgressDetailScreen from '../ProfileScreen/DetailsScreen/ProgressDetailScreen';
const Stack = createNativeStackNavigator();

export function AllTaskScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Profile" component={ProfileScreen2} />
      <Stack.Screen name="TaskDetail" component={TaskDetailScreen} />
      <Stack.Screen name="ProgressDetail" component={ProgressDetailScreen} />
    </Stack.Navigator>
  );
}
