import { Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import Strings from '../../i18n/en';
import OOOForm from '../../components/OOO/OOOForm';
import { AuthScreenButton } from '../AuthScreen/Button';
import { getUsersStatus, submitOOOForm } from '../AuthScreen/Util';

const HomeScreenV2 = (): JSX.Element => {
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<number>(Date.now());
  const [toDate, setToDate] = useState<number>(Date.now());
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const userStatus = await getUsersStatus();
    setStatus(userStatus);
  };
  const handleButtonPress = () => {
    setIsFormVisible((prev) => !prev);
  };

  const handleFormSubmit = async () => {
    // patch api call (it should give loading , failed, error and success messages)
    let data = {
      currentStatus: {
        from: fromDate,
        message: description,
        state: 'OOO',
        until: toDate,
        updateAt: 987937932,
      },
    };
    const updateStatus = await submitOOOForm(data);
    console.log({ data23131: updateStatus }); // was giving lint issues, after api call please remove this log
    setIsFormVisible((prev) => !prev);
  };

  return (
    <View>
      <Text>{status}</Text>
      <View style={{ marginTop: 20 }}>
        <AuthScreenButton
          text={Strings.UPDATE_STATUS_TO_OOO}
          onPress={handleButtonPress}
        />
      </View>

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

export default HomeScreenV2;
