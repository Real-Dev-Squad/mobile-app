import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { AuthContext } from '../src/context/AuthContext';
import { loggedInUserType } from '../src/context/type';
import AuthScreen from '../src/screens/AuthScreen/AuthScreen';
import Strings from '../src/i18n/en';

function renderAuthScreen({
  loggedInUserData,
}: {
  loggedInUserData: loggedInUserType | null;
}) {
  const isLoading = false;
  const setIsLoading = () => {};
  const setLoggedInUserData = () => {};

  return render(
    <AuthContext.Provider
      value={{
        isLoading,
        loggedInUserData,
        setIsLoading,
        setLoggedInUserData,
      }}
    >
      <AuthScreen />
    </AuthContext.Provider>,
  );
}

describe('render controlled by githubview: boolean', () => {
  test('when !loggedInUserData & !githubview, render Scrollview', () => {
    const { getByText } = renderAuthScreen({ loggedInUserData: null });
    getByText(Strings.SIGN_IN_BUTTON_TEXT);
  });

  test('when !loggedInUserData, !githubView, & sign-in is clicked, setGithubview true & render webview', () => {
    const { getByText, getByTestId } = renderAuthScreen({
      loggedInUserData: null,
    });
    fireEvent.press(getByText(Strings.SIGN_IN_BUTTON_TEXT));
    getByTestId('webview');
  });
});
