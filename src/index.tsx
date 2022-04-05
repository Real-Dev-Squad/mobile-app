import React, {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import TabNavigation from './navigations/TabNavigation/TabNavigation';
import AuthScreen from './screens/AuthScreen/AuthScreen';

const Index = () => {
  const {isLoading, loggedInUserData} = useContext(AuthContext);
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!loggedInUserData) {
    return <AuthScreen />;
  }

  return <TabNavigation />;
};

export default Index;
