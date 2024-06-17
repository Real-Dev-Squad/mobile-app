import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthScreen from '../src/screens/AuthScreen/AuthScreen';
// Mocking modules used in AuthScreen
jest.mock('react-native-device-info', () => ({
  getUniqueId: jest.fn(() => 'mockedDeviceId'),
}));

jest.mock('../../utils/dataStore', () => ({
  storeData: jest.fn(),
}));

jest.mock('react-native-toast-message', () => ({
  Toast: {
    show: jest.fn(),
  },
}));

jest.mock('react-native-camera-kit', () => ({
  CameraScreen: 'CameraScreen',
}));

jest.mock('react-native-walkthrough-tooltip', () => 'Tooltip');

describe('AuthScreen', () => {
  it('renders correctly', () => {
    const { getByText } = render(<AuthScreen />);
    
    expect(getByText('Welcome to')).toBeTruthy();
    expect(getByText('Real Dev Squad')).toBeTruthy();
    // Add more assertions based on your UI
  });

  it('handles sign in with GitHub', () => {
    const { getByText } = render(<AuthScreen />);
    
    // Mocking Linking.openURL
    jest.spyOn(global, 'Linking').mockImplementation(() => ({
      openURL: jest.fn(),
    }));
    
    fireEvent.press(getByText('Sign in with GitHub'));
    
    // Ensure Linking.openURL is called with the correct URL
    expect(global.Linking.openURL).toHaveBeenCalledWith(expect.stringContaining('https://github.com/'));
  });

  // Add more tests for other functionalities as needed
});
