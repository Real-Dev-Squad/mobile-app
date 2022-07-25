import React from 'react';
import { View, Text, Image } from 'react-native';
import { ScreenViewContainer } from '../../styles/globalStyles';
import withHeader from '../../helpers/withHeader';
import Images from '../../constants/images';
import { TaskScreenView } from './styles';
const TaskScreen = () => {
  return (
    <View style={ScreenViewContainer.container}>
      <Image source={Images.emptyTaskScreen} />
      <Text style={TaskScreenView.text}>No tasks for you!</Text>
    </View>
  );
};

export default withHeader(TaskScreen);
