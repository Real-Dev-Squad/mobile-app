import React from 'react';

import { ScrollView } from 'react-native';

import withHeader from '../../helpers/withHeader';
import ShortGoalsComponent from '../../components/ShortGoalsComponent/ShortGoalsComponent';
import LongGoalsComponent from '../../components/LongGoalsComponent';
import TodoComponent from '../../components/ToDoComponent/TodoComponent';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatingGoals from '../../components/ToDoComponent/SettingGoals/CreateGoals';

const Stack = createNativeStackNavigator();
const GoalScreen = ({ navigation }) => {
  return (
    <ScrollView>
      <TodoComponent navigationProp={navigation} />
      <ShortGoalsComponent />
      <LongGoalsComponent />
    </ScrollView>
  );
};

function GoalsScreenStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GoalsScreen"
        component={GoalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreatingGoals"
        component={CreatingGoals}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default withHeader(GoalsScreenStack);
