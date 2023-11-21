import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import DatePicker from './ExtensionDatePicker';
import { submitExtension } from '../../screens/AuthScreen/Util';
import { AuthContext } from '../../context/AuthContext';

export default function ExtensionRequest() {
  const navigation = useNavigation();

  const [reason, setReason] = useState('');
  const [title, setTitle] = useState('');
  const [newEndsOn, setNewEndsOn] = useState('');
  const { loggedInUserData } = useContext(AuthContext);

  const handleFormSubmit = async () => {
    const response = await submitExtension(
      loggedInUserData?.token,
      reason,
      title,
      newEndsOn,
      // oldEndsOn,
      // assignee,
      // status,
    );
    console.log('response', response);
    setReason('');
    setTitle('');
    setNewEndsOn('');
  };
  const handleNewDateChange = (date) => {
    setNewEndsOn(date);
  };

  console.log(handleFormSubmit, 'formSubmitted');
  console.log(reason, 'reason');
  console.log(title, 'title');
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Extension Request form</Text>
        <Text style={styles.paragraph}>Reason :</Text>
        <TextInput
          value={reason}
          onChangeText={(text) => setReason(text)}
          style={styles.input}
          placeholder="Enter reason"
        />

        <Text style={styles.paragraph}>Title :</Text>
        <TextInput
          value={title}
          onChangeText={(text) => setTitle(text)}
          style={styles.input}
          placeholder="Enter reason"
        />

        <Text style={styles.paragraph}>New Ends On :</Text>
        <DatePicker value={newEndsOn} onDateChange={handleNewDateChange} />
        {/* <TextInput style={styles.input} placeholder="New Date" /> */}
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          {/* onPress={saveData} */}

          <Text style={{ color: 'white' }}>Create Extension</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={{ color: 'white' }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    border: '2px solid black',
    padding: 30,
    justifyContent: 'center',
  },

  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'normal',
    color: 'blue',
    justifyContent: 'flex-start',
  },

  formchild: {
    marginTop: 5,
    fontWeight: 'bold',
  },
  toggle: {
    display: 'flex',
    flexDirection: 'row',
    margin: 5,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  togglechild: {
    margin: 5,
  },
  button: {
    backgroundColor: 'blue',
    padding: 6,
    marginTop: 12,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  buttoncontainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    justifyContent: 'flex-start',
  },
  input: {
    borderwidth: 2,
    fontSize: 15,
    backgroundColor: 'lightgrey',
  },
});
