import React from 'react';
import {View, Text} from 'react-native';
import {ScreenViewContainer} from '../styles/GlobalStyle';

const HomeScreen = () => {
  return (
    <View style={ScreenViewContainer.container}>
      <Text style={ScreenViewContainer.text_view}>Home Screen </Text>
    </View>
  );
};

export default HomeScreen;
