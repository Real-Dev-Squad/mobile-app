import React from 'react';
import { View } from 'react-native';
import withHeader from '../../helpers/withHeader';
import ShortGoalsComponent from '../../components/ShortGoalsComponent/ShortGoalsComponent';
import LongGoalsComponent from '../../components/LongGoalsComponent';
const GoalScreen = () => {
  return (
    <View>
      <ShortGoalsComponent />
      <LongGoalsComponent />
    </View>
  );
};

export default withHeader(GoalScreen);
