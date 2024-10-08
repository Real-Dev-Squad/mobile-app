import React from 'react';
import { render } from '@testing-library/react-native';
import NotifyScreen from '../../src/screens/NotifyScreen/NotifyScreen';

jest.mock('../../src/screens/AuthScreen/Util', () => ({
  postFcmToken: jest.fn(),
  sendNotification: jest.fn(),
  getAllUsers: jest.fn(() => Promise.resolve([])), // Mock getAllUsers with an empty array
}));

jest.mock('@react-native-firebase/messaging', () => ({
  firebase: {
    messaging: jest.fn(() => ({
      getToken: jest.fn(() => Promise.resolve('mocked-fcm-token')),
      hasPermission: jest.fn(() => Promise.resolve(1)), // Mock permission granted
      requestPermission: jest.fn(() => Promise.resolve()), // Mock permission request
    })),
  },
}));
describe('NotifyScreen', () => {
  it('should render correctly with title and NotifyForm', async () => {
    const { getByText } = render(<NotifyScreen />);

    expect(getByText('Event Notifications')).toBeTruthy();
    // Wait for the getToken to be called
  });
});
