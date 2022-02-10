import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';
import TabNavigation from './src/navigations/TabNavigation/TabNavigation';
import AuthScreen from './src/screens/AuthScreen/AuthScreen';

import AuthContext from './src/context/AuthContext';
import RootContext from './src/context/RootContext';
const App = () => {
  // ? Flow for Auth Logic
  // get item from local storage
  // if it's present and the access token is valid then
  // redirect user to the home screen
  // else redirect user to the auth screen

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedInUserData, setLoggedInUserData] = useState<any>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);
  const {getItem, setItem, removeItem} = useAsyncStorage('github_access-token');

  const writeItemToStorage = async (loginData: any) => {
    try {
      const item = await getItem();

      if (item === null) {
        setItem(JSON.stringify(loginData));
      } else {
        removeItem();
      }
      setIsLoading(false);
    } catch (err) {
      Alert.alert('Something went wrong');
    }
  };

  const updateLoggedInUserData = (data: any) => {
    setLoggedInUserData(data);
    writeItemToStorage(data);
  };
  const readItemFromStorage = async () => {
    try {
      setIsLoading(true);
      const item = await getItem();
      if (item === null) {
        // no need to do anything
        // will show login screen
      } else {
        setLoggedInUserData(JSON.parse(item));
        setLoggedIn(true);
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Something went wrong');
    }
  };

  const updateAuthStatus = (val: any) => {
    setLoggedIn(val);
  };

  const removeItemFromStorage = async () => {
    try {
      setIsLoading(true);
      await removeItem();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Something went wrong');
    }
  };

  useEffect(() => {
    readItemFromStorage();
  }, []);

  return (
    <AuthContext.Provider
      value={{isLoggedIn, updateAuthStatus, removeItemFromStorage}}>
      <RootContext.Provider value={{loggedInUserData, updateLoggedInUserData}}>
        {!isLoggedIn ? <AuthScreen /> : <TabNavigation />}
      </RootContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
