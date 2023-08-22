import React, { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import TabNavigation from './navigations/TabNavigation/TabNavigation';
import AuthScreen from './screens/AuthScreen/AuthScreen';

const Index = () => {
  const { isLoading, loggedInUserData } = useContext(AuthContext);
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!loggedInUserData) {
    return <AuthScreen />;
  }

  return <TabNavigation />;
};

// https://api.realdevsquad.com/auth/github/callback?error=redirect_uri_mismatch&error_description=The+redirect_uri+MUST+match+the+registered+callback+URL+for+this+application.&error_uri=https%3A%2F%2Fdocs.github.com%2Fapps%2Fmanaging-oauth-apps%2Ftroubleshooting-authorization-request-errors%2F%23redirect-uri-mismatch

//https://github.com/login?client_id=23c78f66ab7964e5ef97&return_to=%2Flogin%2Foauth%2Fauthorize%3Fclient_id%3D23c78f66ab7964e5ef97
// https://github.com/login/oauth/authorize?client_id=23c78f66ab7964e5ef97

export default Index;
