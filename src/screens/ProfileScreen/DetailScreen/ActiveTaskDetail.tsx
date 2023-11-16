import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DropdownComponent from './TaskStatusDropdown';
import { useNavigation, useRoute } from '@react-navigation/native';

const ActiveTaskDetail = () => {
  const route = useRoute();
  const { task } = route.params;
  const navigation = useNavigation();

  const getApiDAta = () => {
    console.warn('hello');
  };
  useEffect(() => {
    getApiDAta();
  }, []);

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

        <Text style={styles.titles}>task Detail</Text>
        <TouchableOpacity
        // style={styles.buttonStyle}
        // onPress={() => setOpen(true)}
        >
          <Text style={styles.buttonTextStyle}>{task.title}</Text>
          <Text style={styles.buttonTextStyle}>{task.status}</Text>
          <Text style={styles.buttonTextStyle}>{task.purpose}</Text>
          <Text style={styles.buttonTextStyle}>{task.startedOn}</Text>
          <Text style={styles.buttonTextStyle}>{task.progress}</Text>
        </TouchableOpacity>

        <Text style={styles.titles}>Status</Text>
        {/* <Text style={styles.buttonTextStyle}>UpdateDropdown</Text> */}
        <TouchableOpacity
        // style={styles.buttonStyle}
        // // onPress={() => setOpen(true)}
        >
          <DropdownComponent />
        </TouchableOpacity>
        <Text style={styles.titles}>Extention</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          // onPress={() => setOpen(true)}
          onPress={() => navigation.navigate('ExtensionRequest')}
        >
          <Text style={styles.buttonTextStyle}>Extention Request</Text>
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
    borderRadius: 20,
    backgroundColor: 'white',
  },

  formHeading: {
    color: '#2827CC',
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
    fontSize: 15,
    elevation: 2,
    marginBottom: 5,
    marginTop: 20,
    color: 'black',
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
    backgroundColor: '#2827CC',
  },
  titleText: {},
  buttonStyle: {
    width: '100%',
    height: 50,
    elevation: 5,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonTextStyle: {
    fontWeight: '500',
    color: 'black',
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
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
