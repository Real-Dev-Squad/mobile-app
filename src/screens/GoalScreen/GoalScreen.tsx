import React from 'react';

import { ScrollView } from 'react-native';

import withHeader from '../../helpers/withHeader';
import TodoComponent from '../../components/ToDoComponent/TodoComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatingGoals from '../../components/ToDoComponent/SettingGoals/CreateGoals';
import MembersPage from '../MemberScreen/MembersPage';

export type RootStackParamList = {
  GoalsScreen: undefined;
  CreatingGoals: undefined;
  MembersPage: {
    selectedMember: string;
    setSelectedMember: React.Dispatch<React.SetStateAction<string>>;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const GoalScreen = () => {
  return (
    <ScrollView>
      <TodoComponent data-testid="todo-component" />
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
      <Stack.Screen name="MembersPage" component={()=>MembersPage} />
    </Stack.Navigator>
  );
}

export default withHeader(GoalsScreenStack);
