import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllTaskDetailScreen from '../ProfileScreen/DetailsScreen/AllTaskDetailScreen';
import React from 'react';
import ProfileScreen2 from '../ProfileScreen/ProfileScreen2';
import AllTaskDetailProgessScreen from '../ProfileScreen/DetailsScreen/AllTaskDetailProgressScreen';
const Stack = createNativeStackNavigator();

export function AllTaskScreenStack() {
  return (
    <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Profile" component={ProfileScreen2} />
    <Stack.Screen
        name="AllTaskDetail"
        component={AllTaskDetailScreen}
        initialParams={{ taskId: '' }}
      />
      <Stack.Screen
        name="AllTaskDetailProgress"
        component={AllTaskDetailProgessScreen}
        initialParams={{ taskId: '' }}
      />
    </Stack.Navigator>
  );
}
