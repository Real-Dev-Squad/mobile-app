import { Button, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Strings from '../../i18n/en';
import OOOForm from '../../components/OOO/OOOForm';

const HomeScreen2 = (): JSX.Element => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<number>(Date.now());
  const [toDate, setToDate] = useState<number>(Date.now());
  const [description, setDescription] = useState<string>('');

  const handleButtonPress = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleFormSubmit = () => {
    // patch api call (it should give loading , failed, error and success messages)
    console.log(fromDate, toDate, description); // was giving lint issues, after api call please remove this log
    setIsFormVisible((prev) => !prev);
  };

  return (
    <View>
      <Text>You are Idle</Text>
      <Button
        title={Strings.UPDATE_STATUS_TO_OOO}
        onPress={handleButtonPress}
      />
      {isFormVisible && (
        <OOOForm
          fromDate={fromDate}
          toDate={toDate}
          description={description}
          setToDate={setToDate}
          setFromDate={setFromDate}
          setDescription={setDescription}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </View>
  );
};

export default HomeScreen2;
