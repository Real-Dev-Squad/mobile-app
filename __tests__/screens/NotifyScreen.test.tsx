import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import NotifyScreen from '../../src/screens/NotifyScreen/NotifyScreen';
import { postFcmToken } from '../../src/screens/AuthScreen/Util';
import { firebase } from '@react-native-firebase/messaging';

jest.mock('@react-native-firebase/messaging', () => ({
  firebase: {
    messaging: jest.fn(() => ({
      getToken: jest.fn(() => Promise.resolve('mocked-fcm-token')),
    })),
  },
}));
jest.mock('../../src/screens/AuthScreen/Util', () => ({
  postFcmToken: jest.fn(),
}));
describe('NotifyScreen', () => {
  it('should render correctly with title and NotifyForm', async () => {
    const { getByText } = render(<NotifyScreen />);

    expect(getByText('Event Notifications')).toBeTruthy();

    await waitFor(() => {
      expect(firebase.messaging().getToken).toHaveBeenCalled();
    });
    await waitFor(() =>
      expect(postFcmToken).toHaveBeenCalledWith(
        'mocked-fcm-token',
        'user-token',
      ),
    );
  });
});
