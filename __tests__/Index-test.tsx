import React from 'react';
import { render } from '@testing-library/react-native';
import { AuthContext } from '../src/context/AuthContext';
import { loggedInUserType } from '../src/context/type';
import Strings from '../src/i18n/en';
import Index from '../src/Index';

function renderIndex({
  isLoading,
  loggedInUserData,
}: {
  isLoading: boolean;
  loggedInUserData: loggedInUserType | null;
}) {
  const setIsLoading = () => {};
  const setLoggedInUserData = () => {};

  return render(
    <AuthContext.Provider
      value={{ isLoading, loggedInUserData, setIsLoading, setLoggedInUserData }}
    >
      <Index />
    </AuthContext.Provider>,
  );
}

describe('Index renders correctly depending on AuthContext states', () => {
  test('when isLoading render LoadingScreen', () => {
    const { getByTestId } = renderIndex({
      isLoading: true,
      loggedInUserData: null,
    });
    getByTestId('loadingScreenView');
  });

  test('when !isLoading & !loggedInUserData render LoadingScreen', () => {
    const { getByText } = renderIndex({
      isLoading: false,
      loggedInUserData: null,
    });
    getByText(Strings.SIGN_IN_BUTTON_TEXT);
  });

  test('when !isLoading & loggedInUserData render TabNavigation', () => {
    const { getByText } = renderIndex({
      isLoading: false,
      loggedInUserData: {
        id: '1a#',
        name: 'John Doe ',
        profileUrl: 'http://placehold.jp/150x150.png',
        status: Strings.IDLE,
      },
    });

    getByText(Strings.Tab_Home);
  });
});

describe('webview behaviour', () => {
  test.todo('when githubview true, goto github auth url in webview');
  test.todo(
    'when correct username, password are entered goto redirect url in webview & invoke getUserData',
  );
  test.todo(
    'when getUserData is successful, setLoggedInUserData & render TabNavigation',
  );
  test.todo('when getUserData fails, setLoggedInUserData to null');
});
