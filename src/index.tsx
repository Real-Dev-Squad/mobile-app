import React, {useContext} from 'react';
import {AuthContext} from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import TabNavigation from './navigations/TabNavigation/TabNavigation';
import AuthScreen from './screens/AuthScreen/AuthScreen';

const Index = () => {
  const {isLoading, loggedInUserData} = useContext(AuthContext);
  return (
    <>
      {isLoading ? (
        <LoadingScreen />
      ) : !loggedInUserData ? (
        <AuthScreen />
      ) : (
        <TabNavigation />
      )}
    </>
  );
};

export default Index;
