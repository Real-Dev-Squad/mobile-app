import * as React from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DurationDropDown from './SettingGoalsComponents/DurationDropDown';
import DeadLineDatePicker from './SettingGoalsComponents/Calendar';

const MainScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.formView}>
        <Text style={styles.formHeading}>Create New Goal</Text>
        <Text style={styles.titleText}>Title</Text>
        <TextInput
          style={styles.inputStyle}
          maxLength={50}
          placeholder="Enter title max of 50 characters."
        />
        <Text style={styles.titleText}>Description</Text>
        <TextInput
          style={styles.inputStyle}
          maxLength={200}
          placeholder="Enter max 200 characters."
        />
        <Text style={styles.titleText}>Duration</Text>
        <DurationDropDown />
        <Text style={styles.titleText}>DeadLine</Text>
        <DeadLineDatePicker />
        <TouchableOpacity
          style={styles.createButtonStyle}
          onPress={() => navigation.push('Form screen')}
        >
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
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
  formView: {
    borderWidth: 3,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 40,
    height: 650,
    borderRadius: 20,
    overflow: 'hidden',
  },
  formHeading: {
    color: '#2827CC',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputStyle: {
    padding: 10,
    backgroundColor: '#F9F6EE',
    borderRadius: 5,
    fontSize: 12,
    borderWidth: 2,
  },
  titleText: {
    fontSize: 15,
    marginBottom: 10,
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
});

export default MainScreen;
