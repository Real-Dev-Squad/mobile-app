import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useState, useContext} from 'react';
import Images from '../../constants/images/Image';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-gesture-handler';
import {
  submitExtension,
  getDateAndTimeFromUnix,
} from '../../screens/AuthScreen/Util';
import {AuthContext} from '../../context/AuthContext';
import DeadLineDatePicker from '../OOO/OOOFormDatePicker';

export default function ExtensionRequest() {
  const navigation = useNavigation();

  const [reason, setReason] = useState('');
  const [title, setTitle] = useState('');
  const [newEndsOn, setNewEndsOn] = useState(null);
  const {loggedInUserData} = useContext(AuthContext);
  const route = useRoute();
  const {endsOn} = route.params;
  const [toDate, setToDate] = useState(new Date());

  const handleFormSubmit = async () => {
    if (!reason || !title || !newEndsOn) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    const response = await submitExtension(
      loggedInUserData?.id,
      reason,
      title,
      newEndsOn,
      endsOn,
      // assignee,
      // status,
    );
    console.log('response', response);
    console.log('Old Ends On:', endsOn);
    setReason('');
    setTitle('');
    setNewEndsOn('');
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={styles.close} source={Images.closeIcon} />
        </TouchableOpacity>
        <Text style={styles.titleText}>Extension Request form</Text>
        <Text style={styles.paragraph}>Reason :</Text>
        <TextInput
          value={reason}
          onChangeText={text => setReason(text)}
          style={styles.input}
          placeholder="Enter reason"
        />

        <Text style={styles.paragraph}>Title :</Text>
        <TextInput
          value={title}
          onChangeText={text => setTitle(text)}
          style={styles.input}
          placeholder="Enter Title"
        />

        <Text style={styles.paragraph}>New Ends On :</Text>
        <Text style={{color: 'black'}}>
          OldsEndsOn : {getDateAndTimeFromUnix(endsOn)}`
        </Text>

        <DeadLineDatePicker
          title={`New date: ${toDate.toLocaleString('en-US')}`}
          value={newEndsOn}
          onDateChange={date => {
            setNewEndsOn(date);
            setToDate(date);
          }}
        />
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
          <Text style={{color: 'Whight'}}>Create Extension</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

  button: {
    backgroundColor: 'grey',
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
  titleText: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    justifyContent: 'flex-start',
  },
  input: {
    borderWidth: 1,
    fontSize: 15,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#718f9e',
  },
  close: {
    height: 10,
    width: 10,
    padding: 15,
    justifyContent: 'flex-start',
  },
});
