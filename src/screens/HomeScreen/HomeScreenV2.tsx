import React, { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import Strings from '../../i18n/en';
import OOOForm from '../../components/OOO/OOOForm';
import { AuthScreenButton } from '../AuthScreen/Button';
import { cancelOoo, getUsersStatus, submitOOOForm } from '../AuthScreen/Util';
import LoadingScreen from '../../components/LoadingScreen';

const HomeScreenV2 = (): JSX.Element => {
  const currentDate = new Date();
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  const [fromDate, setFromDate] = useState<Date>(currentDate);
  const [toDate, setToDate] = useState<Date>(tomorrowDate);
  const [description, setDescription] = useState<string>('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('isload', isLoading);
    fetchData();
  }, [isLoading]);

  const fetchData = async () => {
    const userStatus = await getUsersStatus();
    setStatus(userStatus);
  };

  const handleButtonPress = async () => {
    if (status === 'OOO') {
      await cancelOoo();
    } else {
      setIsFormVisible((prev) => !prev);
    }
  };

  const handleFormSubmit = async () => {
    setIsLoading(true); // Set loading state while making API call
    let data = {
      currentStatus: {
        from: fromDate,
        message: description,
        state: 'OOO',
        until: toDate,
        updateAt: 987937932,
      },
    };
    await submitOOOForm(data);
    setIsLoading(false); // Clear loading state after API call
    setIsFormVisible(false); // Hide the form after a successful submission
  };

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text>{status}</Text>
        <View style={{ marginTop: 20 }}>
          <AuthScreenButton
            text={
              status === 'OOO'
                ? Strings.CANCEL_OOO
                : Strings.UPDATE_STATUS_TO_OOO
            }
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
            isLoading={isLoading}
          />
        )}
      </View>
      {isLoading && <LoadingScreen />}
    </View>
  );
};

export default HomeScreenV2;
