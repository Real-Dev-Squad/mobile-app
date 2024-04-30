import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import DropDown from '../../../src/components/DropDown';

describe('DropDown Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(
      <DropDown handleUserId={() => {}} error="" disabled={false} />,
    );
    expect(getByText('Notify To')).toBeTruthy();
  });

  it('initial state is set correctly', () => {
    const { getByTestId } = render(
      <DropDown
        title={'Select To invite'}
        handleUserId={() => {}}
        error={''}
        disabled={false}
      />,
    );
    const dropdownSelector = getByTestId('dropdown');
    expect(dropdownSelector).toBeTruthy();
    expect(dropdownSelector.props.accessibilityState.disabled).toBe(false);
    expect(dropdownSelector).toHaveTextContent('Select User');
  });

  it('toggles dropdown visibility', async () => {
    const { getByTestId, queryByTestId } = render(
      <DropDown handleUserId={() => {}} error="" disabled={false} />,
    );
    const dropdownSelector = getByTestId('dropdown');
    fireEvent.press(dropdownSelector);
    await waitFor(() => {
      expect(queryByTestId('user-container')).toBeTruthy();
    });
    fireEvent.press(dropdownSelector);
    await waitFor(() => {
      expect(queryByTestId('user-container')).toBeNull();
    });
  });

  it.skip('selects a user from dropdown', async () => {
    const handleUserIdMock = jest.fn();
    const { getByTestId, getByText } = render(
      <DropDown handleUserId={handleUserIdMock} error="" disabled={false} />,
    );
    const dropdownSelector = getByTestId('dropdown');
    fireEvent.press(dropdownSelector);
    const userItem = getByText('John Doe');
    fireEvent.press(userItem);
    await waitFor(() => {
      expect(handleUserIdMock).toHaveBeenCalledWith();
    });
  });

  it.skip('displays user data correctly', async () => {
    const mockAllUsers = [
      {
        id: 1,
        first_name: 'John',
        last_name: 'Doe',
      },
    ];
    jest.mock('../screens/AuthScreen/Util', () => ({
      getAllUsers: jest.fn().mockResolvedValue(mockAllUsers),
    }));

    const { getByTestId, getByText } = render(
      <DropDown handleUserId={() => {}} error="" disabled={false} />,
    );
    const dropdownSelector = getByTestId('dropdown');
    fireEvent.press(dropdownSelector);
    await waitFor(() => {
      expect(getByText('John Doe')).toBeTruthy();
    });
  });

  it('displays error message correctly', () => {
    const { getByText } = render(
      <DropDown
        handleUserId={() => {}}
        error="Error message"
        disabled={false}
      />,
    );
    expect(getByText('Error message')).toBeTruthy();
  });

  it('renders correctly in disabled state', () => {
    const { getByTestId } = render(
      <DropDown
        title="Select To invite"
        handleUserId={() => {}}
        error=""
        disabled={true}
      />,
    );
    const dropdownSelector = getByTestId('dropdown');
    expect(dropdownSelector).toBeTruthy();
    expect(dropdownSelector.props.accessibilityState.disabled).toBe(true);
  });
});
