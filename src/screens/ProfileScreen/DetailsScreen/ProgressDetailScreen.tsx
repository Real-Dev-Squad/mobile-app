import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './styles/ProgressDetailScreenStyle';

const ProgressDetailScreen = () => {
  // TODO: progress detail api call
  // const route = useRoute();

  // const { taskId } = route.params;
  const [taskCompleted, setTaskCompleted] = useState('');
  const [taskPlanned, setTaskPlanned] = useState('');
  const [taskBlockers, setTaskBlockers] = useState('');
  // const [shouldDisable, setShoulDisable] = useState(false);

  const isVisible = () => {
    // setShoulDisable('');
    // validateTaskProgress(taskCompleted, taskPlanned, taskBlockers),
  };

  function submitProgress(): void {
    // throw new Error('Function not implemented.');
  }

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Task Detail</Text>
      </View>
      <View style={styles.progressUpdateBackground}>
        <Text style={styles.progressText}>
          You have {<Text style={styles.missedProgressCount}>0 missed </Text>}
          Progress updates{'\n'}
        </Text>
        <Text style={styles.progressText}>
          Let us try not to miss giving updates
        </Text>
      </View>
      <Text style={styles.taskUpdateTitle}>Task Updates</Text>
      {/* <Text style={styles.taskUpdateDateTitle}>On {new Date()}</Text> */}

      <Text style={styles.taskUpdateQuestion}>
        Task Progress after the previous update
      </Text>
      <TextInput
        style={styles.taskUpdateInput}
        multiline={true}
        onChangeText={(newText) => {
          setTaskCompleted(newText.trim());
          isVisible();
        }}
        defaultValue={taskCompleted}
      />

      <Text style={styles.taskUpdateQuestion}>
        Planned progress before the next update
      </Text>
      <TextInput
        style={styles.taskUpdateInput}
        multiline={true}
        onChangeText={(newText) => {
          setTaskPlanned(newText.trim());
          isVisible();
        }}
        defaultValue={taskPlanned}
      />

      <Text style={styles.taskUpdateQuestion}>
        List down any blockers that you have
      </Text>
      <TextInput
        style={styles.taskUpdateInput}
        multiline={true}
        onChangeText={(newText) => {
          setTaskBlockers(newText.trim());
          isVisible();
        }}
        defaultValue={taskBlockers}
      />

      <TouchableOpacity
        style={styles.submitProgressContainer}
        // disabled={shouldDisable}
        onPress={submitProgress}
      >
        <Text style={styles.updatebutton}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProgressDetailScreen;