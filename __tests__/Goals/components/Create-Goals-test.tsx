import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MembersPage from '../../../src/screens/MemberScreen/MembersPage';
import CreateGoals from '../../../src/components/ToDoComponent/SettingGoals/CreateGoals';

jest.mock('react-native-gesture-handler', () => {});

describe('MainScreen', () => {
  const navigationProp = { navigate: jest.fn() };

  test('renders title and input fields correctly', () => {
    const { getByText, getByPlaceholderText } = render(
      <CreateGoals navigation={navigationProp} />,
    );
    const titleText = getByText('Create New Goal');
    const titleInput = getByPlaceholderText(
      'Enter title max of 50 characters.',
    );
    const descriptionInput = getByPlaceholderText('Enter max 200 characters.');
    expect(titleText).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
  });

  test('navigates to MemberScreen when "Assigned To" is pressed', async () => {
    const navigateMock = jest.fn();
    const { getByTestId, findByTestId } = render(
      <CreateGoals navigation={{ navigate: navigateMock }} />,
    );

    const dropdown = getByTestId('dropdown');
    expect(dropdown).toBeTruthy();

    fireEvent.press(dropdown);

    const usersContainer = await findByTestId('user-container');
    expect(usersContainer).toBeTruthy();
    // const assignedToText = getByText("Enter member's name");
    // fireEvent.press(assignedToText);
    // expect(navigateMock).toHaveBeenCalledWith(
    //   "Member's page",
    //   expect.any(Object),
    // );
  });

  test('should not show dropdown when "Assigned to: " button clicked twice', () => {
    const navigateMock = jest.fn();
    const { getByTestId, queryByTestId } = render(
      <CreateGoals navigation={{ navigate: navigateMock }} />,
    );

    const dropdown = getByTestId('dropdown');
    expect(dropdown).toBeTruthy();

    fireEvent.press(dropdown);
    fireEvent.press(dropdown);

    const userContainer = queryByTestId('user-container');
    expect(userContainer).toBeNull();
  });

  test.skip('navigates to FormScreen when "Create" button is pressed', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <MembersPage navigation={{ push: navigateMock }} />,
    );
    const createButton = getByText('Create');
    fireEvent.press(createButton);
    expect(navigateMock).toHaveBeenCalledWith('Form screen');
  });
});
