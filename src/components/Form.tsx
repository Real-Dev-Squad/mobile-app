import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import InputBox from './InputBox';
import Strings from '../i18n/en';
import Button_ from './Button_';
import { AuthContext } from '../context/AuthContext';
import { getNotifications } from '../screens/AuthScreen/Util';

const Form = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { loggedInUserData } = useContext(AuthContext);
  console.log('🚀 ~ NotifyScreen ~ loggedInUserData:', loggedInUserData.id);

  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleSubmit = () => {
    console.log(title, description);
    const { id, token } = loggedInUserData;
    try {
      getNotifications(id, title, description, token);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notify About the events if Any!</Text>
      <InputBox
        title={title}
        label={Strings.TITLE}
        onChangeHandler={handleTitleChange}
      />
      <InputBox
        title={description}
        label={Strings.DESCRIPTION}
        onChangeHandler={handleDescriptionChange}
      />
      <Button_ title={'Submit'} submitHandler={handleSubmit} />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: { padding: 16 },
  input: {
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 16,
  },
  title: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
});
