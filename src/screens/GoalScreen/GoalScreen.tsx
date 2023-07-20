import React from 'react';

import { ScrollView } from 'react-native';

import withHeader from '../../helpers/withHeader';
import TodoComponent from '../../components/ToDoComponent/TodoComponent';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import CreatingGoals from '../../components/ToDoComponent/SettingGoals/CreateGoals';
import MembersPage from '../MemberScreen/MembersPage';

export type RootStackParamList = {
  GoalsScreen: undefined;
  CreatingGoalsSceen: undefined;
  MembersSceen: {
    selectedMember: string;
    setSelectedMember: React.Dispatch<React.SetStateAction<string>>;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export type GoalScreenProp = NativeStackScreenProps<
  RootStackParamList,
  'GoalsScreen'
>;

export const GoalScreen = (props: GoalScreenProp) => {
  return (
    <ScrollView>
      <TodoComponent
        data-testid="todo-component"
        navigation={props.navigation}
      />
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
      <Stack.Screen name="CreatingGoalsSceen" component={CreatingGoals} />
      <Stack.Screen name="MembersSceen" component={MembersPage} />
    </Stack.Navigator>
  );
}

export default withHeader(GoalsScreenStack);
