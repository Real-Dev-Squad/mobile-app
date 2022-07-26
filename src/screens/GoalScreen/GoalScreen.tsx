import React from 'react';
import { View} from 'react-native';
import withHeader from '../../helpers/withHeader';
import ShortGoalsComponent from '../../components/ShortGoalsComponent/ShortGoalsComponent';
const GoalScreen = () => {
  return (
    <View style={styles.contain}>
      <ShortGoalsComponent />
    </View>
  );
};

export default withHeader(GoalScreen);

