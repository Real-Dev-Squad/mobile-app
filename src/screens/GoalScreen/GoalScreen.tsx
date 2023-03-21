import React from 'react';

import { ScrollView } from 'react-native';

import withHeader from '../../helpers/withHeader';
import ShortGoalsComponent from '../../components/ShortGoalsComponent/ShortGoalsComponent';
import LongGoalsComponent from '../../components/LongGoalsComponent';
import TodoComponent from '../../components/ToDoComponent/TodoComponent';
const GoalScreen = () => {
  return (
    <ScrollView>
      <TodoComponent />
      <ShortGoalsComponent />
      <LongGoalsComponent />
    </ScrollView>
  );
};

export default withHeader(GoalScreen);