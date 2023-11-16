import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function ExtensionRequest() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>Extension Request form</Text>
        <Text style={styles.paragraph}>Reason :</Text>

        <Text style={styles.paragraph}>Title :</Text>
        {/* <View>
          <TextInput style={styles.input} />
        </View> */}

        <Text style={styles.paragraph}>Old Ends On :</Text>
        {/* <View>
          <Text style={styles.formchild}>Duration</Text>
        </View> */}

        <Text style={styles.paragraph}>New Ends On :</Text>
        {/* <View>
          <Text style={styles.formchild}>On status</Text>
        </View> */}
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
    fontWeight: 'normal',
    color: 'blue',
    justifyContent: 'flex-start',
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
  buttoncontainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 5,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    justifyContent: 'flex-start',
  },
});
