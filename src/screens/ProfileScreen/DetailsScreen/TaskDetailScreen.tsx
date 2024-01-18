import { Text, View, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { profileScreenStyles } from '../styles';
import { ScrollView } from 'react-native-gesture-handler';
import {
  calculateISODateFormat,
  fetchTaskDetails,
  fetchTaskProgressDetails,
  unixToTimeStamp,
} from '../../AuthScreen/Util';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Modal from 'react-native-modal';

import { AuthContext } from '../../../context/AuthContext';
import GithubLink from '../../../components/GithubLink';
import PushUpModalContent from '../../../components/PushUpModalContent';
import { useSelector } from 'react-redux';

const TaskDetailScreen = () => {
  const route = useRoute();

  const { taskId } = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [progress, setProgress] = useState();
  const { isProdEnvironment } = useSelector((store) => store.localFeatureFlag);

  const toggleModal = (item) => {
    console.log(item);
    setIsModalVisible((prev) => !prev);

    setProgress(item);
    // {"blockers": "no blocker as of now", "completed": "checked the API's and working from the my-site and planned what needed to be done", "createdAt": 1705539839198, "date": 1705536000000, "id": "KU5KHKRddWjaKgvWFrzQ", "planned": "Integrated task detail as well get progress update detail api, made the task detail screen and displayed data", "taskId": "D7mETGktpIgJlCOLd9fT", "type": "task", "userId": "T7IL7MB8YriniTw4bt39"}
  };

  const [allTaskDetail, setAllTaskDetailData] = useState();
  const navigation = useNavigation();

  const [allTaskProgressDetail, setAllTaskProgressDetailData] = useState();

  const { loggedInUserData } = useContext(AuthContext);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const taskDetailResponse = await fetchTaskDetails(
          taskId,
          loggedInUserData?.token,
        );

        setAllTaskDetailData(taskDetailResponse);
        const taskProgressDetailResponse = await fetchTaskProgressDetails(
          loggedInUserData?.token,
          taskId,
        );

        setAllTaskProgressDetailData(
          taskProgressDetailResponse && taskProgressDetailResponse,
        );
      })();
    }, [taskId]),
  );

  return (
    <ScrollView style={profileScreenStyles.mainContainer}>
      <Text style={profileScreenStyles.titleText}>
        {allTaskDetail?.taskData.title ?? 'Title is unavailable'}
      </Text>
      <View style={profileScreenStyles.card}>
        <Text style={profileScreenStyles.subTitle}>Description</Text>
        <Text style={profileScreenStyles.descriptionText}>
          {allTaskDetail?.taskData.description ?? 'No description available'}
        </Text>
      </View>
      <View style={profileScreenStyles.card}>
        <Text style={profileScreenStyles.subTitle}>Details</Text>

        <View style={profileScreenStyles.flexContainer}>
          <View style={profileScreenStyles.flexItemWidth}>
            <Text style={profileScreenStyles.subTitleTypeText}>Type</Text>
            <Text style={profileScreenStyles.smallTitle}>
              {allTaskDetail?.taskData.type.toUpperCase()}
            </Text>
          </View>

          <View style={profileScreenStyles.flexItemWidth}>
            <Text style={profileScreenStyles.subTitleTypeText}>Priority</Text>
            <Text style={profileScreenStyles.smallTitle}>
              {allTaskDetail?.taskData.priority.toUpperCase()}
            </Text>
          </View>

          <View style={profileScreenStyles.flexItemWidth}>
            <Text style={profileScreenStyles.subTitleTypeText}>Status</Text>
            <Text style={profileScreenStyles.smallTitle}>
              {allTaskDetail?.taskData.status}
            </Text>
          </View>

          <View style={profileScreenStyles.flexItemWidth}>
            <Text style={profileScreenStyles.subTitleTypeText}>Link</Text>
            <GithubLink
              issueUrl={allTaskDetail?.taskData.github?.issue?.html_url}
            />
          </View>
        </View>
      </View>
      <View style={profileScreenStyles.card}>
        <Text style={profileScreenStyles.subTitleText}>Progress Updates</Text>
        {/* {"count": 3, "data": [{"blockers": "no blocker as of now", "completed": "checked the API's and working from the my-site and planned what needed to be done", "createdAt": 1705539839198, "date": 1705536000000, "id": "KU5KHKRddWjaKgvWFrzQ", "planned": "Integrated task detail as well get progress update detail api, made the task detail screen and displayed data", "taskId": "D7mETGktpIgJlCOLd9fT", "type": "task", "userId": "T7IL7MB8YriniTw4bt39"}, {"blockers": "blocker1", "completed": "testing1", "createdAt": 1705493271180, "date": 1705449600000, "id": "CEw8hqlxLUkCYGIBn1Pz", "planned": "testing2", "taskId": "D7mETGktpIgJlCOLd9fT", "type": "task", "userId": "T7IL7MB8YriniTw4bt39"}, {"blockers": "no-blocker", "completed": "started working on Task detail feature", "createdAt": 1705449157569, "date": 1705363200000, "id": "FWbOQGxdtqJiIVQc0H77", "planned": "checking the API's and working from the my-site", "taskId": "D7mETGktpIgJlCOLd9fT", "type": "task", "userId": "T7IL7MB8YriniTw4bt39"}], "message": "Progress document retrieved successfully."} */}

        {allTaskProgressDetail?.data ? (
          allTaskProgressDetail?.data.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => toggleModal(item)}>
              <Text
                style={[
                  profileScreenStyles.progressListLeftPadding,
                  {
                    backgroundColor: '#ffff',
                    padding: 4,
                    borderRadius: 5,
                    elevation: 2,
                    marginTop: 8,
                  },
                ]}
              >
                {`\u25A1 ${calculateISODateFormat(item?.date)}`}
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={profileScreenStyles.progressListLeftPadding}>
            {allTaskProgressDetail?.message}
          </Text>
        )}
      </View>
      <View style={profileScreenStyles.card}>
        <Text style={profileScreenStyles.subTitleText}>Task Dependencies</Text>
        <Text style={profileScreenStyles.descriptionText}>
          {/* TODO:handle array, wont execute as this wont be coming from the api */}
          {!allTaskDetail?.taskData?.dependsOn && 'No Dependency'}
        </Text>
      </View>
      <View style={profileScreenStyles.card}>
        <Text style={profileScreenStyles.subTitleText}>Participants</Text>
        <Text style={profileScreenStyles.subTitleTypeText}>Assignee</Text>
        <Text style={profileScreenStyles.smallTitle}>
          {allTaskDetail?.taskData?.assignee.toUpperCase()}
        </Text>
        <Text style={profileScreenStyles.subTitleTypeText}>Reporter</Text>
        {/* TODO:check through assignee Id, gave constant to maintain consistency as web */}
        <Text style={profileScreenStyles.smallTitle}>ANKUSH</Text>
      </View>
      <View style={profileScreenStyles.card}>
        <Text style={profileScreenStyles.subTitleText}>Dates</Text>
        <Text style={profileScreenStyles.subTitleTypeText}>Started On</Text>
        <Text style={profileScreenStyles.smallTitle}>
          {unixToTimeStamp(allTaskDetail?.taskData?.startedOn)}
        </Text>
        <Text style={profileScreenStyles.subTitleTypeText}>Ends On</Text>
        <Text style={profileScreenStyles.smallTitle}>
          {unixToTimeStamp(allTaskDetail?.taskData?.endsOn)}
        </Text>
      </View>
      {!isProdEnvironment ? (
        <View style={profileScreenStyles.card}>
          <Text style={profileScreenStyles.subTitleText}>Update Progress</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProgressDetail', {
                taskId: taskId,
              });
            }}
            style={profileScreenStyles.updateButtonContainer}
          >
            <Text style={profileScreenStyles.updatebutton}>
              Update Progress
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
          backdropOpacity={0.7}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          style={profileScreenStyles.modal}
        >
          <PushUpModalContent task={progress} />
        </Modal>
      )}
    </ScrollView>
  );
};

export default TaskDetailScreen;
