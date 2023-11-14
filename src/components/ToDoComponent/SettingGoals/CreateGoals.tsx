import React, { useState,useEffect,useContext } from 'react';
import 'react-native-gesture-handler';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import DeadLineDatePicker from './SettingGoalsComponents/DeadLineDatePicker';
import { AuthContext } from '../../../context/AuthContext';
import { getAllUsers } from '../../../screens/AuthScreen/Util';

const MainScreen = ({ navigation }) => {
  const [selectedMember, setSelectedMember] = React.useState('');
  const [titleText, setTitleText] = useState('');
  const [descriptionText, setDescriptionText] = useState('');
  const [isDropDownSelected, setIsDropDownSelected] =useState(false)
  const [searchQuery, setSearchQuery] = useState('');
  const [allUsers,setAllUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { loggedInUserData } = useContext(AuthContext);



  const selectDropDown =()=>{
    setIsDropDownSelected(!isDropDownSelected)
  }

    useEffect(() => {
      if (isLoading){
        fetchData();
      }
    }, [isLoading]);

  const fetchData = async () => {
    const allUser = await getAllUsers (loggedInUserData?.token);
    setAllUsers(allUser);
    setIsLoading(false)
  };

  return (
    <View style={styles.container}>
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
              !isDropDownSelected?           
              <Image source={require("./../../../../assets/dropdown.png")} style={styles.dropDownIcon}/>:
              <Image source={require("./../../../../assets/dropup.png")} style={styles.dropDownIcon}/>
            }  
        </TouchableOpacity>
                    {
              isDropDownSelected?
              <View style={styles.dropDownArea}>
                <TextInput
                  style={[styles.inputStyle, { marginTop: 10, marginHorizontal: 5 }]}
                  value={searchQuery}
                  onChangeText={(text) => setSearchQuery(text)}
                  maxLength={200}
                  placeholder="Search User"
                />
                {
                  isLoading?<Text>Loading...</Text>:
                    <FlatList
                      data={allUsers.filter(
                        (item) =>
                          item.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.github_id.toLowerCase().includes(searchQuery.toLowerCase())
                      )}
                      renderItem={({ item, index }) => {
                        return (
                          <TouchableOpacity key={index} onPress={() => console.log(item)} style={styles.userDetails}>
                            {item.picture && item.picture.url ? (
                              <Image source={{ uri: item.picture.url }} style={styles.userImageDropDown} />
                            ) : (
                              <View style={styles.defaultImageContainer}>
                                <Text style={styles.defaultImageText}>
                                  {item.first_name.charAt(0)} {item.last_name.charAt(0)}
                                </Text>
                              </View>
                            )}
                            <Text style={styles.userNameDropDown}>{item.first_name} {item.last_name}</Text>
                          </TouchableOpacity>
                        );
                      }}
                    />
                }

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
    </View>
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
    height:250,
    backgroundColor:"grey",
    marginTop:10,
    borderRadius:5
  },
  userNameDropDown:{
    padding:20,
    borderBottomColor:'white',
    width:"90%",alignSelf:"center"
  },
  userDetails:{
    display:"flex",
    flexDirection:"row",
    marginLeft:10
  },
  userImageDropDown:{
    width:50,
    height:50,
    borderRadius:50

  },
  defaultImageContainer:{
    width:50,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    height:50,
    backgroundColor:"rgb(29,18,131)",
    borderRadius:50
  },

});

export default MainScreen;
