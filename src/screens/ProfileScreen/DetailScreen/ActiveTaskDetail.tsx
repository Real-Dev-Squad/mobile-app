import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressModal from '../../../components/Modal/ProgressModal';
// import { getDateAndTimeFromUnix } from '../../AuthScreen/Util';
import { styles } from './styles/ActiveTaskDetailStyle';

const ActiveTaskDetail = () => {
  const route = useRoute();
  const { task } = route.params;
  const navigation = useNavigation();

  console.log(task, 'percentCompleted');

  const formatStatusText = (status) => {
    // Split the status string by underscore
    const words = status.split('_');

    // Capitalize the first letter of each word
    const formattedText = words.map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
    );

    // Join the words with a space
    return formattedText.join(' ');
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.mainTitle}>Active Task Details</Text>

        <ProgressModal />
        <Text style={styles.titles}>Task Detail</Text>
        <Text style={styles.buttonTextStyle}>{task.title}</Text>
        <Text style={styles.buttonTextStyle}>{`Status: ${formatStatusText(
          task.status,
        )}`}</Text>

        {/* <Text style={styles.buttonTextStyle}>
          {`Started On: ${getDateAndTimeFromUnix(task.startedOn)}`}
        </Text>
        <Text
          style={styles.buttonTextStyle}
        >{`Ends On: ${getDateAndTimeFromUnix(task.endsOn)}`}</Text>
 */}
        <Text style={styles.titles} />

        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            // navigation.navigate('ExtensionRequest', { endsOn: task.endsOn })
            console.log('here')
          }
        >
          <Text style={styles.buttonTextStyle}>Create Extension</Text>
        </TouchableOpacity>
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: 'white' }}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ActiveTaskDetail;
