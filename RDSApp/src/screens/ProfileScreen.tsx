import React from 'react';
import {View, Text} from 'react-native';
import {ScreenViewContainer} from '../styles/GlobalStyle';

const ProfileScreen = () => {
  return (
    <View style={ScreenViewContainer.container}>
      <Text style={ScreenViewContainer.text_view}>Profile Screen</Text>
    </View>
  );
};

export default ProfileScreen;
