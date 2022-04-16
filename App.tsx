import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import Index from './src';

const App = () => {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
};

export default App;
