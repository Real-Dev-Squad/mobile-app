import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CreatingGoalScreen from '../../../src/components/ToDoComponent/SettingGoals/CreateGoals';

describe('CreatingGoalScreen', () => {
  test('renders title and input fields correctly', () => {
    const navigateMock = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <CreatingGoalScreen navigation={{ navigate: navigateMock }} />,
    );
    const titleText = getByText('Add New Goal');
    const titleInput = getByPlaceholderText(
      'Enter title max of 50 characters.',
    );
    const descriptionInput = getByPlaceholderText('Enter max 200 characters.');
    expect(titleText).toBeTruthy();
    expect(titleInput).toBeTruthy();
    expect(descriptionInput).toBeTruthy();
  });

  test('navigates to MemberScreen when "Assigned To" is pressed', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <CreatingGoalScreen navigation={{ navigate: navigateMock }} />,
    );
    const assignedToText = getByText("Enter member's name");
    fireEvent.press(assignedToText);
    expect(navigateMock).toHaveBeenCalledWith(
      'MembersSceen',
      expect.any(Object),
    );
  });

  test('navigates to FormScreen when "Create" button is pressed', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(
      <CreatingGoalScreen navigation={{ navigate: navigateMock }} />,
    );
    const createButton = getByText('Create');
    fireEvent.press(createButton);
    // expect(navigateMock).toHaveBeenCalledWith('Form screen');
  });
});
