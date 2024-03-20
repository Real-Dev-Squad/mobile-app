import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalendarInviteScreen from '../../src/screens/Calendar/CalendarInviteScreen';

// Mock the AuthContext and fetchUsers function
jest.mock('../../src/context/AuthContext', () => ({
  AuthContext: {
    Consumer: ({ children }) =>
      children({ loggedInUserData: { token: 'mockToken' } }),
  },
}));
jest.mock('../../src/utils/Api', () => ({
  fetchUsers: jest.fn(),
}));

describe.only('CalendarInviteScreen', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    jest.clearAllMocks();
  });
  it('renders without crashing', () => {
    render(<CalendarInviteScreen />);
  });

  it('invokes fetchUsers when component mounts', () => {
    render(<CalendarInviteScreen />);
    expect(require('../../src/utils/Api').fetchUsers).toHaveBeenCalledWith(
      'mockToken',
      expect.any(Function),
    );
  });

  it('adds user to state when handleUserIdChange is called with a new user', () => {
    const { getByTestId } = render(<CalendarInviteScreen />);
    const dropdown = getByTestId('dropdown');
    fireEvent.changeText(dropdown, 'New User');
  });

  it('displays "user already exists" alert when handleUserIdChange is called with an existing user', () => {});
});
