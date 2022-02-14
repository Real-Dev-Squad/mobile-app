import React, {useEffect, useState} from 'react';
import {Alert} from 'react-native';
import * as Keychain from 'react-native-keychain';
import TabNavigation from './src/navigations/TabNavigation/TabNavigation';
import AuthScreen from './src/screens/AuthScreen/AuthScreen';

import AuthContext from './src/context/AuthContext';
import RootContext from './src/context/RootContext';
import LoadingScreen from './src/components/LoadingScreen';
const App = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedInUserData, setLoggedInUserData] = useState<any>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const writeItemToStorage = async (loginData: any) => {
    try {
      setIsLoading(true);
      const githubLoginInfo = await Keychain.getGenericPassword();

      if (!githubLoginInfo) {
        await Keychain.setGenericPassword(
          'githubLoginData',
          JSON.stringify(loginData),
        );
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
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
      const githubLoginInfo = await Keychain.getGenericPassword();
      if (githubLoginInfo && githubLoginInfo.password) {
        setLoggedIn(true);
        setLoggedInUserData(JSON.parse(githubLoginInfo.password));
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
      await Keychain.resetGenericPassword();
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      Alert.alert('Something went wrong');
    }
  };

  useEffect(() => {
    readItemFromStorage();
    return () => {
      setLoggedInUserData(null);
      setLoggedIn(false);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{isLoggedIn, updateAuthStatus, removeItemFromStorage}}>
      <RootContext.Provider
        value={{
          loggedInUserData,
          updateLoggedInUserData,
          isLoading,
          setIsLoading,
        }}>
        {isLoading ? (
          <LoadingScreen />
        ) : !isLoggedIn ? (
          <AuthScreen />
        ) : (
          <TabNavigation />
        )}
      </RootContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
