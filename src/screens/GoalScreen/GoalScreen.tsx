import React from 'react';
import { View, StyleSheet } from 'react-native';
import withHeader from '../../helpers/withHeader';
import ShortGoalsComponent from '../../components/ShortGoalsComponent/ShortGoalsComponent';
import CreateGoalsComponent from '../../components/CreateGoalForm/CreateGoalform'
const GoalScreen = () => {
  return (
    <View style={styles.contain}>
      <CreateGoalsComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  contain:{
    height:'100%',
  },
})

export default withHeader(GoalScreen);

