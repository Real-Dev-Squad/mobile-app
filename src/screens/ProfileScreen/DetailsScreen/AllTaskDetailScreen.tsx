import { Text, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { profileScreenStyles } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import {
  convertTimestampToReadableDate,
  formatTimeToUnix,
} from '../../AuthScreen/Util';
// import TaskProgressDialog from './TaskProgressDialog';

const AllTaskDetailScreen = () => {
  return (
    <View>
      <Text style={{ color: 'black' }}>AllTaskDetailScreen</Text>
    </View>
  );
};

export default AllTaskDetailScreen;
