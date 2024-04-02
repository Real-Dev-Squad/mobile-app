import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './context/AuthContext';
import LoadingScreen from './components/LoadingScreen';
import TabNavigation from './navigations/TabNavigation/TabNavigation';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import ConnectionScreen from './screens/ConnectionScreen/ConnectionScreen';
import NetInfo from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';


const Index = () => {
  const { isLoading, loggedInUserData } = useContext(AuthContext);
  const [isConnected, setIsConnected] = useState(false);
    const { isProdEnvironment } = useSelector(
      (store) => store.localFeatureFlag,
    );

  const retryConnection = async () => {
    try {
      const state = await NetInfo.fetch();
      setIsConnected(state.isConnected);
    } catch (error) {
      setIsConnected(false);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, [isConnected]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isConnected && !isProdEnvironment) {
    return <ConnectionScreen retryConnect={retryConnection} />;
  }

  if (!loggedInUserData) {
    return <AuthScreen />;
  }

  return <TabNavigation />;
};

export default Index;
