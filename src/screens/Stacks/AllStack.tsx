import { createNativeStackNavigator } from '@react-navigation/native-stack';
import All from '../ProfileScreen/UserDataV2/All';
import AllTaskDetailScreen from '../ProfileScreen/DetailsScreen/AllTaskDetailScreen';
import React from 'react';
import ProfileScreen2 from '../ProfileScreen/ProfileScreen2';
const Stack = createNativeStackNavigator();

export function AllTaskScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfileScreen2} />
      <Stack.Screen name="AllTaskDetail" component={AllTaskDetailScreen} />
    </Stack.Navigator>
  );
}
