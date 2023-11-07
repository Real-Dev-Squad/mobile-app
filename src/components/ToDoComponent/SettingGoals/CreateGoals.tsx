import React, { useState } from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  TextInput,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import DeadLineDatePicker from './SettingGoalsComponents/DeadLineDatePicker';

const MainScreen = ({ navigation }) => {
  const [selectedMember, setSelectedMember] = React.useState('');
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [isDropDownSelected, setIsDropDownSelected] =useState(false)


  const selectDropDown =()=>{
    setIsDropDownSelected(!isDropDownSelected)
  }

  const array=[
  {
    "first_name": "Eleanor",
    "last_name": "Young",
    "email": "eleanor.young@aol.com"
  },
  {
    "first_name": "Mark",
    "last_name": "Torres",
    "email": "m.j.torres@yahoo.com"
  },
  {
    "first_name": "Hannah",
    "last_name": "Stewart",
    "email": "hannah@hotmail.com"
  },
  {
    "first_name": "Kayla",
    "last_name": "Moore",
    "email": "kayla67@hotmail.com"
  },
  {
    "first_name": "Audrey",
    "last_name": "Bennett",
    "email": "a_bennett@gmail.com"
  },
  {
    "first_name": "Joshua",
    "last_name": "Bryant",
    "email": "j_a@rocketmail.com"
  },
  {
    "first_name": "Rebecca",
    "last_name": "Hill",
    "email": "rebecca.l74@outlook.com"
  },
  {
    "first_name": "Joseph",
    "last_name": "Davis",
    "email": "josephedwarddavis@outlook.com"
  },
  {
    "first_name": "Kelsey",
    "last_name": "Carter",
    "email": "kelsey@outlook.com"
  },
  {
    "first_name": "Jeremy",
    "last_name": "Ward",
    "email": "jeremy.ward@outlook.com"
  },
    {
    "first_name": "Eleanor",
    "last_name": "Young",
    "email": "eleanor.young@aol.com"
  },
  {
    "first_name": "Mark",
    "last_name": "Torres",
    "email": "m.j.torres@yahoo.com"
  },
  {
    "first_name": "Hannah",
    "last_name": "Stewart",
    "email": "hannah@hotmail.com"
  },
  {
    "first_name": "Kayla",
    "last_name": "Moore",
    "email": "kayla67@hotmail.com"
  },
  {
    "first_name": "Audrey",
    "last_name": "Bennett",
    "email": "a_bennett@gmail.com"
  },
  {
    "first_name": "Joshua",
    "last_name": "Bryant",
    "email": "j_a@rocketmail.com"
  },
  {
    "first_name": "Rebecca",
    "last_name": "Hill",
    "email": "rebecca.l74@outlook.com"
  },
  {
    "first_name": "Joseph",
    "last_name": "Davis",
    "email": "josephedwarddavis@outlook.com"
  },
  {
    "first_name": "Kelsey",
    "last_name": "Carter",
    "email": "kelsey@outlook.com"
  },
  {
    "first_name": "Jeremy",
    "last_name": "Ward",
    "email": "jeremy.ward@outlook.com"
  },
]

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          borderWidth: 3,
          paddingTop: 20,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 40,
          height: 650,
          borderRadius: 20,
          overflow: 'hidden',
        }}
      >
        <Text
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
          placeholderTextColor="red"
        />
        <Text style={styles.titleText}>Description</Text>
        <TextInput
          style={styles.inputStyle}
          value={descriptionText}
          onChangeText={setDescriptionText}
          maxLength={200}
          placeholder="Enter max 200 characters."
          placeholderTextColor="red"
        />
        {/* <Text style={styles.titles}>Duration</Text>
        <DurationDropDown /> */}
        <Text style={styles.titles}>Assign To</Text>
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
        <View>


        <Text style={styles.titles}>Assign To Dropdown</Text>
          <TouchableOpacity style={styles.dropDownSelector} onPress={selectDropDown}>
            <Text style={{color:"red"}}>
              Select User
            </Text>
            {
              isDropDownSelected?           
              <Image source={require("./../../../../assets/dropdown.png")} style={styles.dropDownIcon}/>:
              <Image source={require("./../../../../assets/dropup.png")} style={styles.dropDownIcon}/>
            }  
        </TouchableOpacity>
                    {
              !isDropDownSelected?
              <View style={styles.dropDownArea}>
        <TextInput
          style={[styles.inputStyle,{marginTop:10,marginHorizontal:5}]}
          value={descriptionText}
          onChangeText={setDescriptionText}
          maxLength={200}
          placeholder="Search User"
          // placeholderTextColor="red"
        />
              <FlatList data={array} renderItem={({item,index})=>{
                return(
                  <TouchableOpacity key={index}>

                    <Text>
                      {item.first_name}
                    </Text>

                  </TouchableOpacity>
                )
              }}/>
          </View>
              :null
            }
        </View>


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
  titleText: {},
  dropDownSelector:{
    padding: 10,
    // backgroundColor: 'silver',
    borderRadius: 5,
    elevation: 2,
    fontSize: 12,
    borderWidth: 2,
    height:40,
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  dropDownIcon:{
    width:20,
    height:20,
  },
  dropDownArea:{
    height:300,
    backgroundColor:"grey",
    marginTop:10,
    borderRadius:5
  }

});

export default MainScreen;
