import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Deadline from './DatePicker';
import Dropdown from './Dropdown';

export default function CreateGoalform() {
  const [title, onChangeTitle] = useState('');
  const [description, onChangeDescription] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.paragraph}>Create New Goal</Text>
        <View>
          <Text style={styles.formchild}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeTitle}
            value={title}
            placeholder="Enter a title of max 50 characters"
          />
        </View>

        <View>
          <Text style={styles.formchild}>Description</Text>
          <TextInput
            style={styles.input}
            onChangeText={onChangeDescription}
            value={description}
            placeholder="Enter max 200 characters"
          />
        </View>

        <View>
          <Text style={styles.formchild}>Duration</Text>
          <Dropdown />
        </View>

        <View>
          <Text style={styles.formchild}>Deadline</Text>
          <Deadline />
        </View>

        <View>
          <Text style={styles.formchild}>Visibility:</Text>
          <View style={styles.toggle}>
            <Text style={styles.togglechild}>Public 🌐</Text>
            <Switch
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
            <Text style={styles.togglechild}>🔒 Private</Text>
          </View>
        </View>

        <View style={styles.buttoncontainer}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonTitle}>Create</Text>
          </TouchableOpacity>
        </View>
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
  },
  form: {
    border: '2px solid black',
    padding: 10,
    borderRadius: 15,
  },
  paragraph: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    textAlign: 'center',
  },
  input: {
    height: 30,
    margin: 10,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#ecf0f1',
    fontSize: 12,
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
  buttonTitle: { color: 'white' },
  buttoncontainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
