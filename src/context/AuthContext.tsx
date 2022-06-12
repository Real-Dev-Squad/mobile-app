import React, { FC, useEffect, useState } from 'react';
import { getData } from '../hooks/dataStoreHook';
import { loggedInUserType } from './type';

type authContextProviderType = {
  loggedInUserData: loggedInUserType | null;
  isLoading: boolean;
  setIsLoading: () => void;
  setLoggedInUserData: (userData: loggedInUserType | null) => void;
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

type authProviderProps = {
  children: JSX.Element;
};

export const AuthProvider: FC<authProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loggedInUserData, setLoggedInUserData] =
    useState<loggedInUserType | null>(null);
  useEffect(() => {
    getData('userData').then((res) => setLoggedInUserData(res));
  }, []);
  // const updateStatus = () => {};
  const context = {
    isLoading,
    loggedInUserData,
    setIsLoading: () => {
      setIsLoading(!isLoading);
    },
    setLoggedInUserData: (userData: loggedInUserType | null) => {
      setLoggedInUserData(userData);
    },
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};
