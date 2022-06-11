import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import Index from './src/Index';

const App = () => {
  return (
    <AuthProvider>
      <Index />
    </AuthProvider>
  );
};

export default App;
