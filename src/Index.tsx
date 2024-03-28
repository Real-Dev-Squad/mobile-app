import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import TabNavigation from './navigations/TabNavigation/TabNavigation';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import { useIsConnected } from 'react-native-offline';

const Index = () => {
  const { isLoading, loggedInUserData } = useContext(AuthContext);
  console.log(useIsConnected)

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!loggedInUserData) {
    return <AuthScreen />;
  }

  return <TabNavigation />;
};

export default Index;
