import React from 'react';
import { useAuth } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import TabNavigation from './navigations/TabNavigation/TabNavigation';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import ErrorPopup from './components/ErrorPopUp/ErrorPopUp';

const Index = () => {
  const { isLoading, loggedInUserData, errorData, setErrorData } = useAuth();
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (loggedInUserData) {
    return <AuthScreen />;
  }

  return (
    <>
      <TabNavigation />
      {errorData.isError && (
        <ErrorPopup
          buttonAction={() =>
            setErrorData({
              isError: false,
              errorMessage: '',
            })
          }
          displayMessage={errorData.errorMessage ?? 'something went wrong'}
        />
      )}
    </>
  );
};

export default Index;
