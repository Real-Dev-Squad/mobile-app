import React from 'react';

import { ScrollView } from 'react-native';

import withHeader from '../../helpers/withHeader';
import TodoComponent from '../../components/ToDoComponent/TodoComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatingGoals from '../../components/ToDoComponent/SettingGoals/CreateGoals';
import MembersPage from '../MemberScreen/MembersPage';

const Stack = createNativeStackNavigator();
const GoalScreen = () => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
      <TodoComponent />
      {/* TODO: moving to v2
      <ShortGoalsComponent />
      <LongGoalsComponent /> */}
    </ScrollView>
  );
};

function GoalsScreenStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GoalsScreen" component={GoalScreen} />
      <Stack.Screen name="CreatingGoals" component={CreatingGoals} />
      <Stack.Screen name="Member's page" component={MembersPage} />
    </Stack.Navigator>
  );
}

export default withHeader(GoalsScreenStack);
