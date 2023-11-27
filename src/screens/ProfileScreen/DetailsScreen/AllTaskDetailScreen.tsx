import { Text, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { profileScreenStyles } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import TaskProgressDialog from './TaskProgressDialog';
import {
  fetchTaskDetails,
  fetchTaskProgressDetails,
  getDateAndTimeFromUnix,
  getDate,
} from '../../AuthScreen/Util';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const AllTaskDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const taskId = route.params.taskId;
  console.log('id ', taskId);
  const [allTaskDetail, setAllTaskDetailData] = useState({});
  const [allTaskProgressDetail, setAllTaskProgressDetailData] = useState({});
  const [dialogState, setDialogState] = useState({
    isOpen: false,
    itemIdx: null,
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const taskDetailResponse = await fetchTaskDetails(taskId);
        setAllTaskDetailData(taskDetailResponse);
        console.log('reponse ', taskDetailResponse);
        const taskProgressDetailResponse = await fetchTaskProgressDetails(
          taskId,
        );
        setAllTaskProgressDetailData(taskProgressDetailResponse);
      })();
    }, [taskId]),
  );

  return (
    <ScrollView style={profileScreenStyles.mainContainer}>
      <Text
        style={[profileScreenStyles.titleText, profileScreenStyles.textStyle]}
      >
        {allTaskDetail?.taskData?.title}
      </Text>

      <View style={profileScreenStyles.cardBackground}>
        <Text style={profileScreenStyles.subTitleText}>Desciption</Text>
        <Text>No description available</Text>
      </View>

      <View style={profileScreenStyles.cardBackground}>
        <Text style={profileScreenStyles.subTitleText}>Details</Text>

        <View style={profileScreenStyles.flexContainer}>
          <View style={profileScreenStyles.flexItemWidth}>
            <Text>Type:</Text>
            <Text style={profileScreenStyles.smallTitle}>
              {allTaskDetail?.taskData?.type.toUpperCase()}
            </Text>
          </View>

          <View style={profileScreenStyles.flexItemWidth}>
            <Text>Priority:</Text>
            <Text style={profileScreenStyles.smallTitle}>
              {allTaskDetail?.taskData?.priority.toUpperCase()}
            </Text>
          </View>

          <View style={profileScreenStyles.flexItemWidth}>
            <Text>Status:</Text>
            <Text style={profileScreenStyles.smallTitle}>
              {allTaskDetail?.taskData?.status}
            </Text>
          </View>

          <View style={profileScreenStyles.flexItemWidth}>
            <Text>Link:</Text>
            <Text style={profileScreenStyles.smallTitle}>N/A</Text>
          </View>
        </View>
      </View>

      <View style={profileScreenStyles.cardBackground}>
        <Text style={profileScreenStyles.subTitleText}>Progress Updates</Text>
        {allTaskProgressDetail?.data?.map((item, index) => (
          <TouchableOpacity
            onPress={() =>
              setDialogState({
                isOpen: true,
                itemIdx: index,
              })
            }
          >
            <Text>
              {' '}
              {'\u2B24'} {getDate(item?.date)}{' '}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={profileScreenStyles.cardBackground}>
        <Text style={profileScreenStyles.subTitleText}>Task Dependencies</Text>
        <Text>{allTaskDetail?.dependsOn}</Text>
      </View>

      <View style={profileScreenStyles.cardBackground}>
        <Text style={profileScreenStyles.subTitleText}>Participants</Text>
        <Text>Assignee:</Text>
        <Text style={profileScreenStyles.smallTitle}>
          {allTaskDetail?.taskData?.assignee.toUpperCase()}
        </Text>
        <Text>Repoter:</Text>
        <Text style={profileScreenStyles.smallTitle}>ANKUSH</Text>
      </View>

      <View style={profileScreenStyles.cardBackground}>
        <Text style={profileScreenStyles.subTitleText}>Dates</Text>
        <Text>Started On:</Text>
        <Text style={profileScreenStyles.smallTitle}>
          {getDateAndTimeFromUnix(allTaskDetail?.taskData?.startedOn)}
        </Text>
        <Text>Ends On:</Text>
        <Text style={profileScreenStyles.smallTitle}>
          {getDateAndTimeFromUnix(allTaskDetail?.taskData?.endsOn)}
        </Text>
      </View>

      <View style={profileScreenStyles.cardBackground}>
        <Text style={profileScreenStyles.subTitleText}>Update Progress</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AllTaskDetailProgress', {
              taskId: taskId,
            })
          }
          style={profileScreenStyles.updateButtonContainer}
        >
          <Text style={profileScreenStyles.updatebutton}>Update Progress</Text>
        </TouchableOpacity>
      </View>
      {dialogState.itemIdx != null && dialogState.isOpen && (
        <TaskProgressDialog
          task={allTaskProgressDetail?.data[dialogState.itemIdx]}
          onClose={() =>
            setDialogState({
              isOpen: false,
              itemIdx: null,
            })
          }
        />
      )}
    </ScrollView>
  );
};

export default AllTaskDetailScreen;
