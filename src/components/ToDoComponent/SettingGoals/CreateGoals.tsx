import React, { useState } from 'react';
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
import DeadLineDatePicker from './SettingGoalsComponents/DeadLineDatePicker';

const MainScreen = ({ navigation }) => {
  const [selectedMember, setSelectedMember] = React.useState('');
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  return (
    <ScrollView style={styles.container}>
    <View
        style={{
          borderWidth: 3,
          paddingTop: 20,
          paddingLeft: 30  ,
          paddingRight: 30,
          paddingBottom: 40,
          height: 650,
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >      <Text
          style={{
            color: '#2827CC',
            fontSize: 25,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          Add New Goal
        </Text>
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
            navigation.navigate("Member's page", {
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
});

export default MainScreen;
