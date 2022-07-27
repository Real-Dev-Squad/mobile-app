import React from 'react';
import {View} from 'react-native';
import withHeader from '../../helpers/withHeader';
import ShortGoalsComponent from '../../components/ShortGoalsComponent/ShortGoalsComponent';
import FloatingButtonComponent from '../../components/FloatingButton';
const GoalScreen = () => {
  return (
    <View>
      <ShortGoalsComponent />
      <FloatingButtonComponent />
    </View>
  );
};
export default withHeader(GoalScreen);

