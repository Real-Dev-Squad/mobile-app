import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import NotifyForm from '../../../src/components/Notify/NotifyForm';
import { AuthContext } from '../../../src/context/AuthContext';
import {
  postFcmToken,
  sendNotification,
  getAllUsers,
} from '../../../src/screens/AuthScreen/Util';
import { firebase } from '@react-native-firebase/messaging';

// Mock the functions used in the component
jest.mock('../../../src/screens/AuthScreen/Util', () => ({
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

describe('NotifyForm', () => {
  const loggedInUserData = { token: 'user-token' };

  const renderComponent = () => {
    return render(
      <AuthContext.Provider value={{ loggedInUserData }}>
        <NotifyForm />
      </AuthContext.Provider>,
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the form with title, description, and Notify button', () => {
    const { getByText, getByPlaceholderText } = renderComponent();

    expect(getByText('Title:')).toBeTruthy();
    expect(getByText('Description:')).toBeTruthy();
    expect(getByText('Notify To:')).toBeTruthy();
    expect(getByPlaceholderText('Enter title')).toBeTruthy();
    expect(getByPlaceholderText('Enter description')).toBeTruthy();
    expect(getByText('Notify')).toBeTruthy();
  });

  it('retrieves FCM token and calls postFcmToken', async () => {
    renderComponent();

    await waitFor(() => {
      expect(firebase.messaging().hasPermission).toHaveBeenCalled();
      expect(firebase.messaging().getToken).toHaveBeenCalled();
      expect(postFcmToken).toHaveBeenCalledWith(
        'mocked-fcm-token',
        'user-token',
      );
    });
  });

  it('fetches users and updates the dropdown', async () => {
    const mockUsers = [
      { id: '1', username: 'john_doe', first_name: 'John', last_name: 'Doe' },
      { id: '2', username: 'jane_doe', first_name: 'Jane', last_name: 'Doe' },
    ];

    getAllUsers.mockResolvedValue(mockUsers); // Mock resolved users

    const { getByTestId, getByText } = renderComponent();

    // Wait for users to load
    await waitFor(() => {
      expect(getAllUsers).toHaveBeenCalledWith('user-token');
    });

    const dropdown = getByTestId('dropdown');
    fireEvent.press(dropdown); // Simulate dropdown press to show user list

    await waitFor(() => {
      expect(getByText('john_doe')).toBeTruthy();
      expect(getByText('jane_doe')).toBeTruthy();
    });
  });

  it('selects a user from the dropdown and sends a notification', async () => {
    const mockUsers = [
      { id: '1', username: 'john_doe', first_name: 'John', last_name: 'Doe' },
    ];

    getAllUsers.mockResolvedValue(mockUsers);

    const { getByTestId, getByPlaceholderText, getByText } = renderComponent();

    // Wait for users to load
    await waitFor(() => {
      expect(getAllUsers).toHaveBeenCalledWith('user-token');
    });

    const dropdown = getByTestId('dropdown');
    fireEvent.press(dropdown); // Open dropdown

    // Select a user from the dropdown
    await waitFor(() => {
      fireEvent.press(getByText('john_doe'));
    });

    // Fill in title and description
    fireEvent.changeText(getByPlaceholderText('Enter title'), 'Test Title');
    fireEvent.changeText(
      getByPlaceholderText('Enter description'),
      'Test Description',
    );

    // Press Notify button
    fireEvent.press(getByText('Notify'));

    await waitFor(() => {
      expect(sendNotification).toHaveBeenCalledWith(
        'Test Title',
        'Test Description',
        '1',
        'user-token',
      );
    });
  });
});
