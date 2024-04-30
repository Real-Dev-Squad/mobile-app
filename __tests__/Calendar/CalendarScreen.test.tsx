import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CalendarInviteScreen from '../../src/screens/Calendar/CalendarInviteScreen';

jest.mock('../../src/context/AuthContext', () => ({
  __esModule: true,
  default: {
    loggedInUserData: { token: 'mockToken' },
  },
}));
jest.mock('../../src/utils/Api', () => ({
  fetchUsers: jest.fn(),
}));

describe.only('CalendarInviteScreen', () => {
  beforeEach(() => {
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
});
