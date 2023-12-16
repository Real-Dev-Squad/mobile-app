import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressModal from '../../../components/Modal/ProgressModal';
// import { getDateAndTimeFromUnix } from '../../AuthScreen/Util';

const ActiveTaskDetail = () => {
  const route = useRoute();
  const { task } = route.params;
  const navigation = useNavigation();

  console.log(task.percentCompleted, 'percentCompleted');

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e7cfe7',
    alignContent: 'space-between',
  },
  mainTitle: {
    color: '#2827CC',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  titles: {
    fontSize: 20,
    elevation: 2,
    marginBottom: 5,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold',
  },

  buttonStyle: {
    width: 150,
    height: 40,
    backgroundColor: '#9cb8b5',
    padding: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonTextStyle: {
    color: 'black',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    fontSize: 15,
  },
  buttoncontainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'grey',
    padding: 6,
    marginTop: 12,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

export default ActiveTaskDetail;
