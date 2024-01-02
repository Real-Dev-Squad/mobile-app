import { Text, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { profileScreenStyles } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import {
  convertTimestampToReadableDate,
  formatTimeToUnix,
} from '../../AuthScreen/Util';
// import TaskProgressDialog from './TaskProgressDialog';

import { useFocusEffect, useNavigation } from '@react-navigation/native';
import {
  fetchTaskDetails,
  fetchTaskProgressDetails,
} from '../../AuthScreen/Util';
import { AuthContext } from '../../../context/AuthContext';

const AllTaskDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const taskId = route.params.taskId;
  const [allTaskDetail, setAllTaskDetailData] = useState({});
  const [allTaskProgressDetail, setAllTaskProgressDetailData] = useState([]);
  const { loggedInUserData } = useContext(AuthContext);
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    itemIdx: null,
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const taskDetailResponse = await fetchTaskDetails(
            loggedInUserData?.token,
            taskId,
          );
          setAllTaskDetailData(taskDetailResponse);
          const taskProgressDetailResponse = await fetchTaskProgressDetails(
            loggedInUserData?.token,
            taskId,
          );
          taskProgressDetailResponse
            ? setAllTaskProgressDetailData(taskProgressDetailResponse)
            : [];
        } catch (error) {
          console.error('Error fetching task details:', error);
        }
      })();
    }, [taskId]),
  );

  return <ScrollView style={profileScreenStyles.mainContainer}></ScrollView>;
};

export default AllTaskDetailScreen;
