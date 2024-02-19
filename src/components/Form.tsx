import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import InputBox from './InputBox';
import Strings from '../i18n/en';
import Button_ from './Button_';
import { AuthContext } from '../context/AuthContext';
import { getNotifications } from '../screens/AuthScreen/Util';
import NotifyDropDown from './NotifyDropDown';

const Form = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [userId, setUserId] = useState('');
  const { loggedInUserData } = useContext(AuthContext);
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [selectionError, setSelectionError] = useState('');
  const handleTitleChange = (text: string) => {
    setTitle(text);
  };

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
  };

  const handleUserIdChange = (id: string) => {
    setUserId(id);
  };

  const validateForm = () => {
    if (title.trim() === '') {
      setTitleError('Enter proper title');
    } else if (description.trim() === '') {
      setDescriptionError('Enter proper description');
    } else if (description.trim() === '') {
      setSelectionError('Selection error');
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const { token } = loggedInUserData;
    try {
      const resNotify = await getNotifications(
        userId,
        title,
        description,
        token,
      );
      console.log('🚀 ~ handleSubmit ~ resNotify:', resNotify);
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
        error={titleError}
      />
      <InputBox
        title={description}
        label={Strings.DESCRIPTION}
        onChangeHandler={handleDescriptionChange}
        error={descriptionError}
      />
      <NotifyDropDown
        handleUserId={handleUserIdChange}
        error={selectionError}
      />
      <Button_ title={'Submit'} submitHandler={handleSubmit} disabled={false} />
    </View>
  );
};

export default Form;

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: {
    color: 'black',
    textAlign: 'center',
    marginBottom: 20,
  },
});
