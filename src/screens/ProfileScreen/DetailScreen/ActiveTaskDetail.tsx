import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import ProgressModal from '../../../components/Modal/ProgressModal';

const formatDate = (dateString) => {
  const date = new Date(dateString);

  const currentYear = new Date().getFullYear();
  const formattedDate = `${currentYear}-${(date.getMonth() + 1)

    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

  return formattedDate;
};

const ActiveTaskDetail = () => {
  const route = useRoute();
  const { task } = route.params;
  const navigation = useNavigation();
  const [selectedStatus, setSelectedStatus] = useState(task.status);
  console.log(task.status);
  console.log(task.startedOn), console.log(task.createdBy);
  console.log(task.html_url, 'html_url');
  console.log(task.percentCompleted, 'percentCompleted');
  const updateStatus = (status) => {
    setSelectedStatus(status);
  };

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
        <Text
          style={{
            color: '#2827CC',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Active Task Details
        </Text>

        <ProgressModal />
        <Text style={styles.titles}>Task Detail</Text>
        <Text style={styles.buttonTextStyle}>{`Status: ${formatStatusText(
          task.status,
        )}`}</Text>

        <Text style={styles.buttonTextStyle}>
          {`Started On: ${formatDate(task.startedOn)}`}
        </Text>
        <Text style={styles.buttonTextStyle}>{`Ends On: ${formatDate(
          task.endsOn,
        )}`}</Text>

        <Text style={styles.titles}></Text>

        <TouchableOpacity
          style={styles.buttonStyle}
          // onPress={() => setOpen(true)}
          onPress={() => navigation.navigate('ExtensionRequest')}
        >
          <Text style={styles.buttonTextStyle}> Create Extention Request</Text>
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
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    padding: 20,
    backgroundColor: '#e7cfe7',
  },

  formHeading: {
    color: '#7f7fd3',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputStyle: {
    padding: 10,
    // backgroundColor: 'silver',
    borderRadius: 5,
    elevation: 2,
    fontSize: 12,
    borderWidth: 2,
    fontStyle: 'normal',
  },
  titles: {
    fontSize: 20,
    elevation: 2,
    marginBottom: 5,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  viewStyle: {
    borderWidth: 2,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 40,
    height: 650,
    borderRadius: 20,
    overflow: 'hidden',
  },
  createButtonText: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
  },
  createButtonStyle: {
    padding: 10,
    width: '50%',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#72729b',
  },

  buttonStyle: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
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

  dropdownContainer: {
    height: 40,
    marginVertical: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  dropdownItem: {
    justifyContent: 'flex-start',
  },
  dropdownDropDown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default ActiveTaskDetail;
