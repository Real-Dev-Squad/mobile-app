import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import NotifyScreen from '../../src/screens/NotifyScreen/NotifyScreen';
import NotifyForm from '../../src/components/Notify/NotifyForm';
import { postFcmToken } from '../../src/screens/AuthScreen/Util';
import { firebase } from '@react-native-firebase/messaging';

jest.mock('@react-native-firebase/messaging', () => ({
  firebase: {
    messaging: jest.fn(() => ({
      getToken: jest.fn(() => Promise.resolve('mocked-fcm-token')),
      requestPermission: jest.fn(() => Promise.resolve()),
    })),
  },
}));
jest.mock('../../src/screens/AuthScreen/Util', () => ({
  postFcmToken: jest.fn(),
  getAllUsers: jest.fn(() => Promise.resolve([])),
}));
describe('NotifyScreen', () => {
  it('should render correctly with title and NotifyForm', async () => {
    const { getByText } = render(<NotifyScreen />);

    expect(getByText('Event Notifications')).toBeTruthy();
    // Wait for the getToken to be called
  });
});
