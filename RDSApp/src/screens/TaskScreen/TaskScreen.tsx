import React from 'react';
import {View, Text} from 'react-native';
import {ScreenViewContainer} from '../../styles/GlobalStyle';

const TaskScreen = () => {
  return (
    <View style={ScreenViewContainer.container}>
      <Text style={ScreenViewContainer.text_view}>Task Screen</Text>
    </View>
  );
};

export default TaskScreen;
