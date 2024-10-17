import {
  Text,
  View,
  TextInput,
  Switch,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Deadline from './DatePicker';
import Dropdown from './Dropdown';
import { styles } from './CreateGoalFormStyle';

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
            <Text style={styles.buttonText}>Create</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
