import React, { FC, useContext, useEffect, useState } from 'react';
import { getData } from '../utils/dataStore';
import { ErrorData, loggedInUserType } from './type';

type authContextProviderType = {
  loggedInUserData: loggedInUserType | null;
  isLoading: boolean;
  setIsLoading: () => void;
  setLoggedInUserData: (userData: loggedInUserType | null) => void;
  errorData: ErrorData;
  setErrorData: (errorData: ErrorData) => void;
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
  errorData: {
    isError: false,
    errorMessage: '',
  },
  setErrorData: () => {
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
  const [errorData, setErrorData] = useState({
    isError: false,
    errorMessage: '',
  });
  useEffect(() => {
    getData('userData').then((res) => {
      console.log('res', res);
      setLoggedInUserData(res);
    });
  }, []);

  const context = {
    isLoading,
    loggedInUserData,
    setIsLoading: () => {
      setIsLoading((prevIsLoading) => !prevIsLoading);
    },
    setLoggedInUserData: (userData: loggedInUserType | null) => {
      setLoggedInUserData(userData);
    },
    setErrorData: (data: ErrorData) => {
      setErrorData((prev) => ({
        ...prev,
        isError: data.isError,
        errorMessage: data.errorMessage,
      }));
    },
    errorData,
  };
  return (
    <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
