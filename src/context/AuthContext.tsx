import React, {useState} from 'react';

type authContextProviderType = {
  loggedInUserData: any;
  isLoading: boolean;
  setIsLoading: () => void;
  setLoggedInUserData: (userData: any) => void;
};
export const AuthContext = React.createContext<authContextProviderType>({
  isLoading: false,
  loggedInUserData: null,
  setIsLoading: () => {
    return;
  },
  setLoggedInUserData: () => {
    return;
  },
});

export const AuthProvider = ({children}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedInUserData, setLoggedInUserData] = useState<any>(null);
  const [isLoggedIn, setLoggedIn] = useState<boolean>(false);

  const context = {
    isLoading,
    loggedInUserData,
    setIsLoading: () => {
      setIsLoading(!isLoading);
    },
    setLoggedInUserData: (userData: any) => {
      setLoggedInUserData(userData);
    },
  };
  return (
    <AuthContext.Provider value={context}>
      <>{children}</>
    </AuthContext.Provider>
  );
};
