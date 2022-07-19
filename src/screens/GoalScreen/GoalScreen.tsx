import React from 'react';
import { View } from 'react-native';
import withHeader from '../../helpers/withHeader';
import ShortGoalsComponent from '../../components/ShortGoalsComponent/ShortGoalsComponent';
import TodoComponent from '../../components/ToDoComponent/TodoComponent';
const GoalScreen = () => {
  return (
    <View>
      <TodoComponent />
      <ShortGoalsComponent />
    </View>
  );
};

export default withHeader(GoalScreen);
