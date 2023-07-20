import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { RootStackParamList } from '../../../screens/GoalScreen/GoalScreen';
import DeadLineDatePicker from './SettingGoalsComponents/DeadLineDatePicker';

type CreatingGoalScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CreatingGoalsSceen'
>;

const CreatingGoalScreen = ({ navigation }: CreatingGoalScreenProps) => {
  const [selectedMember, setSelectedMember] = React.useState('');
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.header}>Add New Goal</Text>
        <Text style={styles.titles}>Title</Text>
        <TextInput
          style={styles.inputStyle}
          maxLength={50}
          value={titleText}
          onChangeText={setTitleText}
          placeholder="Enter title max of 50 characters."
        />
        <Text style={styles.titleText}>Description</Text>
        <TextInput
          style={styles.inputStyle}
          value={descriptionText}
          onChangeText={setDescriptionText}
          maxLength={200}
          placeholder="Enter max 200 characters."
        />
        {/* <Text style={styles.titles}>Duration</Text>
        <DurationDropDown /> */}
        <Text style={styles.titles}>Assigned To</Text>
        {/* <DurationDropDown /> */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MembersSceen', {
              setSelectedMember,
              selectedMember,
            })
          }
        >
          <Text style={styles.inputStyle}>
            {selectedMember ? selectedMember : "Enter member's name"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.titles}>DeadLine</Text>
        <DeadLineDatePicker />
        <TouchableOpacity style={styles.createButtonStyle} onPress={() => {}}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingTop: 30,
    paddingLeft: 40,
    paddingRight: 40,
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'white',
  },
  container: {
    borderWidth: 3,
    paddingTop: 20,
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 40,
    height: 650,
    borderRadius: 20,
    overflow: 'hidden',
  },
  header: {
    color: '#2827CC',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
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
    // backgroundColor: 'silver',
    borderRadius: 5,
    elevation: 2,
    fontSize: 12,
    borderWidth: 2,
  },
  titles: {
    fontSize: 12,
    elevation: 2,
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
  titleText: {},
});

export default CreatingGoalScreen;
