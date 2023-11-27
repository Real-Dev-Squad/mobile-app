import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { getDate } from '../../AuthScreen/Util';
import { profileScreenStyles } from '../styles';
import { urls } from '../../../constants/appConstant/url';
import { AuthContext } from '../../../context/AuthContext';
import Toast from 'react-native-toast-message';

const AllTaskDetailProgessScreen = ({ route }) => {
  const [taskCompleted, setTaskCompleted] = useState('');
  const [taskPlanned, setTaskPlanned] = useState('');
  const [taskBlockers, setTaskBlockers] = useState('');
  const [shouldDisable, setShoulDisable] = useState(true);
  const { loggedInUserData } = useContext(AuthContext);

  const isVisible = () => {
    setShoulDisable(
      taskCompleted.trim() == '' ||
        taskPlanned.trim() == '' ||
        taskBlockers.trim() == '',
    );
    console.log('flag', shouldDisable);
  };

  const submitProgress = async () => {
    try {
      const resquest = await fetch(urls.POST_TASK_PROGRESS, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: `rds-session=${loggedInUserData?.token}`,
        },
        body: JSON.stringify({
          type: 'task',
          taskId: route.params.taskId,
          completed: taskCompleted,
          planned: taskPlanned,
          blockers: taskBlockers,
        }),
      });
      if (resquest.ok) {
        const dataJson = await resquest.json();
        Toast.show({
          type: 'error',
          text1: dataJson?.message,
          position: 'bottom',
          bottomOffset: 80,
        });
      } else {
        const dataJson = await resquest.json();
        Toast.show({
          type: 'error',
          text1: dataJson?.message,
          position: 'bottom',
          bottomOffset: 80,
        });
      }
    } catch (error) {}
  };

  return (
    <ScrollView style={profileScreenStyles.mainContainer}>
      <View style={profileScreenStyles.progressUpdateBackground}>
        <Text style={profileScreenStyles.progressText}>
          You have{' '}
          {
            <Text style={profileScreenStyles.missedProgressCount}>
              0 missed
            </Text>
          }{' '}
          Progress updates{'\n'}
        </Text>
        <Text style={profileScreenStyles.progressText}>
          Let us try not to miss giving updates
        </Text>
      </View>
      <Text style={profileScreenStyles.taskUpdateTitle}>Task Updates</Text>
      <Text style={profileScreenStyles.taskUpdateDateTitle}>
        On {getDate(new Date())}
      </Text>

      <Text style={profileScreenStyles.taskUpdateQuestion}>
        Task Progress after the previous update
      </Text>
      <TextInput
        style={profileScreenStyles.taskUpdateInput}
        multiline={true}
        onChangeText={(newText) => {
          setTaskCompleted(newText), isVisible();
        }}
        defaultValue={taskCompleted}
      />

      <Text style={profileScreenStyles.taskUpdateQuestion}>
        Planned progress before the next update
      </Text>
      <TextInput
        style={profileScreenStyles.taskUpdateInput}
        multiline={true}
        onChangeText={(newText) => {
          setTaskPlanned(newText), isVisible();
        }}
        defaultValue={taskPlanned}
      />

      <Text style={profileScreenStyles.taskUpdateQuestion}>
        List down any blockers that you have
      </Text>
      <TextInput
        style={profileScreenStyles.taskUpdateInput}
        multiline={true}
        onChangeText={(newText) => {
          setTaskBlockers(newText), isVisible();
        }}
        defaultValue={taskBlockers}
      />

      <TouchableOpacity
        style={profileScreenStyles.submitProgressContainer}
        disabled={shouldDisable}
        onPress={() => submitProgress()}
      >
        <Text style={profileScreenStyles.updatebutton}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AllTaskDetailProgessScreen;
