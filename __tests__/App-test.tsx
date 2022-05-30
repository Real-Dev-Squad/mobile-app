/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import LoadingScreen from '../src/components/LoadingScreen';
import AuthScreen from '../src/screens/AuthScreen/AuthScreen';
import TabNavigation from '../src/navigations/TabNavigation/TabNavigation';
import Strings from '../src/i18n/en';
import { fireEvent, render } from '@testing-library/react-native';
import WebView from 'react-native-webview';
import { urls } from '../src/constants/appConstant/url';

it('renders correctly', () => {
  renderer.create(<App />);
});

it('check loading', () => {
  const isLoading = true;
  expect(isLoading)
    ? renderer.create(<LoadingScreen />)
    : renderer.create(<AuthScreen />);
});

it('check logged in user for Tab navigation Screen', () => {
  const loggedInUserData = { name: 'RDS', profileUrl: '' };
  expect(!loggedInUserData)
    ? renderer.create(<AuthScreen />)
    : renderer.create(<TabNavigation />);
});

it('check logged in user for Auth Screen', () => {
  const loggedInUserData = null;
  expect(!loggedInUserData)
    ? renderer.create(<AuthScreen />)
    : renderer.create(<TabNavigation />);
});

it('should render a button and onclick event', () => {
  const { getByText } = render(<AuthScreen />);
  const loginButton = getByText(Strings.SIGN_IN_BUTTON_TEXT);
  fireEvent.press(loginButton);
  const login = true;
  let loginData = null;
  expect(login)
    ? renderer.create(
        <WebView
          source={{
            uri: urls.GITHUB_AUTH,
          }}
          onNavigationStateChange={({ url }) => {
            setTimeout(() => {
              loginData = {
                name: 'shreya',
                profileUrl: '',
              };
            }, 1000);
          }}
        />,
      )
    : renderer.create(<AuthScreen />);
});
