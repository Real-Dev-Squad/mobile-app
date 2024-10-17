import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
// import axios from 'axios';
import { styles } from './styles/ExtensionRequestStyle';

export default function ExtensionRequest() {
  const navigation = useNavigation();

  const [reason, setReason] = useState('');
  const [title, setTitle] = useState('');
  const [oldEndsOn, setOldEndsOn] = useState('');
  const [newEndsOn, setNewEndsOn] = useState('');

  const postApi = () => {
    fetch('https://api.realdevsquad.com/extension-requests', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: reason,
        title: title,
        oldEndsOn: oldEndsOn,
        body: newEndsOn,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(JSON.stringify(responseData));
        console.log(JSON.stringify(responseData), 'PostApiCAlled');
      })
      .done();
  };

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

        <Text style={styles.paragraph}>Old Ends On :</Text>
        <TextInput
          value={oldEndsOn}
          onChangeText={(text) => setOldEndsOn(text)}
          style={styles.input}
          placeholder="Old Ends On"
        />

        <Text style={styles.paragraph}>New Ends On :</Text>
        <TextInput
          value={newEndsOn}
          onChangeText={(text) => setNewEndsOn(text)}
          style={styles.input}
          placeholder="New Date"
        />
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.button} onPress={postApi}>
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