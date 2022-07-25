import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Toast from 'react-native-toast-message';
import Index from './src';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Index />
      </AuthProvider>
      <Toast />
    </>
  );
};

export default App;
