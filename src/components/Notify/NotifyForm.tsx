import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
} from 'react-native';
import React, { useState } from 'react';
import { styles } from './NotifyFormStyle';

const NotifyForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [notifyTo, setNotifyTo] = useState('');

  const handleButtonPress = () => {
    // Handle the button press and perform necessary actions (e.g., send notification)
    console.log('Notification sent:', { title, description, notifyTo });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={(text) => setTitle(text)}
        placeholder="Enter title"
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={(text) => setDescription(text)}
        placeholder="Enter description"
        multiline
      />

      <Text style={styles.label}>Notify To:</Text>
      <Picker
        style={styles.input}
        selectedValue={notifyTo}
        onValueChange={(itemValue) => setNotifyTo(itemValue)}
      >
        <Picker.Item label="User 1" value="user1" />
        <Picker.Item label="User 2" value="user2" />
        {/* Add more items as needed */}
      </Picker>

      <Button title="Send Notification" onPress={handleButtonPress} />
    </View>
  );
};

export default NotifyForm;
